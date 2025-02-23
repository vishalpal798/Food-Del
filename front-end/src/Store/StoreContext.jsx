import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext("null");

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const [food_list, setFoodList] = useState([]);

  const url = "https://food-del-backend-ny75.onrender.com";

  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) { 
      // When we will loggedin we get token that token we will send by headers with itemId.//Yahi same work hum postmen ke through kr rhe teh.// 
      await axios.post(url+"/api/cart/add", { itemId }, { headers: { token } });
    } 
   };  
  
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      // If we have loggedin then we have token also. //
      await axios.post(url+"/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const fetchFoodList = async (req, resp) => {
    const response = await axios.get(url + "/api/food/list");
    console.log(response);

    setFoodList(response.data.data); 
  }; 
  
  const getTotalCartAmount = () =>
    Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      if (quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          return total + itemInfo.price * quantity;
        }
      }
      return total;
    }, 0);

  const loadCartData = async (token) => { //So we have to call this function when our page is loaded.For that see useEffect.//
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData);
  }
   
  //Jab bhi hum refresh krte hai toh page automatically logout ho jata hai isliye yeah use kiya hai//
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;

// 1.State Initialization:
// cartItems is an object where each key is an itemId and the value is the quantity of that item in the cart.
// Example: { "item1": 2, "item2": 5 } means you have 2 units of item1 and 5 units of item2.

// 2.addToCart Function:
// If itemId doesn't exist in cartItems, it initializes the count to 1.
// If itemId already exists, it increments the quantity by 1.

// 3.removeFromCart Function:
// Decrements the quantity of the given itemId by 1.
