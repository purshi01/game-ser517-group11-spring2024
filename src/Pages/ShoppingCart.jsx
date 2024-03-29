import PageBackGround from "../components/common/PageBackGround";
import "../styles/InstructorHomePage.css";
import React, { useState } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addItemToCart = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        item.quantity = newQuantity;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <span>{item.name} - ${item.price}</span>
            <div>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div>Total: ${cartTotal}</div>
      <button onClick={() => setCart([])}>Clear Cart</button>
      {/* Example of adding items to cart */}
      <div>
        <button onClick={() => addItemToCart({ id: 1, name: 'Product 1', price: 10 })}>Add Product 1</button>
        <button onClick={() => addItemToCart({ id: 2, name: 'Product 2', price: 20 })}>Add Product 2</button>
        {/* Add more buttons for other products */}
      </div>
    </div>
  );
};

export default ShoppingCart;
