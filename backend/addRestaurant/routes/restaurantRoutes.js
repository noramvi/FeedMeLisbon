const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Define your restaurant routes here
router.get('/restaurants', restaurantController.getAllRestaurants); // Dette må være korrekt
router.get('/breakfast', restaurantController.getBreakfastRestaurants);
router.get('/lunch', restaurantController.getLunchRestaurants);
router.get('/dinner', restaurantController.getDinnerRestaurants);
router.get('/dessert', restaurantController.getDessertRestaurants);
router.post('/restaurants', restaurantController.addNewRestaurant);

module.exports = router;

