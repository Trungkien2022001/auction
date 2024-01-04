import React from "react";
import { useState } from "react";
import axios from "axios";
import "./login.scss";
import { Header } from "../../../components/header/Header";
import { Footer } from "../../../components/footer/Footer";
import { useDispatch } from "react-redux";
import { userSlice } from "../../../redux/userSlice";
import { Link } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import config from "../../../config";


export const Login = ({socket}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch()

  const onEnterWork = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleLogin()
    }
  }
  
  const handleLogin = () => {
    axios
      .post(`${config.apiHost}/login`, {
        email: username,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Login Successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            dispatch(userSlice.actions.login(res.data.data.user))
            window.location.href = './';
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: res.data.message,
            showConfirmButton: true,
          })
        }
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Header socket = {socket}></Header>
      <div className="input-container padding__main">
        <div className="login-form">
          <div style={{marginLeft: '8px'}} className="login-input">
              <TextField onChange={e=>setUsername(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
          </div>
          <div className="login-input">
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  onKeyDown={onEnterWork}
                />
              </FormControl>
          </div>
          <div style={{marginLeft: '70px'}} className="login-input">
              <Button onClick={()=>handleLogin()} variant="contained">Đăng nhập</Button>
          </div>
        </div>
        <div>
          <Link to={'/register'} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="toRegister">
              Bạn chưa có tài khoản? <span style={{ color: '#0000FF' }}>Đăng ký ngay</span>
            </div>
          </Link>
        </div>
        <div>
        <div style={{marginTop: "30px"}}>
              Tài khoản demo: 1@gmail.com 123456
            </div>
        </div>

      </div>
      <Footer/>
    </div>

  );
};

