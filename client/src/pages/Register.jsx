import AuthForm from '@/components/auth/AuthForm'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { accessToken } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if(accessToken) {
      navigate("/");    
    }
  })

  return (
    <div className="flex">
      <AuthForm isLogin={false} />
    </div>
  )
}

export default Register