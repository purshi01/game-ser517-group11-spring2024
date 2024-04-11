import React from "react";
import "../../styles/ShoppingCart.css";

const ShoppingCartComp = ({ cart }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className={item.value}>
            <span className="item-name">{item.name}</span>
            <span className="item-value">
              {item.register ? "Done" : "Not Done"}
            </span>
          </li>
        ))}
      </ul>
      {/* Add a button component */}
      <button className="checkout-button">Checkout</button>
      {/* Add an input field component */}
      <input type="text" placeholder="Enter promo code" className="promo-input" />
    </div>
  );
};

export default ShoppingCartComp;
