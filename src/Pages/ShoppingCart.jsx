import React, { useState } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addItemToCart = (item) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - ${item.price * item.quantity}
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        Total: ${cartTotal}
      </div>
      <div>
        {/* Example of adding items to cart */}
        <button onClick={() => addItemToCart({ id: 1, name: 'Product 1', price: 10 })}>Add Product 1</button>
        <button onClick={() => addItemToCart({ id: 2, name: 'Product 2', price: 20 })}>Add Product 2</button>
        {/* Add more buttons for other products */}
      </div>
    </div>
  );
};

export default ShoppingCart;