CREATE TABLE Restaurant (
    RestaurantID INT NOT NULL AUTO_INCREMENT, 
    Name VARCHAR(30),
    Location VARCHAR(50),
    Type VARCHAR(30),
    PRIMARY KEY (RestaurantID)
);
 
CREATE TABLE Rating (
    RatingID INT NOT NULL AUTO_INCREMENT, 
    RatingValue INT,
    RestaurantID INT,
    PRIMARY KEY (RatingID), 
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
