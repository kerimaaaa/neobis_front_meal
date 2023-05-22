import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './SearchPage.module.css'




const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
            );
            setSearchResults(response.data.meals);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('search on "enter" key');
    };
    return (
        <div className={styles.search}>
            <div className={styles.search_header}>
                <h3>Find Your Meal</h3>
                <form onSubmit={handleSubmit} className={styles.search_form}>
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Find your meal"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.search_input}
                    />
                    <button className={styles.search_btn} onClick={handleSearch}>Search</button>
                </form>
            </div>
            <div className={styles.search_result_container}>
                <ul>
                    {searchResults.map((result) => (
                        <li key={result.idMeal} className={styles.search_li}>
                            <Link to={`/meal/${result.idMeal}`}>
                                <div className={styles.search_result_sub_container} > 
                                    <div className="flex">
                                        <img
                                            className={styles.search_img}
                                            src={result.strMealThumb}
                                            alt={result.strMeal}
                                        />
                                    </div>
                                    <div className={styles.search_info}>
                                        <p className={styles.search_name}
                                        >
                                            {result.strMeal}
                                            
                                        </p>
                                        <span className={styles.search_tags}>
                                                {result.strCategory} | {result.strArea}
                                            </span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchPage;



