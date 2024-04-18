import React, { useState } from "react";
import "../../styles/StoreItemStyles.css";

const StoreItem = ({ item, onDelete, onUpdate }) => {
  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State to store and update the item's details
  const [editableItem, setEditableItem] = useState(item);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(editableItem); // Pass updated item to the onUpdate function
    setIsEditing(false); // Exit edit mode
  };

  if (isEditing) {
    return (
      <div className="store-item">
        <div className="store-item-info">
          <input
            type="text"
            name="item_name"
            value={editableItem.item_name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editableItem.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="points"
            value={editableItem.points}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            value={editableItem.quantity}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>{" "}
          <button onClick={handleEditToggle}>Cancel</button>{" "}
        </div>
      </div>
    );
  }

  return (
    <div className="store-item">
      <div className="store-item-info">
        <h4>{editableItem.item_name}</h4>
        <p>Description: {editableItem.description}</p>
        <p>Points needed: {editableItem.points}</p>
        <p>Quantity available: {editableItem.quantity}</p>
        <button onClick={handleEditToggle}>Edit Item</button>{" "}
        <button onClick={() => onDelete(item.item_id)}>Delete Item</button>{" "}
        {/* Adding an Edit button */}
      </div>
    </div>
  );
};

export default StoreItem;
