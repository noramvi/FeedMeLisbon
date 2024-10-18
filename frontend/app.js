document.addEventListener('DOMContentLoaded', () => {
    // Function to display restaurants in the DOM
    function displayRestaurants(restaurants) {
        const container = document.getElementById('restaurants-container');
        container.innerHTML = '';

        // Loop through the restaurants and create restaurant cards
        restaurants.forEach(restaurant => {
            console.log(restaurant); // Log restaurant object for debugging
            const restaurantCard = `
                <div class="restaurant-card">
                    <h3>${restaurant.Name}</h3>
                    <div class="location-container">
                        <img src="img/map pin.png" class="location-image" alt="Map Pin">
                        <span>${restaurant.Location}</span>
                    </div>
                    <div class="rating-container">
                    <!-- Placeholder for average rating -->
                    <span>Rating: N/A</span>
                </div>
                </div>
            `;
            container.innerHTML += restaurantCard;

            // Fetch the average rating for this restaurant
            fetchAverageRating(restaurant.Name);
        });
    }

    // Function to fetch average rating for a specific restaurant
async function fetchAverageRating(restaurantName) {
    try {
        const response = await fetch(`http://localhost:3000/api/average-rating/${restaurantName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(`Average Rating for ${data.restaurant}: ${data.averageRating}`);

        // Update the UI with the average rating
        const restaurantCards = document.querySelectorAll('.restaurant-card');
        restaurantCards.forEach(card => {
            const titleElement = card.querySelector('h3');
            if (titleElement && titleElement.textContent === restaurantName) {
                const ratingElement = card.querySelector('.rating-container span');
                ratingElement.innerHTML = `Rating: ${data.averageRating}`;
            }
        });
    } catch (error) {
        console.error('Error fetching average rating:', error);
    }
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

    // Fetch lunch restaurants when the "Brunch" button is clicked
    document.getElementById('lunch-btn').addEventListener('click', () => {
        fetch('http://localhost:3000/api/lunch')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('lunch-btn').classList.add('active');
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

    // Open the modal
    document.getElementById('add-restaurant-btn').addEventListener('click', () => {
        document.getElementById('add-restaurant-modal').style.display = 'block';
    });

    // Close the modal when the close button is clicked
    document.getElementById('close-btn').addEventListener('click', () => {
        closeModal();
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('add-restaurant-modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Function to close the modal
    function closeModal() {
        document.getElementById('add-restaurant-modal').style.display = 'none';
    }

    // Function to handle form submission
    const form = document.getElementById('add-restaurant-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission

            // Get the values from the form
            const name = document.getElementById('restaurant-name').value;
            const location = document.getElementById('restaurant-location').value;
            const type = document.getElementById('restaurant-type').value;

            // Make a POST request to your backend to add the restaurant
            fetch('http://localhost:3000/api/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: name,
                    Location: location,
                    Type: type
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
                closeModal(); // Close the modal
                form.reset(); // Reset the form
                fetchAllRestaurants(); // Optionally refresh the restaurant list
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    } else {
        console.error('add-restaurant-form not found');
    }

    // Function to fetch all restaurants (if you want to refresh the list)
    function fetchAllRestaurants() {
        fetch('http://localhost:3000/api/restaurants')
            .then(response => response.json())
            .then(data => displayRestaurants(data))
            .catch(err => console.error('Error fetching all restaurants:', err));
    }
});
