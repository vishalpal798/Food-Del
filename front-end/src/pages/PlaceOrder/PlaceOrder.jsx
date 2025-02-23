import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Store/StoreContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, url, token } = useContext(StoreContext);
  const navigate = useNavigate(); 
  
  //here we have to create state variable where we have store our form field//
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "", 
  });  
  
  const placeorder = async (event) => {
    event.preventDefault(); // Prevents page reload on form submission
    let orderItems = []; //It will store all the food items that the user has added to their cart (including the quantity)//
    food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      // The condition cartItems[item._id] > 0 ensures that only items that have been added to the cart are processed.
      // { ...item } creates a copy of the item object to avoid directly modifying the original food_list.
      // quantity: cartItems[item._id] adds a new property quantity to the copied item.
        let itemInfo = { ...item, quantity: cartItems[item._id] }; 
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address : data,
      items : orderItems,
      amount : getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success) {
      const {session_url} =response.data; 
      //yeah hum log backend se extract kr rhe hai iski help se hum dusre page pr locate hojayenge jo ki /verfiy hoga//
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  };      

  useEffect(()=>{
    if (!token) {
      navigate("/cart");
    }
    else if(getTotalCartAmount()===0){
      navigate("/cart");
    }
  },[token]);
 
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]:[value] }));
  };

  return (
    <div>
      <form onSubmit={placeorder} className="placeorder">
        <div className="placeorder-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
          <input required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="FirstName"/>
          <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last Name" />
          </div>
          <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email Address"/>
          <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
          <div className="multi-fields">
            <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
            <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
          </div>
          <div className="multi-fields">
            <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code" />
            <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
          </div>
          <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" />
        </div>

        <div className="placeorder-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
