# Use the official Node.js image from the Docker Hub
FROM node:16

# To set the working directory in the container
WORKDIR /app

# To copy package.json and package-lock.json
COPY package*.json ./
#COPY addRestaurant/server.js ./
#COPY addRestaurant/routes/restaurantRoutes.js ./routes/
#COPY addRestaurant/controllers/restaurantController.js ./controllers/
#COPY addRestaurant/config/db.js ./config/
# To install dependencies
RUN npm install

# To copy the rest of our application code
COPY . .

# different port than for the other microservice 
EXPOSE 3000

ENV DB_HOST=mysql DB_USER=root DB_PASS=password

# Start application
CMD ["node", "server.js"]  # Adjust according to your main server file