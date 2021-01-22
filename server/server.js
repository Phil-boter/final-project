const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");



app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));




app.get("/api/getRecipe/:input", (req,res) => {
    console.log("GET getRecipe");
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