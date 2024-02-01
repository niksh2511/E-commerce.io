
export const getCartItems = () => {
    const localStorageList = localStorage.getItem("ItemData");
    return localStorageList ? JSON.parse(localStorageList) : [];
  };
  
  export const addToCart = (product, quantity) => {
    const cartItems = getCartItems();
  
    const existingProductIndex = cartItems.findIndex((item) => item.ProductName === product.title);
  
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].Quantity += quantity;
    } else {
      const cartItem = {
        ProductName: product.title,
        Price: product.price,
        Quantity: quantity,
      };
  
      cartItems.push(cartItem);
    }
  

    localStorage.setItem("ItemData", JSON.stringify(cartItems));
    return cartItems;
  };