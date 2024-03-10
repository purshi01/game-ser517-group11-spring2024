import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const generateRandomName = async () => {
    const color = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet', 'Black', 'White', 'Pink', 'Purple'];
    const object = ['Whale', 'Fish', 'Dog', 'Cat', 'Mouse', 'Rat', 'Frog', 'Horse', 'Spaceship', 'Car', 'Bike', 'Bus', 'Train', 'Ship', 'Boat', 'Shuttle', 'Plane', 'Jet', 'King', 'Queen', 'Jester', 'Joker', 'Ace', 'Crown', 'Prince', 'Princess', 'Knight', 'Rook', 'Pawn', 'Bishop', 'Cheese', 'Pasta', 'Noodles', 'Soup', 'Egg', 'Carrot', 'Apple', 'Banana', 'Guitar', 'Piano', 'Violin', 'Organ', 'Keyboard', 'Square', 'Triangle', 'Circle', 'Rectangle', 'Lake', 'Sea', 'Ocean', 'Pond', 'Water', 'Rain', 'Cloud'];
    
    let studentName;
    let existsInDatabase;

    do {
        let randomColor = color[Math.floor(Math.random()*color.length)];
        let randomObject = object[Math.floor(Math.random()*object.length)];
        let randomNumber = Math.floor(Math.random()*900) + 100;
        studentName = randomColor + randomObject + randomNumber;
       
        try {
            const response = await axios.get(`${API_BASE_URL}/check/${studentName}`);
            existsInDatabase = response.data.exists;
        } catch (error) {
            console.error("Error checking if student name exists:", error);
            existsInDatabase = false; // Assuming it doesn't exist if there's an error
        }
        console.log(studentName);
    } while (existsInDatabase)
    return studentName;
}