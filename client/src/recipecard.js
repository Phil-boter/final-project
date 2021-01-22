import React from 'react';
import './recipecard.css';

export default function Recipecard (props) {
console.log("props in recipecard", props);
    return (
         <div className="recipecard-container">

             <h1 className="recipecard-title">{props.title}</h1>            
             <img className="recipecard-img" src={props.img} alt="" />
             <ol className="recipecard-ingredients">
                 {props.ingredients.map(ingredient => ( 
                    <li>{ingredient.text}</li>
                 ))}
             </ol>
             <div className="recipecard-info-container">
                <div><p className="recipecard-info">Calories: {props.calories}</p></div>
                <div><p className="recipecard-info">Cautions: {props.cautions}</p></div>
             </div> 
         </div>
    );
};
