const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/displayController');

router.get('/restaurants', restaurantController.getAllRestaurants); 
router.get('/breakfast', restaurantController.getBreakfastRestaurants);
router.get('/lunch', restaurantController.getLunchRestaurants);
router.get('/dinner', restaurantController.getDinnerRestaurants);
router.get('/dessert', restaurantController.getDessertRestaurants);

module.exports = router;
