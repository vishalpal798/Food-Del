import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../assets/assets";
import { StoreContext } from "../Store/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  
  const {url,token,setToken} = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
    });

  const onChangeHandler =async (event) => {
    // const{name,value}=event.target;
    // setData((prevData) => ({ ...prevData, [name]: value }));
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  } 

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState==="Login") {
      newUrl+="/api/user/login"
    }
    else{
      newUrl+="/api/user/register"
    } 
    const response = await axios.post(newUrl,data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
    }
    else{
      alert(response.data.message);
    }
  } 

  return (
    <div className="loginpopup">
      <form className="login-popup-container" onSubmit={onLogin}>

        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState==="Login"?<></>: <input type="text" name="name" onChange={onChangeHandler} value={data.name} id="" placeholder="Your Name" required/>}
          <input type="email" name="email" onChange={onChangeHandler} value={data.email} id="" placeholder="Your Email" required/>
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} id="" placeholder="Password" required/>
        </div>

        <button type="submit">{currState === "Sign up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing , I agree to the terms of use & privacy policy.</p>
        </div>

        {currState==="Login"?<p>Create a new account?<span onClick={()=>setCurrState("Sign up")}>Click here</span></p>:<p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login here</span></p>}

      </form> 
    </div>
  );
};

export default LoginPopup;


// By setting value={data.name}, we are binding the input field to the state. 
// This makes it a controlled component, meaning:

// The input field always displays the latest value stored in the data state.
// Whenever the state updates (via onChangeHandler), the input reflects the change.
