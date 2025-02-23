import jwt  from "jsonwebtoken";

const authMiddleware = async (req,resp,next) => {

  //Extracts the token from the request headers.//

  const{token} = req.headers;
  if (!token) { 
    return resp.json({success:false,message:"Not Authorized login again."});
  } 
  try { 

     // isme hum verify krrhe hai ki humara token me jo jwt secret hai joi humne register or login krte waqt use sign kiya tha vo match ho rha hai ki nhi //
     // Uses jwt.verify() to decode and verify the JWT token.
     // The process.env.JWT_SECRET is the secret key used to sign the token.
        // If the token is valid, jwt.verify() returns the decoded payload.
        // If invalid, it throws an error. 

    const token_decode = jwt.verify(token,process.env.JWT_SECRET);

    // Adds the id from the decoded token into req.body.userId.
    // This allows the next middleware or route handler to access the user's ID.
    // Which is in cartRoutes ,where we add authmiddleware in cartRoutes,jaha se yeah request humari controller ko pass hogi.
    
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    resp.json({success:false,message:"Error"});
  }
}
export default authMiddleware; 