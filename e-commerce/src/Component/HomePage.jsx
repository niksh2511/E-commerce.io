import React, { useState } from "react";
import "../index.css";

function HomePage({ data }) {
  const [searchItem, setSearchItem] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [ratingSort, setRatingSort] = useState("");

  const filteredData = data.filter((product) => {
      product.title.toLowerCase().includes(searchItem.toLocaleLowerCase());
    }).sort((a, b) => {
      if (priceSort === "Lowest") {
        return a.price - b.price;
      } else if (priceSort === "Highest") {
        return b.price - a.price;
      } else if (ratingSort === "Lowest") {
        return a.rating.rate - b.rating.rate;
      } else if (ratingSort === "Highest") {
        return b.rating.rate - a.rating.rate;
      } else {
        return filteredData;
      }
    });

    console.log(data)


  return (
    <>
      <label>
        Search by Name: <input type="text" placeholder="Search" onChange={(e) => setSearchItem(e.target.value)}/>
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

      <br />
      <br />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredData.map((product) => (
          <div
            key={product.id}
            className="shadow-md p-4 transition-transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-70 h-40 object-cover item-center"
            />
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-xl font-bold mb-2">${product.price}</p>
            <div className="flex item-center mb-2">
              <p className="text-yellow-500 font-bold mb-2">
                {product.rating.rate}
              </p>
              <p className="text-gray-500">({product.rating.count} reviews)</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-green-500 text-white p-2 w-10 rounded mb-3">
                +
              </button>
              <input
                type="text"
                className="w-10 text-center border-2 border-black rounded"
              />
              <button className="bg-green-500 text-white p-2 w-10 rounded mb-3">
                -
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md active:bg-blue-300">
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
