import React from "react";
import "../../styles/ShoppingCartComponent.css";

const ShoppingCartComponent = ({ courses }) => {
  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <span className="course-title">{course.title}</span>
            <span className="course-price">${course.price}</span>
            <button className="remove-button">Remove</button>
          </li>
        ))}
      </ul>
      <div className="total">
        Total: ${courses.reduce((total, course) => total + course.price, 0)}
      </div>
      <button className="checkout-button">Checkout</button>
    </div>
  );
};

export default ShoppingCartComponent;
