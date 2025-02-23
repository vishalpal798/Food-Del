import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend //
const placeorder = async (req, resp) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save(); 

    // After when user will place the order we have to clear users cart //
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    //After that whatever item we get from user , we are using that item and create the line_items that is necessary for the stripe payment//
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

   //After we have created one more entry that is deleivery charge and push it into line_items//
    line_items.push({
      price_data: {
        currency: "usd",
        product_data:{name: "Delivery Charges"},
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    resp.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    resp.json({ success: false, message:"Error" });
  }
};

const verifyOrder = async (req,resp) => {
  const {orderId,success} = req.body;
  try {
    if (success=="true") {
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      resp.json({success:true,message:"Paid"});
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      resp.json({success:false,message:"Not Paid"});
    }
  } catch (error) {
    console.log(error);
    resp.json({success:false,message:"Error"});
  }
}

//User order for frontend//
const userOrders =async (req,resp) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    resp.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    resp.json({success:false,message:"Error"});
  }
}

//Listing orders for admin panel//
const listOrders = async (req,resp) => {
  try {
    const orders = await orderModel.find({});
    resp.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    resp.json({success:false,message:"Error"});
  }
}

//API for updating order status//
const updateStatus = async (req,resp) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    resp.json({success:true,message:"Status Updated."})
  } catch (error) { 
    console.log(error);
    resp.json({success:false,message:"Error"});
  }
}

export {placeorder,verifyOrder,userOrders,listOrders,updateStatus};    
