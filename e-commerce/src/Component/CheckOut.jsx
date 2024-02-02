import React, { useEffect } from "react";
import { addToCart, getCartItems } from "../utils/localStorage";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CheckOutMode from "./Payment";

function AddToCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(getCartItems()); // Master copy
  const [filterCartItems, setFilterCartItemls] = useState(getCartItems()); // filter copy
  const [total, setTotal] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [ratingSort, setRatingSort] = useState("");
  const [totalItem, setTotalItem] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);


  //  cartItems.filter((product) => {

  //   console.log(product.ProductName.toLowerCase()
  //   .includes(searchItem.toLowerCase()))

  //   const search = product.ProductName
  //     .toLowerCase()
  //     .includes(searchItem.toLowerCase());
  //   return search;
  // });

  useEffect(() => {
    setFilterCartItemls(
      cartItems.filter((product) => {
        const search = product.ProductName.toLowerCase().includes(
          searchItem.toLowerCase()
        );
        return search;
      })
    );
  }, [searchItem]);

  useEffect(() => {
    setFilterCartItemls(cartItems);
  }, [cartItems]);



  // Function to format currency
  const formatCurrency = (value) => {
    return (
      <>
        <span>${Math.round(value)}</span>
      </>
    );
  };

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total = total + item.Price * item.Quantity;
    });
    setTotal(total);
  }, [cartItems]);

  // Increment
  const handleIncrement = (productName) => {
    const updatedCartItems = cartItems.map((item) =>
      item.ProductName == productName
        ? { ...item, Quantity: item.Quantity + 1 }
        : item
    );

    setCartItems(updatedCartItems);
    localStorage.setItem("ItemData", JSON.stringify(updatedCartItems));
  };

  // Decrement
  const handleDecrement = (productName) => {
    const updatedCartItems = cartItems.map((item) =>
      item.ProductName === productName && item.Quantity > 1
        ? { ...item, Quantity: item.Quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("ItemData", JSON.stringify(updatedCartItems));
  };

  const handleNavigate = () => {
    navigate("/");
  };

  // Remove
  const handleRemove = (productName) => {
    alert("Please confirm before removing the product from your cart!");
    const updatedCartItems = cartItems.filter(
      (item) => item.ProductName !== productName
    );
    setCartItems(updatedCartItems);
    addToCart(updatedCartItems);

    localStorage.setItem("ItemData", JSON.stringify(updatedCartItems));
  };

  const handleCheckOut = () => {
    setShowAlertModal(true)
  }

  return (
    <>
      <Navbar
        setSearchItem={setSearchItem}
        setPriceSort={setPriceSort}
        setRatingSort={setRatingSort}
      />
      <div className="container mx-auto p-2 mt-6 shadow-xl rounded">
        <table className="w-full">
          <thead>
            <tr className="bg-yellow-50">
              <th className="py-2 px-4 ">Product</th>
              <th className="py-2 px-4 ">Price</th>
              <th className="py-2 px-4 ">Quantity</th>
              <th className="py-2 px-4 ">Price. Per Quantity</th>
              <th className="py-2 px-4 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterCartItems.map((item, index) => (
              <tr
                key={index}
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
                      className="w-8 text-center outline-none	"
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
                <td className="py-2 px-4 text-center	">
                  {formatCurrency(item.Price * item.Quantity)}
                </td>
                <td className="py-2 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3 text-red-500 text-center"
                    viewBox="0 0 16 16"
                    onClick={() => handleRemove(item.ProductName)}
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end p-2">
          <p className="text-lg font-bold mr-2 self-center pr-8">{formatCurrency(total)}</p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => handleCheckOut()}>
            Check Out
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          className="text-white hover:bg-blue-900 delay-150 bg-blue-500 p-2 rounded active:bg-blue-300"
          onClick={() => handleNavigate()}
        >
          Continue Shopping?...
        </button>
      </div>
      {showAlertModal && (
        <CheckOutMode
          handleClose={() => setShowAlertModal(false)}
          subtotal={total}
        />
      )}
    </>
  );
}

export default AddToCart;
