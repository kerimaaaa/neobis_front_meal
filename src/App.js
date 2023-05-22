import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import MealPage from './components/MealPage/MealPage';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
  return (

    <div>
      <header className='App_header'>
        <a href="/">
          <h1 className='App_title'>The Meal</h1>
        </a>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/meal/:id" element={<MealPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
