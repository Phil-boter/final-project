const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const secrets = require("../secrets.json");
const { default: axios } = require("axios");



app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));




app.get("/api/getRecipe/:input", (req,res) => {
    console.log("GET getRecipe");
    console.log("req:", req.params.input);
    let response;
    async function getRecipes(input) {
        try {
            response = await axios.get(`https://api.edamam.com/search?q=${input}&app_id=${secrets.APP_ID}&app_key=${secrets.APP_KEY}`);
                console.log("result getRecipe", response);
                console.log("hits:",response.data.hits);
                res.json({
                    success: true,
                    recipes: response.data.hits,
                })
              }
        catch (error){
                 console.log("error in getRecipe", error);
        }
        return response;
    };
    getRecipes(req.params.input);

})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});


// const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
// const data = await response.json();
// setRecipes(data.hits);
// console.log("data:", data);