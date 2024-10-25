# Use the official Node.js image from the Docker Hub
FROM node:16

# To set the working directory in the container
WORKDIR /app

# To copy package.json and package-lock.json
COPY package*.json ./


# To install dependencies
RUN npm install

# To copy the rest of our application code
COPY . .

EXPOSE 3002

# Set environment variables
ENV DB_HOST=mysql            
ENV DB_USER=feedme_user       
ENV DB_PASS=feedmelisbon       

# Start application
CMD ["node", "server.js"]  