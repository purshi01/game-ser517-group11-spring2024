const StoreItem = ({ item }) => {
  return (
    <div className="store-item">
      <img src={item.imageUrl} alt={item.name} className="store-item-image" />
      <div className="store-item-info">
        <h4>{item.name}</h4>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    </div>
  );
};
export default StoreItem;
