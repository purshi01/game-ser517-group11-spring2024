import React from "react";
import "../../styles/ShoppingCart.css";

const ShoppingCartComp = ({ cart }) => {
  return (
    <div className="cart">
      <h2></h2>
      <ul>
        {cart.map((item) => (
          <li
            key={item.id}
            className={item.value}
          >
            <span className="item-name">{item.name}</span>
            <span className="item-value">
              {item.register ? "Done" : "Not Done"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCartComp;
