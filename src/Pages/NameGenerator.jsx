import React, {useState} from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const NameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState('');
  const [numOfStudents, setNumOfStudents] = useState('');

  const generateRandomName = () => { 
    const color = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet', 'Black', 'White', 'Pink', 'Purple'];
    const object = ['Whale', 'Fish', 'Dog', 'Cat', 'Mouse', 'Rat', 'Frog', 'Horse', 'Spaceship', 'Car', 'Bike', 'Bus', 'Train', 'Ship', 'Boat', 'Shuttle', 'Plane', 'Jet', 'King', 'Queen', 'Jester', 'Joker', 'Ace', 'Crown', 'Prince', 'Princess', 'Knight', 'Rook', 'Pawn', 'Bishop', 'Cheese', 'Pasta', 'Noodles', 'Soup', 'Egg', 'Carrot', 'Apple', 'Banana', 'Guitar', 'Piano', 'Violin', 'Organ', 'Keyboard', 'Square', 'Triangle', 'Circle', 'Rectangle', 'Lake', 'Sea', 'Ocean', 'Pond', 'Water', 'Rain', 'Cloud'];
    
    let studentName;
    let existsInDatabase;

    do {
        let randomColor = color[Math.floor(Math.random()*color.length)];
        let randomObject = object[Math.floor(Math.random()*object.length)];
        let randomNumber = Math.floor(Math.random()*900) + 100;
        studentName = randomColor + randomObject + randomNumber;
        
        existsInDatabase = false;
       /*
        try {
            // const response = await axios.get(`${API_BASE_URL}/${studentName}`);
            const response = axios.get(`${API_BASE_URL}/${studentName}`);
            existsInDatabase = response.data.exists;
        } catch (error) {
            console.error("Error checking if student name exists:", error);
            existsInDatabase = false; // Assuming it doesn't exist if there's an error
            throw error;
        }
        */

        
    } while (existsInDatabase)
    return studentName;
  };
  const addNStudents = () => {
    const num = parseInt(numOfStudents);
    if (!isNaN(num) && num > 0) {
      const newNames = [];
      for (let i = 0; i < num; i++) {
        let newName;
        do {
          newName = generateRandomName();
        } while (newNames.includes(newName));
        newNames.push(newName);
      }
      if(generatedNames == '') {
        setGeneratedNames(newNames.join('\n'))
      } else {
        setGeneratedNames(generatedNames + '\n' + newNames.join('\n'));
      }
    }
  };

  return (
    <div>
      <h1>Testing random name generation</h1>
      <textarea value={generatedNames} readOnly cols={50} rows={15}> </textarea>
      <textarea value={numOfStudents} typeof="number" onChange={(e) => setNumOfStudents(e.target.value)}></textarea>
      <button onClick={addNStudents}>Generate Multiple Students</button>
    </div>
  );
};

export default NameGenerator;
