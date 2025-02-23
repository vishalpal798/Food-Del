import userModel from "../models/userModel.js";

//*************** Add items to user cart *************//
const addToCart = async (req, resp) => {
  try {
    let userData = await userModel.findById({ _id: req.body.userId }); //This userId will get by using middleware//
    let cartData = await userData.cartData; //Phir humne jo id aaie hai uska cartData extract krliya jisko humne define bhi kiya hai userModel me//
    if (!cartData[req.body.itemId]) {
      //Yaha hum ek userId ke sath req.body me food ki id bhi bhej rhe hai jisko hum usi account me add krenge jisse humne login kiya hai.//
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData }); //Yaha hum cartData ko usi userId me update krenge//
    resp.json({ success: true, message: "Added to Cart." });
  } catch (error) {
    console.log(error);
    resp.json({ success: false, message: "Error" }); 
  }
};

//*************** Remove items from user cart *************//
const removeFromCart = async (req, resp) => {
  try {
    let userData = await userModel.findById({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    resp.json({ success: true, message: "Removed From Cart." });
  } catch (error) {
    console.log(error);
    resp.json({ success: false, message: "Error" });
  }
};

//*************** Fetch user cart data ****************//
const getCart = async (req, resp) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    resp.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    resp.json({ success: false, message: "Error" });
  }
};


export { addToCart, removeFromCart, getCart };
