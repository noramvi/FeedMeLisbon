const pool = require('../config/db'); 

async function calculateAverage(restaurantName) {
    const query = `
        SELECT RatingValue
        FROM Rating
        JOIN Restaurant USING (RestaurantID)
        WHERE Name = ?`; 

    try {
        const [rows] = await pool.query(query, [restaurantName]);
        console.log(rows);

        let sum = 0;
        let counter = 0;

        for (const row of rows) {
            counter += 1;
            sum += row.RatingValue; 
        }

        const average = counter > 0 ? sum / counter : 0; // Handle division by zero
        console.log(`Average rating for ${restaurantName}: ${average.toFixed(1)}`);
        return average;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error; 
    }
}

async function addNewRating(restaurantName, ratingValue) {
    const connection = await pool.getConnection(); 

    try {
        const selectQuery = `
          SELECT RestaurantID 
          FROM Restaurant 
          WHERE Name = ?`;
        const [rows] = await connection.query(selectQuery, [restaurantName]);
    
        if (rows.length === 0) {
            throw new Error(`Restaurant with name "${restaurantName}" not found.`);
        }
    
        const restaurantID = rows[0].RestaurantID;
    
        const insertQuery = `
          INSERT INTO Rating (RatingValue, RestaurantID) 
          VALUES (?, ?)`;
        const [result] = await connection.query(insertQuery, [ratingValue, restaurantID]);
    
        console.log(`Rating inserted with ID: ${result.insertId} for restaurant: ${restaurantName}`);
    } catch (error) {
        console.error('Error inserting rating:', error.message);
        throw error; 
    } finally {
        connection.release();
    }
}

module.exports = {
    calculateAverage,
    addNewRating,
};