import React from "react";
import { addToCart, getCartItems } from "../utils/localStorage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddToCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(getCartItems());

  // Function to format currency
  const formatCurrency = (value) => {
    return (
      <>
        <span>${value}</span>
      </>
    );
  };

  // Increment
  const handleIncrement = (productName) => {
    const updatedCartItems = cartItems.map((item) =>
      item.ProductName === productName
        ? { ...item, Quantity: item.Quantity + 1 }
        : item
    );
    setCartItems(updatedCartItems);
    addToCart(updatedCartItems);
  };

  // Decrement
  const handleDecrement = (productName) => {
    const updatedCartItems = cartItems.map((item) =>
      item.ProductName === productName && item.Quantity > 1
        ? { ...item, Quantity: item.Quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
    addToCart(updatedCartItems);
  };

  // Remove
  const handleRemove = (productName) => {
    alert("Please confirm before removing the product from your cart!");
    const updatedCartItems = cartItems.filter(
      (item) => item.ProductName !== productName
    );
    setCartItems(updatedCartItems);
    addToCart(updatedCartItems);
  };

  return (
    <div className="container mx-auto p-2 mt-6 shadow-xl rounded">
      <table className="w-full">
        <thead>
          <tr className="bg-yellow-50">
            <th className="py-2 px-4 ">Product</th>
            <th className="py-2 px-4 ">Price</th>
            <th className="py-2 px-4 ">Quantity</th>
            <th className="py-2 px-4 ">Total Price</th>
            <th className="py-2 px-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr
              key={item.ProductName}
              className="border-b transition ease-in-out delay-150  hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover: duration-200 rounded"
            >
              <td className="py-2 px-4  font-semibold">{item.ProductName}</td>
              <td className="py-2 px-4 ">{formatCurrency(item.Price)}</td>
              <td className="py-2 px-4 justify-center">
                <div className="flex p-3">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleIncrement(item.ProductName)}
                  >
                    +
                  </button>
                  <input
                    type="text"
                    value={item.Quantity}
                    className="w-8 text-center"
                    readOnly
                  />
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDecrement(item.ProductName)}
                  >
                    -
                  </button>
                </div>
              </td>
              <td className="py-2 px-4 ">
                {formatCurrency(item.Price * item.Quantity)}
              </td>
              <td className="py-2 px-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                  className="text-red-500"
                  onClick={() => handleRemove(item.ProductName)}
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      
      </table>
    </div>
  );
}

export default AddToCart;
