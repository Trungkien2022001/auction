import React from "react";
import { useState } from "react";
import axios from "axios";
import "./register.scss";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../../redux/userSlice";

export const Register = () => {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(false)
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [repassword, setRepassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const handleRegister = () => {
    axios.post("auth/register", {
      password,
      repassword,
      phone,
      name,
      username,
      email
    }).then((res) => {
      if (!res.data.err) {
        axios
          .post("auth/login", {
            username,
            password,
          })
          .then((res) => {
            if (!res.data.err) {
              dispatch(userSlice.actions.login(res.data.data[0]))
            }
          });
        alert(res.data.message)
        setCheck(true)
      } else {
        alert(res.data.message)
      }
    });

  };

  return (
    <div className="container">
      {check && <Navigate to="/" replace={true} />}
      <div className="register-form">
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Full Name"
        />
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
        <input
          type="text"
          onChange={(e) => {
            setRepassword(e.target.value);
          }}
          placeholder="Repassword"
        />
        <input
          type="text"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Phone"
        />
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

