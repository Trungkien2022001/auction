import React from "react";
import { useState } from "react";
import axios from "axios";
import "./login.scss";
import { Header } from "../../../components/header/Header";
import { Footer } from "../../../components/footer/Footer";
import { useDispatch } from "react-redux";
import { userSlice } from "../../../redux/userSlice";
import { Link, Navigate } from "react-router-dom";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from "@mui/material";


export const Login = () => {
  const [check, setCheck] = useState(false)
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch()

  const handleLogin = () => {
    axios
      .post("auth/login", {
        username,
        password,
      })
      .then((res) => {
        if (!res.data.err) {
          alert(res.data.message);
          dispatch(userSlice.actions.login(res.data.data[0]))
          setCheck(true)
        } else {
          alert(res.data.message);
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
      <Header></Header>
      {check && <Navigate to="/" replace={true} />}
      <div className="input-container">
        <div className="login-form">
          <div style={{marginLeft: '8px'}} className="login-input">
              <TextField id="outlined-basic" label="Email" variant="outlined" />
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
                />
              </FormControl>
          </div>
          <div style={{marginLeft: '70px'}} className="login-input">
              <Button variant="contained">Đăng nhập</Button>
          </div>
        </div>
        <div>
          <Link to={'/register'} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="toRegister">
              Bạn chưa có tài khoản? <span style={{ color: '#0000FF' }}>Đăng ký ngay</span>
            </div>
          </Link>
        </div>

      </div>
    </div>

  );
};

