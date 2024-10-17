const express = require('express');
const router = express.Router();
const restaurants = require('../mockdata.json').restaurants;


router.get('/restaurants', (req, res) => {
    res.json(restaurants); 
});

router.post('/restaurants', (req, res) => {
    const newRestaurant = req.body;
    restaurants.push(newRestaurant); // Add the new restaurant to the mockdata
    res.json(restaurants); // Respond with the updated list of restaurants
});

// Fetch breakfast restaurants
router.get('/breakfast', (req, res) => {
    const breakfastRestaurants = restaurants.filter(restaurant => 
        restaurant.type.includes('Breakfast')
    );
    res.json(breakfastRestaurants);
});

// Fetch brunch restaurants
router.get('/brunch', (req, res) => {
    const brunchRestaurants = restaurants.filter(restaurant => 
        restaurant.type.includes('Brunch')
    );
    res.json(brunchRestaurants);
});

// Fetch dinner restaurants
router.get('/dinner', (req, res) => {
    const dinnerRestaurants = restaurants.filter(restaurant => 
        restaurant.type.includes('Dinner')
    );
    res.json(dinnerRestaurants);
});

// Fetch dessert restaurants
router.get('/dessert', (req, res) => {
    const dessertRestaurants = restaurants.filter(restaurant => 
        restaurant.type.includes('Dessert')
    );
    res.json(dessertRestaurants);
});

module.exports = router;