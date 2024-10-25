const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.post('/ratings', async (req, res) => {
    const { restaurantName, ratingValue } = req.body;

    try {
        await ratingController.addNewRating(restaurantName, ratingValue);
        res.status(201).json({ message: 'Rating added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/ratings/average/:restaurantName', async (req, res) => {
    const restaurantName = req.params.restaurantName;

    try {
        const averageRating = await ratingController.calculateAverage(restaurantName);
        res.status(200).json({ restaurant: restaurantName, averageRating });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
