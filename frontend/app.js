document.addEventListener('DOMContentLoaded', () => {
    function displayRestaurants(restaurants) {
        const container = document.getElementById('restaurants-container');
        container.innerHTML = '';

        restaurants.forEach(restaurant => {
            const restaurantCard = `
                <div class="restaurant-card">
                    <h3>${restaurant.Name}</h3>
                    <div class="location-container">
                        <img src="map_pin.jpg" class="location-image" alt="Map Pin">
                        <span>${restaurant.Location}</span>
                    </div>
                    <div class="rating-container">
                        <span id="avg-rating-${restaurant.Name}">Rating: </span>
                    </div>
                    <button class="rate-btn" data-restaurant="${restaurant.Name}">Rate</button>
                </div>
            `;
            container.innerHTML += restaurantCard;

            fetchAverageRating(restaurant.Name);
        });
    }

    async function fetchAverageRating(restaurantName) {
        try {
            const response = await fetch(`/api/ratings/average/${restaurantName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(`Average Rating for ${data.restaurant}: ${data.averageRating}`);

            // Update the UI with the average rating
            const ratingElement = document.getElementById(`avg-rating-${restaurantName}`);
            if (ratingElement) {
                ratingElement.innerHTML = `Rating: ${data.averageRating.toFixed(1)}`; // Display with one decimal
            }
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
    }

    async function handleAddRating(restaurantName) {
        const ratingValue = prompt(`Enter your rating for ${restaurantName} (1-10):`);
        
        if (ratingValue && !isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 10) {
            try {
                const response = await fetch('api/ratings/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ restaurantName, ratingValue: Number(ratingValue) })
                });
                
                if (!response.ok) throw new Error('Failed to add rating');
    
                alert('Rating added successfully!');
                await fetchAverageRating(restaurantName); // Refresh the average rating display
    
            } catch (error) {
                console.error('Error adding rating:', error);
            }
        } else {
            alert('Please enter a valid rating between 1 and 10.');
        }
    }

    function resetButtonActiveState() {
        const buttons = document.querySelectorAll('#meal-selection button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
    }

    
    document.getElementById('all-btn').addEventListener('click', () => {
        fetch('api/all/')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('all-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching all restaurants:', err));
    });

    document.getElementById('breakfast-btn').addEventListener('click', () => {
        fetch('/api/breakfast/')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('breakfast-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching breakfast data:', err));
    });

    document.getElementById('lunch-btn').addEventListener('click', () => {
        fetch('/api/lunch/')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('lunch-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching brunch data:', err));
    });

    document.getElementById('dinner-btn').addEventListener('click', () => {
        fetch('/api/dinner/')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('dinner-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching dinner data:', err));
    });

    document.getElementById('dessert-btn').addEventListener('click', () => {
        fetch('/api/dessert/')
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
                resetButtonActiveState();
                document.getElementById('dessert-btn').classList.add('active');
            })
            .catch(err => console.error('Error fetching dessert data:', err));
    });

    document.getElementById('add-restaurant-btn').addEventListener('click', () => {
        document.getElementById('add-restaurant-modal').style.display = 'block';
    });

document.getElementById('close-btn').addEventListener('click', () => {
    closeModal();
});    

window.addEventListener('click', (event) => {
    const modal = document.getElementById('add-restaurant-modal');
    if (event.target === modal) {
        closeModal();
    }
});

function closeModal() {
    document.getElementById('add-restaurant-modal').style.display = 'none';
}

    const form = document.getElementById('add-restaurant-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const name = document.getElementById('restaurant-name').value;
            const location = document.getElementById('restaurant-location').value;
            const type = document.getElementById('restaurant-type').value;

            fetch('api/restaurants/', {
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
                closeModal(); 
                form.reset(); 
                fetchAllRestaurants(); 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    } else {
        console.error('add-restaurant-form not found');
    }

function openRatingModal(restaurantName) {
    document.getElementById('restaurant-name2').value = restaurantName; // Set restaurant name in hidden input
    document.getElementById('rating-modal').style.display = 'block'; // Show modal
}

document.getElementById('close-rating-modal').addEventListener('click', closeRatingModal);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('rating-modal');
    if (event.target === modal) {
        closeRatingModal();
    }
});

function closeRatingModal() {
    document.getElementById('rating-modal').style.display = 'none'; 
}

document.getElementById('rating-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const restaurantName = document.getElementById('restaurant-name2').value; 
    const ratingValue = Number(document.getElementById('rating-value').value); 

    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 10) {
        alert('Enter a valid rating between 1 and 10.');
        return; 
    }

    try {
        const response = await fetch('api/ratings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ restaurantName, ratingValue }), 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        closeRatingModal(); 
        await fetchAverageRating(restaurantName); 
    } catch (error) {
        console.error('Error adding rating:', error);
    }
});

document.querySelectorAll('.rate-button').forEach(button => {
    button.addEventListener('click', () => {
        const restaurantName = button.getAttribute('data-restaurant-name');
        openRatingModal(restaurantName);
    });
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('rate-btn')) {
        const restaurantName = event.target.getAttribute('data-restaurant');
        openRatingModal(restaurantName); 
    }
});

function fetchAllRestaurants() {
    fetch('/api/restaurants/')
        .then(response => response.json())
        .then(data => displayRestaurants(data))
        .catch(err => console.error('Error fetching all restaurants:', err));
}
});
