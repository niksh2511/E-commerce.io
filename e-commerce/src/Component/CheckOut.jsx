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
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleRemove(item.ProductName)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr className="border-b transition ease-in-out delay-150  hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover: duration-200 rounded">
            <td className="py-2 px-4 font-bold">Total</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddToCart;
