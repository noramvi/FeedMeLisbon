const mysql = require('mysql2/promise'); // or 'pg' for PostgreSQL

//må man ha connection inne i funksjonen når man ikke har main?

//function for calculating average for a given restaurant 
async function calculateAverage(connection, restaurantName) {
    const query = `
        SELECT RatingValue
        FROM Rating
        JOIN Restaurant USING (RestaurantID)
        WHERE Name = ?` ; 

    try {
        const [rows] = await connection.execute(query, [restaurantName]);
        console.log(rows);

        let sum = 0;
        let counter = 0;

        // Calculate the sum and count of ratings
        for (const row of rows) {
            counter += 1;
            sum += row.RatingValue; // Assuming RatingValue is the correct field name
        }

        const average = counter > 0 ? sum / counter : 0; // Handle division by zero
        console.log(average);
        return average;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error; // Propagate the error
    }
}

// function for adding new rating (the restaurant must exist in order to add rating)
async function addNewRating(connection, restaurantName, ratingValue){
    try {
        // Get a connection from the pool
        //const connection = await pool.getConnection();

        // Step 1: Fetch restaurantID based on the restaurant name
        const selectQuery = `
          SELECT RestaurantID 
          FROM Restaurant 
          WHERE Name = ?
        `;
        const [rows] = await connection.execute(selectQuery, [restaurantName]);
    
        // Check if restaurant exists
        if (rows.length === 0) {
          throw new Error(`Restaurant with name "${restaurantName}" not found.`);
        }
    
        const restaurantID = rows[0].RestaurantID;
    
        // Step 2: Insert the new rating using the fetched restaurantID
        const insertQuery = `
          INSERT INTO Rating (RatingValue, RestaurantID) 
          VALUES (?, ?)
        `;
        const [result] = await connection.execute(insertQuery, [ratingValue, restaurantID]);
    
        console.log(`Rating inserted with ID: ${result.insertId} for restaurant: ${restaurantName}`);
    
      } catch (error) {
        console.error('Error inserting rating:', error.message);
      }
}



// Example usage
async function main() {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Noramviken123',
        database: 'feedMe'
    });

    const restaurantName = 'RestaurantTwo'; // Replace with actual restaurant name
    const ratingValue = 4
    addNewRating(connection, restaurantName, ratingValue)
    const averageRating = await calculateAverage(connection, restaurantName);
    console.log(`Average Rating for ${restaurantName}:`, averageRating);

    await connection.end(); // Close the connection
}

main().catch(console.error);
