import React from 'react';
import './OrderSummary.css';  // Assuming you'll create a similar OrderSummary.css

function Orders({ orders,deleteOrder }) {
  const totalPrice = orders.reduce(
    (total, item) => total + item.offerPrice * item.quantity,
    0
  );

  return (
    <div className="orders-page">
      <h2>Order Summary</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <>
      {orders.map((order) => (
        <div className="order-item" key={order.id}>
          <img src={order.image} alt={order.name} />
          <div>
            <h3>{order.name}</h3>
            <p>Price: ${order.offerPrice}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Subtotal: ${(order.offerPrice * order.quantity).toFixed(2)}</p>
            <button onClick={() => deleteOrder(order.id)}>Delete</button>
          </div>
        </div>
      ))}
      </>
      )}
      <h3>Total Amount: ${totalPrice.toFixed(2)}</h3>
      <button className="pay-now-btn">Pay Now</button>
    </div>
  );
}

export default Orders;
