import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ setSearchItem, setPriceSort, setRatingSort, itemCount }) {
  useEffect(() => {
  }, []);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center sticky top-0 z-10	">
      <div>
        <Link to="/" className="text-xl font-bold text-purple-200 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-shop-window"
            viewBox="0 0 16 16"
          >
            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
          </svg>
        </Link>
      </div>
      <div className="w-3/5">
        <input
          type="text"
          placeholder="Search"
          className="px-6 py-2 rounded-full bg-gray-500 outline-none text-white sm:w-3/5 sm:ml-10"
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center space-x-4 ">
        <select
          className="p-2 rounded border-none row-start-1 col-start-1 bg-slate-50 dark:bg-slate-800 text-white"
          onChange={(e) => {
            setPriceSort(e.target.value);
          }}
        >
          <option value="">Sort by Price</option>
          <option value="Lowest">Lowest</option>
          <option value="Highest">Highest</option>
        </select>
        <select
          className="p-2 rounded border-none row-start-1 col-start-1 bg-slate-50 dark:bg-slate-800 text-white"
          onChange={(e) => setRatingSort(e.target.value)}
        >
          <option value="">Sort by Rating</option>
          <option value="Lowest">Lowest</option>
          <option value="Highest">Highest</option>
        </select>
        <Link to="/Cart-list" className="text-yellow-400 py-3 px-5 relative">
          <span className="absolute top-0 right-0 bg-red-500 text-white px-2 py-0.3 rounded-full">
            {itemCount}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-cart2"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
