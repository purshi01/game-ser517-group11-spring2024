import React, { useState, useEffect } from "react";
import "../styles/ShopStyles.css";
import ItemCard from "../components/common/ItemCard";
import Cart from "../components/common/Cart";
import { useAuth } from "../context/AuthContext";

const ShopPage = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const selectedCourseId = localStorage.getItem("courseId");

  const { isLoggedIn, userType, remainingBucks, updateRemainingBucks } =
    useAuth();

  useEffect(() => {
    fetchItems();
  }, [selectedCourseId]);

  const fetchItems = async () => {
    if (selectedCourseId) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/items/${selectedCourseId}`
        );
        if (!response.ok) throw new Error("Failed to fetch items.");
        const itemsData = await response.json();
        setItems(itemsData);
      } catch (error) {
        console.error("Failed to retrieve items:", error);
        setError("Could not load items. Please try again later.");
      }
    }
  };

  const addToCart = (itemToAdd) => {
    const existingItem = cart.find(
      (item) => item.item_id === itemToAdd.item_id
    );
    if (existingItem) {
      if (existingItem.quantity + 1 > itemToAdd.available) {
        alert(
          `Cannot add more than the available stock of ${itemToAdd.available}.`
        );
        return;
      }
      const updatedCart = cart.map((item) =>
        item.item_id === itemToAdd.item_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.item_id !== itemId));
  };

  const checkout = async (totalCost) => {
    const numericRemainingBucks = parseInt(remainingBucks);

    if (totalCost > numericRemainingBucks) {
      alert("Not enough bucks to complete this purchase.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/buy_items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          username: localStorage.getItem("userId"),
        }),
      });
      if (!response.ok)
        throw new Error("Checkout failed: " + response.statusText);

      let itemDetails = "";
      cart.forEach((item) => {
        itemDetails += `${item.item_name} - ${item.quantity} x ${item.points} Points\n`;
      });

      const sendEmail = await fetch(`${API_BASE_URL}/send_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `Purchase by ${localStorage.getItem("userId")}`,
          recipient: "gameasu2024@gmail.com",
          body: `The user mentioned made the following purchases ${itemDetails}`,
        }),
      });
      if (!sendEmail.ok)
        throw new Error("Message Not Sent failed: " + sendEmail.statusText);

      const result = await response.json();
      alert("Checkout successful! Transaction ID: " + result.transaction_id);
      setCart([]);
      updateRemainingBucks(numericRemainingBucks - totalCost);
      fetchItems();
    } catch (err) {
      setError("Checkout failed: " + err.message);
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div className="shop-body">
      {error && <p className="error-message">{error}</p>}
      <h1 className="shop-title">Shop Items</h1>
      <div className="items-grid">
        {items.map((item) => (
          <ItemCard
            key={item.item_id}
            item={item}
            onAddToCart={() => addToCart(item)}
          />
        ))}
      </div>
      {cart.length > 0 && (
        <Cart
          items={cart}
          onRemoveFromCart={removeFromCart}
          onCheckout={checkout}
        />
      )}
    </div>
  );
};

export default ShopPage;
