import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/NameGenerator.css"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const NameGenerator = () => {
  useEffect(() => {
    document.title = "Add Student Accounts"
  }, []);

  const [generatedNames, setGeneratedNames] = useState('');
  const [numOfStudents, setNumOfStudents] = useState('1');

  const generateRandomName = () => { 
    const color = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet', 'Black', 'White', 'Pink', 'Purple', 'Silver', 'Gold'];
    const object = [
      'Whale', 'Fish', 'Dog', 'Cat', 'Mouse', 'Sheep', 'Goat', 'Rat', 'Frog', 'Horse', 'Wolf', 'Cow', 'Pig', 'Chicken', 'Tiger', 
      'Unicorn', 'Dragon', 'Werewolf', 'Vampire', 'Mermaid', 
      'Spaceship', 'Car', 'Bike', 'Bus', 'Train', 'Ship', 'Boat', 'Shuttle', 'Plane', 'Jet',
      'King', 'Queen', 'Jester', 'Joker', 'Ace', 'Crown', 'Prince', 'Princess', 'Knight', 'Rook', 'Pawn', 'Bishop',
      'Cheese', 'Pasta', 'Noodles', 'Soup', 'Egg', 'Carrot', 'Apple', 'Banana', 'Crackers', 
      'Guitar', 'Piano', 'Violin', 'Organ', 'Keyboard',
      'Square', 'Triangle', 'Circle', 'Rectangle',
      'Lake', 'Sea', 'Ocean', 'Pond', 'Water', 'Rain', 'Cloud'
    ];
    const letters = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM";

    let studentName;
    let existsInDatabase;
    let password = '';

    do {
        let randomColor = color[Math.floor(Math.random()*color.length)];
        let randomObject = object[Math.floor(Math.random()*object.length)];
        let randomNumber = Math.floor(Math.random()*900) + 100;
        for (let i = 0; i < 20; i++) {
          password += letters[Math.floor(Math.random() * letters.length)];
        }

        studentName = randomColor + randomObject + randomNumber;

       /* Not too sure on this aspect
        try {
            // const response = await axios.get(`${API_BASE_URL}/auth/register
            // const response = await acios.get('${API_BASE_URL}/instructors/courses/${courseId}/students)
            // const response = await axios.get(`${API_BASE_URL}/${studentName}`);

            existsInDatabase = response.data.exists;
        } catch (error) {
            console.error("Error checking if student name exists:", error);
            existsInDatabase = false; // Assuming it doesn't exist if there's an error
            throw error;
        }
        */
        

    } while (generatedNames.includes(studentName) || existsInDatabase)
    return {username: studentName, password: password};
  };

  const addStudents = () => {
    const num = parseInt(numOfStudents);
    if (!isNaN(num) && num > 0) {
      const newStudents = [];
      for (let i = 0; i < num; i++) {
        let newStudent = generateRandomName();
        newStudents.push(newStudent.username + ',' + newStudent.password);
      }
      if(generatedNames === '') {
        setGeneratedNames(newStudents.join('\n'))
      } else {
        setGeneratedNames(prevNames => prevNames + '\n' + newStudents.join('\n'));
      }
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(generatedNames);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "generated_names.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="container">
      <h1>Generate Student Accounts</h1>
      <div className="columns">
        <div className="column">
          <textarea className="generated-names" 
            value={generatedNames} 
            readOnly 
            cols={50} rows={15}
            ></textarea>
        </div>
        <div className="column">
          <div>
            <textarea className="number-of-students" 
            value={numOfStudents}
            cols={3} rows={1} 
            typeof="number" 
            onChange={(e) => setNumOfStudents(e.target.value)}
            ></textarea>
          </div>
          <div className="button-container">
            <button className="generate-button" onClick={addStudents}>Generate Students</button>
          </div>
          <div className="button-container">
            <button className="download-button" onClick={downloadCSV}>Download as a .csv file</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameGenerator;
