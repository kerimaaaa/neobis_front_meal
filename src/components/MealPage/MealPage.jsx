import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MealPage.module.css';



function MealPage({ }) {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        // Fetch meal data based on meal ID from the API using Axios
        const getMeal = async () => {
            axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then(response => setMeal(response.data.meals[0]))
                .catch(error => console.log(error));
        };
        getMeal();
    }, [id]);

    return (
        <section>
            {meal ? (
                <div className={styles.meal_container}>
                    <div className={styles.meal_ingredients}>
                        <h2>{meal.strMeal}</h2>
                        <p> {meal.strCategory} | {meal.strArea}</p>
                        <h3>Ingredients:</h3>
                        <ul>
                            {Object.entries(meal)
                                .filter(([key, value]) => key.startsWith('strIngredient') && value)
                                .map(([key, value]) => (
                                    <li key={key}>{value} - {meal[`strMeasure${key.slice(13)}`]}</li>
                                ))}
                        </ul>
                    </div>
                    <div >
                        <img className={styles.meal_img} 
                        src={meal.strMealThumb} 
                        alt={meal.strMeal} />
                    </div>
                    <div>
                 <h3 className={styles.meal_instructions}>Instructions</h3>
                 <p className={styles.meal_instructions_details}>{meal.strInstructions}</p>
                 </div>
                </div>
                 
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
}

export default MealPage;
