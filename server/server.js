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
    db.getUserByEmail(req.body.email)
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
    res.redirect("/landingpage");
});

app.post("/saveFavorite", (req, res) => {
    console.log("post saveFavorite");
    console.log("req.body.recipe", req.body.recipe);
    console.log("req.session:", req.session.userId);
    const { uri, label, url, source, image } = req.body.recipe;
    let userId = req.session.userId;
    db.saveFavoriteRecipe(uri, label, url, source, image, userId)
        .then((res) => {
            res.json({
                success: true,
            });
        })
        .catch((error) => {
            console.log("error in saveFavoriteRecipe", error);
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

// const response = [ {

//         recipe: {
//             uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_af78095eb8218b0975de93214b1ec00c',
//             label: 'Mushroom Bison Burger',
//             image: 'https://www.edamam.com/web-img/943/943dd3096dba198c5d5f75078e36cef8.jpg',
//             source: "Men's Health",
//             url: 'https://www.menshealth.com/recipes/mushroom-bison-burger',
//             shareAs: 'http://www.edamam.com/recipe/mushroom-bison-burger-af78095eb8218b0975de93214b1ec00c/burger',
//             yield: 6,
//             dietLabels: [],
//             healthLabels: [Array],
//             cautions: [Array],
//             ingredientLines: [Array],
//             ingredients: [Array],
//             calories: 1057.823920825,
//             totalWeight: 642.1980925,
//             totalTime: 11,
//             totalNutrients: [Object],
//             totalDaily: [Object],
//             digest: [Array]
//           },
//           recipe: {
//             uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_af78095eb8218b0975de93214b1ec00c',
//             label: 'Mushroom Bison Burger',
//             image: 'https://www.edamam.com/web-img/943/943dd3096dba198c5d5f75078e36cef8.jpg',
//             source: "Men's Health",
//             url: 'https://www.menshealth.com/recipes/mushroom-bison-burger',
//             shareAs: 'http://www.edamam.com/recipe/mushroom-bison-burger-af78095eb8218b0975de93214b1ec00c/burger',
//             yield: 6,
//             dietLabels: [],
//             healthLabels: [Array],
//             cautions: [Array],
//             ingredientLines: [Array],
//             ingredients: [Array],
//             calories: 1057.823920825,
//             totalWeight: 642.1980925,
//             totalTime: 11,
//             totalNutrients: [Object],
//             totalDaily: [Object],
//             digest: [Array]
//           },
//           recipe: {
//             uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_6d841f3889b290f4cea2469ef3f3b985',
//             label: 'Roasted Tomato, Eggplant And Haloumi Burger',
//             image: 'https://www.edamam.com/web-img/34f/34fda53155f4ac9227271d14b6d4def0.jpg',
//             source: 'Donna Hay',
//             url: 'http://www.donnahay.com.au/recipes/mains/vegetables/roasted-tomato-eggplant-and-haloumi-burger',
//             shareAs: 'http://www.edamam.com/recipe/roasted-tomato-eggplant-and-haloumi-burger-6d841f3889b290f4cea2469ef3f3b985/burger',
//             yield: 8,
//             dietLabels: [],
//             healthLabels: [Array],
//             cautions: [Array],
//             ingredientLines: [Array],
//             ingredients: [Array],
//             calories: 1454.031488,
//             totalWeight: 1228.4832000000001,
//             totalTime: 0,
//             totalNutrients: [Object],
//             totalDaily: [Object],
//             digest: [Array]
//           },
//           recipe: {
//             uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_b6da2044f45070037d80ad2c8524b2ed',
//             label: 'Pork And Apricot Burger',
//             image: 'https://www.edamam.com/web-img/111/111e350989a5baae23107f85d03b707c.jpg',
//             source: 'BBC Good Food',
//             url: 'http://www.bbcgoodfood.com/recipes/5644/',
//             shareAs: 'http://www.edamam.com/recipe/pork-and-apricot-burger-b6da2044f45070037d80ad2c8524b2ed/burger',
//             yield: 1,
//             dietLabels: [],
//             healthLabels: [Array],
//             cautions: [Array],
//             ingredientLines: [Array],
//             ingredients: [Array],
//             calories: 203.25,
//             totalWeight: 125,
//             totalTime: 0,
//             totalNutrients: [Object],
//             totalDaily: [Object],
//             digest: [Array]
//           },

//         }

// ];
