import React, { Profiler, useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../assets/assets";
import {Link, useNavigate} from "react-router-dom"
import { StoreContext } from "../Store/StoreContext";
const Navbar = ({setShowLogin}) => {

  const navigate =useNavigate();
  const [menu,setMenu]=useState("home");
  const{getTotalCartAmount,token,setToken}=useContext(StoreContext);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className="navbar">
     <Link to='/'><h1 className="logo">cafeU<span className="sb">B</span>U<span className="sb">D</span></h1></Link>
      
      <ul className="navbar-menu">
        <Link  to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href="#exploremenu" onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" className="searchlogo"/>
        <div className="navbar-search-icon">
         <Link to="/cart"><img src={assets.basket_icon} alt="" className="basketlogo" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
        :<div className="navbar-profile">
          <img src={assets.profile_icon} alt=""/>
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
            <hr/>
            <li onClick={logOut}><img src={assets.logout_icon} alt=""/><p>Logout</p></li>
          </ul>
        </div>}
      </div>
    </div> 
  );
}; 

export default Navbar;
