document.addEventListener('DOMContentLoaded', () => {
    // Function to display restaurants in the DOM
    function displayRestaurants(restaurants) {
        const container = document.getElementById('restaurants-container');
        container.innerHTML = '';

        // Loop through the restaurants and create restaurant cards
        restaurants.forEach(restaurant => {
            const restaurantCard = `
                <div class="restaurant-card">
                    <h3>${restaurant.name}</h3>
                    <div class="location-container">
                        <img src="img/map pin.png" class="location-image">
                        <span>${restaurant.location}</span>
                    </div>
                    <p>Rating: ${restaurant.rating}</p>
                </div>
            `;
            container.innerHTML += restaurantCard;
        });
    }

    // Function to reset all buttons' active state
    function resetButtonActiveState() {
        const buttons = document.querySelectorAll('#meal-selection button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
    }

    // Fetch all restaurants when the "Show All Restaurants" button is clicked
    document.getElementById('all-btn').addEventListener('click', () => {
        fetch('http://localhost:3000/api/restaurants')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('all-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching all restaurants:', err));
    });

    // Fetch breakfast restaurants when the "Breakfast" button is clicked
    document.getElementById('breakfast-btn').addEventListener('click', () => {
        fetch('http://localhost:3000/api/breakfast')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('breakfast-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching breakfast data:', err));
    });

    // Fetch brunch restaurants when the "Brunch" button is clicked
    document.getElementById('brunch-btn').addEventListener('click', () => {
        fetch('http://localhost:3000/api/brunch')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('brunch-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching brunch data:', err));
    });

    // Fetch dinner restaurants when the "Dinner" button is clicked
    document.getElementById('dinner-btn').addEventListener('click', () => {
        fetch('http://localhost:3000/api/dinner')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('dinner-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching dinner data:', err));
    });

    // Fetch dessert restaurants when the "Dessert" button is clicked
    document.getElementById('dessert-btn').addEventListener('click', () => {
        fetch('http://localhost:3000/api/dessert')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('dessert-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching dessert data:', err));
    });

    // Function to open the modal
    document.getElementById('add-restaurant-btn').addEventListener('click', () => {
        document.getElementById('add-restaurant-modal').style.display = 'block';
    });

    // Function to close the modal
    document.getElementById('close-btn').addEventListener('click', () => {
        document.getElementById('add-restaurant-modal').style.display = 'none';
    });

    // Function to handle form submission
    document.getElementById('add-restaurant-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Get the values from the form
        const name = document.getElementById('restaurant-name').value;
        const location = document.getElementById('restaurant-location').value;
        const type = document.getElementById('restaurant-type').value;
        const rating = document.getElementById('restaurant-rating').value;

        console.log(`Name: ${name}, Location: ${location}, Type: ${type}, Rating: ${rating}`); // Sjekk verdiene

        // Make a POST request to your backend to add the restaurant
        fetch('http://localhost:3000/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                location,
                type,
                rating
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Close the modal and reset the form
            document.getElementById('addRestaurantModal').style.display = 'none';
            document.getElementById('add-restaurant-form').reset();
            // Optionally, you can refresh the restaurant list here
            fetchAllRestaurants();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    // Function to fetch all restaurants (if you want to refresh the list)
    function fetchAllRestaurants() {
        fetch('http://localhost:3000/api/restaurants')
            .then(response => response.json())
            .then(data => displayRestaurants(data))
            .catch(err => console.error('Error fetching all restaurants:', err));
    }
});
