import React from "react";
import "./Navbar.css";
import { assets } from "../assets/assets.js";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="icon">
        <h1 className="logo">
          cafeU<span className="sb">B</span>U<span className="sb">D</span>
        </h1>
        <h3>(Admin Panel)</h3>
      </div>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
