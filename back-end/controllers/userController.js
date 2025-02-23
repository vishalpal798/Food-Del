import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

//************* login user *************//
const loginUser = async (req,resp) => {
  const {email,password}=req.body;
  try {
    const user =await userModel.findOne({email});
    if (!user) {
      return resp.json({success:false,message:"User Doesn't exists."})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return resp.json({success:false,message:"Invalid Password"})
    }
    const token =await createToken(user._id);
    resp.json({success:true,token})
  } catch (error) {
    console.log(error);
    resp.json({success:false,message:"Error occured."})
  }
}

const createToken = async (id) => {
  console.log(process.env.JWT_SECRET);
  const tok = jwt.sign({id},process.env.JWT_SECRET)
  console.log(tok);
  return tok;
}

//************* register user *************//
const registerUser = async (req,resp) => {
  const{name,password,email}=req.body;

  // Checking is user already exist //
  try {
    const exist = await userModel.findOne({email});
    if (exist) {
      return resp.json({success:false,message:"User already exists"})
    }
  // Validating email format and strong password //
    if (!validator.isEmail(email.trim())) {
      return resp.json({success:false,message:"Please enter a valid email."})
    }
    if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })) {
      return resp.status(400).json({ success: false, message: "Password must be at least 8 characters long and include a number, an uppercase letter, and a special character."});
    }
    // hashing user password //
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password,salt);

    // After completing and verifying above steps then we create account for our newUser and save into user variable.//
    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword,
    });
    
    const user = await newUser.save();
    const token = await createToken(user._id);
    resp.json({success:true,token});

  } catch (error) {
    console.log(error);
    resp.json({success:false,message:"Error Occured."})
    
  }
}

export  {loginUser,registerUser};