import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../assets/assets";
import { StoreContext } from "../Store/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={url+"/images/"+image} alt="" />
        {!cartItems[id] ? 
          <img
            className="add"
            src={assets.add_icon_white}
            alt=""
            onClick={() =>addToCart(id)}
          />
        : 
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={()=>removeFromCart(id)}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={()=>addToCart(id)}
              alt=""
            />
          </div>
        } 
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;








// import React, { useState } from "react";
// import "./FoodItem.css";
// import { assets } from "../assets/assets";

// const FoodItem = ({ id, name, price, description, image }) => {
//   const [itemCount, setItemCount] = useState(0);

//   return (
//     <div className="food-item">
//       <div className="food-item-img-container">
//         <img className="food-item-img" src={image} alt="" />
//         {!itemCount ? 
//           <img
//             className="add"
//             src={assets.add_icon_white}
//             alt=""
//             onClick={() => setItemCount(prev => prev + 1)}
//           />
//         : 
//           <div className="food-item-counter">
//             <img
//               src={assets.remove_icon_red}
//               onClick={()=>setItemCount(prev => prev - 1)}
//               alt=""
//             />
//             <p>{itemCount}</p>
//             <img
//               src={assets.add_icon_green}
//               onClick={()=>setItemCount(prev => prev + 1)}
//               alt=""
//             />
//           </div>
//         } 
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="" />
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">${price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;
