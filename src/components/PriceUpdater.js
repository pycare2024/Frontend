import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PriceUpdater.css"; // import the CSS

const PriceUpdater = () => {
  const [prices, setPrices] = useState([]);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch all active prices
  const fetchPrices = async () => {
    try {
      const res = await axios.get("https://backend-xhl4.onrender.com/AdminRoute/prices"); 
      setPrices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  // Add or Update price
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://backend-xhl4.onrender.com/AdminRoute/update-price/${editingId}`, {
          label,
          amount,
          active: true,
        });
        setEditingId(null);
      } else {
        await axios.post("https://backend-xhl4.onrender.com/AdminRoute/add-price", { label, amount });
      }
      setLabel("");
      setAmount("");
      fetchPrices();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Price
  const handleEdit = (price) => {
    setLabel(price.label);
    setAmount(price.amount);
    setEditingId(price._id);
  };

  // Deactivate Price
  const handleDeactivate = async (id) => {
    try {
      await axios.put(`https://backend-xhl4.onrender.com/AdminRoute/update-price/${id}`, { active: false });
      fetchPrices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="price-updater-wrapper">
      <div className="price-updater-container">
        <h2 className="price-updater-title">Admin Price Management</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="price-form">
          <input
            type="text"
            placeholder="Event / Price Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit">{editingId ? "Update" : "Add"}</button>
        </form>

        {/* Price List */}
        <div className="price-list">
          <h3>Active Prices</h3>
          {prices.length === 0 ? (
            <p className="empty-message">No active prices</p>
          ) : (
            prices.map((price) => (
              <div key={price._id} className="price-item">
                <span>
                  <strong>{price.label}</strong> — ₹{price.amount}
                </span>
                <div className="price-actions">
                  <button className="edit-btn" onClick={() => handleEdit(price)}>
                    Edit
                  </button>
                  <button
                    className="deactivate-btn"
                    onClick={() => handleDeactivate(price._id)}
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceUpdater;