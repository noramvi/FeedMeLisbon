const pool = require('../config/db'); // Anta at du har en db-fil for MySQL-tilkoblingen

// Get all restaurants
const getAllRestaurants = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Restaurant');
        res.json(results);
    } catch (error) {
        console.error('Error fetching all restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get breakfast restaurants
const getBreakfastRestaurants = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Restaurant WHERE Type = "Breakfast"');
        res.json(results);
    } catch (error) {
        console.error('Error fetching breakfast restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get lunch restaurants
const getLunchRestaurants = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Restaurant WHERE Type = "Lunch"');
        res.json(results);
    } catch (error) {
        console.error('Error fetching lunch restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get dinner restaurants
const getDinnerRestaurants = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Restaurant WHERE Type = "Dinner"');
        res.json(results);
    } catch (error) {
        console.error('Error fetching dinner restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get dessert restaurants
const getDessertRestaurants = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Restaurant WHERE Type = "Dessert"');
        res.json(results);
    } catch (error) {
        console.error('Error fetching dessert restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add a new restaurant
const addNewRestaurant = async (req, res) => {
    const { Name, Location, Type } = req.body;
    try {
        const query = 'INSERT INTO Restaurant (Name, Location, Type) VALUES (?, ?, ?)';
        await pool.query(query, [Name, Location, Type]);
        res.status(201).json({ message: 'Restaurant added successfully' });
    } catch (error) {
        console.error('Error adding new restaurant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllRestaurants,
    getBreakfastRestaurants,
    getLunchRestaurants,
    getDinnerRestaurants,
    getDessertRestaurants,
    addNewRestaurant,
};
