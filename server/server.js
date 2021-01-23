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

app.get("/api/getRecipe/:input", (req,res) => {
    console.log("GET getRecipe");
    console.log("req:", req.params.input);
    let response;
    async function getRecipes(input) {
        try {
            response = await axios.get(`https://api.edamam.com/search?q=${input}&app_id=${secrets.APP_ID}&app_key=${secrets.APP_KEY}`);
                response;
                console.log("result getRecipe", response);
                console.log("hits:",response.data.hits); // 
                res.json({
                    success: true,
                    recipes: response.data.hits,
                });
              }
        catch (error){
            console.log("error in getRecipe", error);
            res.json({ success: false });
        }
        return response;
    };
    getRecipes(req.params.input);

})

// app.get("/logout", (req, res) => {
//     console.log("userId logout before", req.session.userId);
//     req.session = null;
//     console.log("userId logout after", req.session);
//     res.redirect("/landingpage");
// });

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

