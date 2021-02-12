const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc");
const db = require("./db");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

const { default: axios } = require("axios");
const secrets = require("../secrets.json");

// Multer configurations ------------------------------------------------------
// Specify file names and destinations

// app.use(express.static("./uploads"));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const upload = multer({
    storage: diskStorage,
    limits: {
        // Set a file size limit to prevent users from uploading huge files and to protect against DOS attacks
        fileSize: 2097152,
    },
});

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

// must be after cookiesession
app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.get("/welcome", (req, res) => {
    console.log("req welcome", req);
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    // console.log("req.body /register: ", req.body.first);
    // console.log("req.session /register: ", req.session);
    const { first, last, email, password } = req.body;

    hash(password)
        .then((hashed_password) => {
            db.addUser(first, last, email, hashed_password)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                })
                .catch((error) => {
                    console.log("error registration", error);
                    // res.redirect("/registration");
                    res.json({ success: false });
                });
        })
        .catch((error) => {
            console.log("error registration", error);
            // res.redirect("/registration");
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    if (req.body.email == "") {
        res.json({ success: false });
    } else if (req.body.password == "") {
        res.json({ success: false });
    } else if (req.body.password != "") {
        let email = req.body.email;
        db.getHashedPassword(email)
            .then(({ rows }) => {
                let userId = rows[0].id;
                compare(req.body.password, rows[0].password)
                    .then((result) => {
                        if (result) {
                            req.session.userId = userId;
                            res.json({ success: true });
                        } else {
                            console.log("error in compare getHashedPassword");
                            res.json({ success: false });
                        }
                    })
                    .catch((error) => {
                        console.log("error match", error);
                        res.json({ success: false });
                    });
            })
            .catch((error) => {
                console.log("error match", error);
                res.json({ success: false });
            });
    } else {
        console.log("error in logIn post");
        res.json({ success: false });
    }
});

app.post("/password/reset/start", (req, res) => {
    console.log("post reset/start");
    console.log("email", req.body);
    const { email } = req.body;
    db.getUserByEmail(email)
        .then(({ rows }) => {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.setSecretCode(rows[0].email, secretCode)
                .then(() => {
                    sendEmail(
                        rows[0].email,
                        secretCode,
                        "This is your Code to reset your password. This code expires in 10 minutes!"
                    )
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((error) => {
                            console.log("error sendEmail", error);
                            res.json({ success: false });
                        });
                })
                .catch((error) => {
                    console.log("error setSecretCode", error);
                    res.json({ success: false });
                });
        })
        .catch((error) => {
            console.log("error getUserByEmail", error);
            res.json({ success: false });
        });
});

app.post("/password/reset/verify", (req, res) => {
    console.log("post reset/verify");
    console.log("email", req.body);
    const { code, password, email } = req.body;
    if (!password || !email) {
        res.json({ success: false });
    }
    console.log(code, password, email);
    hash(password).then((hashed_password) => {
        db.getSecretCode(email)
            .then(({ rows }) => {
                console.log("rows in getSecretCode", rows);
                if (rows[0].code === code) {
                    db.updateUserPassword(email, hashed_password)
                        .then(() => {
                            console.log("success in getSecretCode");
                            res.json({ success: true });
                        })
                        .catch((error) => {
                            console.log("error in updateUserPassword", error);
                            res.json({ success: false });
                        });
                } else {
                    console.log("error in if updateUserPassword");
                    res.json({ success: false });
                }
            })
            .catch((error) => {
                console.log("error in getSecretCode", error);
                res.json({ success: false });
            });
    });
});

app.get("/user", (req, res) => {
    console.log("get user");
    console.log("req session", req.session);
    db.getUserData(req.session.userId)
        .then(({ rows }) => {
            res.json({
                success: true,
                id: rows[0].id,
                first: rows[0].first,
                last: rows[0].last,
                image: rows[0].image,
                bio: rows[0].bio,
            });
        })
        .catch((error) => {
            console.log("error in getUserData", error);
            res.json({ success: false });
        });
});

app.get("/logout", (req, res) => {
    console.log("userId logout before", req.session.userId);
    req.session = null;
    console.log("userId logout after", req.session);
    res.redirect("/welcome");
});

// -------------  save Recipe ------------------------

app.post("/saveFavorite", (req, res) => {
    console.log("post saveFavorite");
    console.log("req.body.recipe", req.body.recipe);
    console.log("req.body.ingredient", req.body.ingredient);
    console.log("req query", req.query);
    console.log("req.session:", req.session.userId);
    const { uri, label, url, source, image } = req.body.recipe;
    let userId = req.session.userId;
    db.saveFavoriteRecipe(
        uri,
        label,
        url,
        source,
        image,
        req.body.ingredient,
        userId
    )
        .then(() => {
            res.json({
                success: true,
            });
        })
        .catch((error) => {
            console.log("error in saveFavoriteRecipe", error);
            res.json({ success: false });
        });
});

app.get("/getFavoriteRecipe", (req, res) => {
    console.log("getRecipe");
    let userId = req.session.userId;
    db.getFavoriteRecipe(userId)
        .then(({ rows }) => {
            console.log("rows", rows);
            res.json({
                success: true,
                favoriteRecipe: rows,
            });
        })
        .catch((error) => {
            console.log("error in getFavoriteRecipe", error);
            res.json({ success: false });
        });
});

app.post("/deleteFavRecipe", (req, res) => {
    // console.log("post deleteFavRecipe");
    // console.log("req params", req.params);
    // console.log("req body", req.body);
    // console.log("req query", req.query);
    // console.log("req session", req.session);
    const { id } = req.body;
    const { userId } = req.session;
    db.deleteRecipe(id, userId)
        .then(() => {
            res.json({ success: true });
        })
        .catch((error) => {
            console.log("error in deleteFavRecipe", error);
            res.json({ success: false });
        });
});

app.post("/deleteAccount", (req, res) => {
    console.log("post delete Account");
    console.log("req session", req.session);
    const { userId } = req.session;
    db.deleteFavs(userId)
        .then(() => {
            db.deleteAccount(userId)
                .then(() => {
                    res.redirect("/landingpage");
                })
                .catch((error) => {
                    console.log("error in deleteAccount", error);
                    res.json({ success: false });
                });
        })
        .catch((error) => {
            console.log("error in deleteFavs", error);
            res.json({ success: false });
        });
});

// ------  api call dont touch--------------------------------------------------------------------------

app.get("/api/getRecipe/:input", (req, res) => {
    console.log("GET getRecipe");
    console.log("req:", req.params.input);
    let response;
    async function getRecipes(input) {
        try {
            response = await axios.get(
                `https://api.edamam.com/search?q=${input}&app_id=${secrets.APP_ID}&app_key=${secrets.APP_KEY}`
            );

            console.log("result getRecipe", response);
            console.log("hits:", response.data.hits);
            res.json({
                success: true,
                recipes: response.data.hits.map((obj) => ({
                    ...obj,
                    isVisible: false,
                })),
            });
        } catch (error) {
            console.log("error in getRecipe", error);
            res.json({ success: false });
        }
        return response;
    }
    getRecipes(req.params.input);
});

app.get(`/api/getRestaurant/`, (req, res) => {
    console.log("GET getRestaurant");
    console.log("term restaurant:", req.query.term);
    console.log("location restaurant:", req.query.location);
    const { term, location, sortBy } = req.query;
    const apiKey = secrets.apiKey;
    let response;
    async function search(term, location, sortBy) {
        try {
            response = await axios.get(
                `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            console.log("result getRecipe", response);
            console.log("businesses:", response.data.businesses);
            res.json({
                success: true,
                businesses: response.data.businesses.map((obj) => ({
                    ...obj,
                    isVisible: false,
                })),
            });
        } catch (error) {
            console.log("error in getRecipe", error);
            res.json({ success: false });
        }
        return response;
    }
    search(term, location, sortBy);
});

// --------------------------------------------------------------------------------------------------

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
