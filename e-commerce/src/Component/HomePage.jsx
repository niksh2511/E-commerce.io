import React, { useState } from "react";
import { addToCart } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import "../index.css";

function HomePage({ data }) {
  const [searchItem, setSearchItem] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [ratingSort, setRatingSort] = useState("");
  const [quantity, setQuantity] = useState({});
  const [itemCount, setItemCount] = useState("")
  const navigate = useNavigate();

  let searchedItem = data.filter((product) => {
    const search = product.title
      .toLowerCase()
      .includes(searchItem.toLocaleLowerCase());
    return search;
  });

  searchedItem = searchedItem.sort((a, b) => {
    if (priceSort === "Lowest") {
      return a.price - b.price;
    } else if (priceSort === "Highest") {
      return b.price - a.price;
    } else if (ratingSort === "Lowest") {
      return a.rating.rate - b.rating.rate;
    } else if (ratingSort === "Highest") {
      return b.rating.rate - a.rating.rate;
    } else {
      return 0;
    }
  });

  const handleIncrement = (productId) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    if (quantity[productId] > 0) {
      setQuantity((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, quantity[productId.id] || 1);

    alert("Item succesfully added to Cart list!!")
    

  };

  const handleCartNavigate = () => {
    
        setItemCount(Math.max(itemCount + 1))
    

    navigate("/Cart-list");
  };

  return (
    <>
      <label>
        Search:{" "}
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </label>

      <label>Sort by price: </label>
      <select onChange={(e) => setPriceSort(e.target.value)}>
        <option value="" disabled>
          Select range
        </option>
        <option value="Lowest">Lowest</option>
        <option value="Highest">Highest</option>
      </select>

      <label>Sort by rating: </label>
      <select onChange={(e) => setRatingSort(e.target.value)}>
        <option value="" disabled>
          Select range
        </option>
        <option value="Lowest">Lowest</option>
        <option value="Highest">Highest</option>
      </select>

      <button 
      className="bg-yellow-300 py-1 px-3 rounded-lg"
      onClick={() => handleCartNavigate()}
      >
        Check CartList
      </button>

      <br />
      <br />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {searchedItem.map((product) => (
          <div
            key={product.id}
            className="grid shadow-md p-4 transition-transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-70 h-40 item-center justify-self-center"
            />
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2 overflow-y-scroll h-16">
              {product.description}
            </p>
            <p className="text-xl font-bold mb-2">${product.price}</p>
            <div className="flex item-center mb-2">
              <p className="text-yellow-500 font-bold mb-2">
                {product.rating.rate}
              </p>
              <p className="text-gray-500">({product.rating.count} reviews)</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-green-500 text-white py-1 px-3 w-10 rounded-lg mb-3 active:bg-green-300"
                onClick={() => handleIncrement(product.id)}
              >
                +
              </button>
              <input
                type="text"
                className="w-7 text-center rounded-lg outline-none"
                value={quantity[product.id] || 1}
                readOnly
              />
              <button
                className="bg-green-500 text-white py-1 px-3 w-10 rounded-lg mb-3 active:bg-green-300"
                onClick={() => handleDecrement(product.id)}
              >
                -
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-lg active:bg-blue-300"
                onClick={() => handleAddToCart(product)}
              >
                Add To cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
