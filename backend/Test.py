import sqlite3


def calculate_average(cursor, restaurantName): 
    cursor.execute("""SELECT RatingValue
                        FROM Rating
                        JOIN Restaurant USING RestID
                        WHERE Name = : restaurantName""", {"restaurantName":restaurantName})
    data = cursor.fetchall()
    print(data)
    sum = 0
    counter = 0
    for row in data: 
        counter += 1
        sum += row[0]
    print(sum/counter)
    return sum/counter

def main(): 
    con = sqlite3.connect("feedMe.db")
    cursor = con.cursor()
    
    cursor.executescript("""
        INSERT INTO Rating (RatingID, RatingValue, RestaurantID) VALUES (1, 10, 1);
        INSERT INTO Rating (RatingID, RatingValue, RestaurantID) VALUES (2, 5, 1);
        INSERT INTO Rating (RatingID, RatingValue, RestaurantID) VALUES (3, 2, 1);
        INSERT INTO Rating (RatingID, RatingValue, RestaurantID) VALUES (4, 4, 1);
        INSERT INTO Rating (RatingID, RatingValue, RestaurantID) VALUES (5, 6, 2);
        INSERT INTO Rating (RatingID, RatingValue, RestaurantID) VALUES (6, 5, 2);
        INSERT INTO Rating (RatingID, RatingValue, RestaurantID) VALUES (7, 8, 2);
        INSERT INTO Rating (RatingID, RatingValue, RestaurantID) VALUES (8, 1, 2);
        
        INSERT INTO Restaurant (RestaurantID, Name, Location, Type) VALUES (1, "restaurantOne", "here", "Breakfast");
        INSERT INTO Restaurant (RestaurantID, Name, Location, Type) VALUES (2, "restaurantTwo", "here", "Breakfast");
    """)
    
    calculate_average(cursor, "RestaurantOne")
        
    con.close()
        
  
    
