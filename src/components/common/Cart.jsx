const Cart = ({ items, onRemoveFromCart, onCheckout }) => {
  const totalPoints = items.reduce(
    (sum, item) => sum + item.points * item.quantity,
    0
  );

  return (
    <div className="shopping-cart">
      <h2 className="cart-title">Your Cart</h2>
      {items.map((item, index) => (
        <div className="cart-item" key={index}>
          <span className="cart-item-details">
            {item.item_name} - {item.quantity} x {item.points} Points ={" "}
            {item.quantity * item.points} Points
          </span>
          <button
            className="action-button"
            onClick={() => onRemoveFromCart(item.item_id)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="cart-total">Total Points: {totalPoints}</div>
      <button className="action-button" onClick={() => onCheckout(totalPoints)}>
        Checkout
      </button>
    </div>
  );
};
export default Cart;
