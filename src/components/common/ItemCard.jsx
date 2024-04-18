import React, { useState } from "react";
const ItemCard = ({ item, onAddToCart }) => {
  const [cartQuantity, setCartQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setCartQuantity(Math.max(1, parseInt(e.target.value, 10)));
  };

  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity: cartQuantity, available: item.quantity });
  };

  return (
    <div className="shop-item-card">
      <h4 className="shop-item-title">{item.item_name}</h4>
      <p>Description: {item.description}</p>
      <p className="shop-item-details">Points needed: {item.points}</p>
      <p className="shop-item-details">Quantity available: {item.quantity}</p>
      <div className="item-actions">
        <input
          type="number"
          value={cartQuantity}
          onChange={handleQuantityChange}
          min="1"
          max={item.quantity}
        />
        <button className="action-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ItemCard;
