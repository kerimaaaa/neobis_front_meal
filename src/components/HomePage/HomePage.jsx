import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import SearchPage from '../SearchPage/SearchPage';

function HomePage() {
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        // Fetch random meal data from the API using Axios
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => setMeal(response.data.meals[0]))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <section>
                {meal ? (

                    <Link to={`/meal/${meal.idMeal}`}>
                        <div className={styles.homePage_container}>
                            <div className={styles.homePage_text}>
                                <h2>Meal of the Day</h2>
                                <h3>{meal.strMeal}</h3>
                                <p>{meal.strCategory} / {meal.strArea}</p>
                            </div>
                            <div >
                                <img src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className={styles.homePage_img} />
                            </div>
                        </div>
                    </Link>

                ) : (
                    <p>Loading...</p>
                )
                }
            </section >
            <SearchPage/>
        </div>
    );
}

export default HomePage;


