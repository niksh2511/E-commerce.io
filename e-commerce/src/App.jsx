import { useState, useEffect } from "react";
import HomePage from "./Component/HomePage";
import AddToCart from "./Component/CheckOut";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const baseURL = "https://fakestoreapi.com/products";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {data ? (
        <>   
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage data={data} />}/>

              <Route path="/Cart-list" element={<AddToCart data={data}/>}/>
            </Routes>
          </Router>
        </>
      ) : (
        <div
          className="m-12 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
