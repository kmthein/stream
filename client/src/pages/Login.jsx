import AuthForm from "@/components/auth/AuthForm";
import { setAccessToken, setUser } from "@/store/slices/userSlice";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if(accessToken) {
      navigate("/");    
    }
  })

  return (
    <div className="flex">
      <AuthForm isLogin={true} />
    </div>
  );
};

export default Login;
