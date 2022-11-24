import React from "react";
import { useState } from "react";
import axios from "axios";
import "./login.scss";
import { Header } from "../../../components/header/Header";
import { Footer } from "../../../components/footer/Footer";
import { useDispatch } from "react-redux";
import { userSlice } from "../../../redux/userSlice";
import { Link, Navigate } from "react-router-dom";


export const Login = () => {
  const [check, setCheck] = useState(false)
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch()
  const handleLogin = () => {
    axios
      .post("auth/login", {
        username,
        password,
      })
      .then((res) => {
        if(!res.data.err){
          alert(res.data.message);
          dispatch(userSlice.actions.login(res.data.data[0]))  
          setCheck(true) 
        } else{
          alert(res.data.message);
        }
      });


  };
 
  return (
    <div>
      <Header></Header>
      {check &&<Navigate  to="/" replace={true}/>}
      <div className="container">
          <div className="login-form">
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            placeholder="Username"
          />
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
          </div>
        <Link to ={'/register'} style={{textDecoration:'none', color:'black'}}>
          <div className="toRegister">
            Bạn chưa có tài khoản? Đăng ký ngay
          </div>
        </Link>
        
      </div>
      <Footer></Footer>
    </div>
  
  );
};

