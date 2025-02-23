import React, { useContext, useEffect } from 'react';
import "./Verify.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import { StoreContext } from '../../Store/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  // Iski help se hum url se success or orderId extract kr rhe hone jo ki hum backend se bhej rhe stripe.checkout.sessions ke through//
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const {url} = useContext(StoreContext);
  const navigate =useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url+"/api/order/verify",{success,orderId});
    if (response.data.success) {
      navigate("/myorders");
    } 
    else{
      navigate("/");
    }
  } 
  useEffect(()=>{
  verifyPayment();
  },[])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify;
