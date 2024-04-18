import React, { useState, useEffect } from "react";
import "../styles/ShopStyles.css";
import ItemCard from "../components/common/ItemCard";
import Cart from "../components/common/Cart";

const ShopPage = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const selectedCourseId =
    localStorage.getItem("courseId") || "defaultCourseId";
  const userPoints = 100;
  const username = localStorage.getItem("userId");

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
  useEffect(() => {
    const newTotalCost = cart.reduce(
      (sum, item) => sum + item.points * item.quantity,
      0
    );
    setTotalCost(newTotalCost);
  }, [cart]);

  const addToCart = (itemToAdd) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.item_id === itemToAdd.item_id
    );

    if (existingItemIndex > -1) {
      // Find the item in the cart and calculate the new quantity
      const updatedQuantity =
        cart[existingItemIndex].quantity + itemToAdd.quantity;

      // Check if the new quantity is within the available stock
      if (updatedQuantity > itemToAdd.available) {
        alert(
          `Sorry, you cannot add more than the available stock of ${itemToAdd.available}.`
        );
        return; // Stop and do not update the cart
      }

      // If within stock limits, update the cart
      setCart(
        cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: updatedQuantity }
            : item
        )
      );
    } else {
      // If the item is not in the cart, check if the initial add is more than the available stock
      if (itemToAdd.quantity > itemToAdd.available) {
        alert(
          `Sorry, you cannot add more than the available stock of ${itemToAdd.available}.`
        );
        return; // Stop and do not add to the cart
      }

      // If within stock limits, add the new item to the cart
      setCart([...cart, itemToAdd]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.item_id !== itemId));
  };

  const checkout = async () => {
    if (totalCost > userPoints) {
      alert("Not enough points to complete this purchase.");
      return;
    }
    try {
      // Assume checkoutItems is a function to process checkout
      await checkoutItems(cart);
      alert("Checkout successful!");
      setCart([]); // Clear the cart after successful checkout
    } catch (error) {
      alert("Checkout failed: " + error.message);
    }
  };
  const checkoutItems = async (cartItems) => {
    try {
      const response = await fetch(`${API_BASE_URL}/buy_items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems, username }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed: " + response.statusText);
      }

      const result = await response.json();
      alert("Checkout successful! Transaction ID: " + result.transaction_d);
      fetchItems();
      // The cart is cleared in the checkout function, so this may be redundant.
    } catch (error) {
      console.error("Checkout failed:", error);
      setError("Checkout failed: " + error.message); // Set error state to inform the user
    }
  };

  return (
    <div className="shop-body">
      {error && <p className="error">{error}</p>}
      <h1 className="shop-title">Shop Items</h1>
      <div className="items-grid">
        {items.map((item) => (
          <ItemCard key={item.item_id} item={item} onAddToCart={addToCart} />
        ))}
      </div>
      <Cart
        items={cart}
        onRemoveFromCart={removeFromCart}
        onCheckout={checkout}
      />
    </div>
  );
};

export default ShopPage;
