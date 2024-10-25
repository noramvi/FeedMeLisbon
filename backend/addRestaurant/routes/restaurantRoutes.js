const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/restaurants', restaurantController.addNewRestaurant);

module.exports = router;

