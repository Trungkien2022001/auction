import React from "react";
import axios from "axios";
import "./register.scss";
import { useRef, useState } from 'react'
import { Header } from '../../../components/header/Header'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../../redux/userSlice";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, FormControlLabel, InputAdornment, MenuItem, Select, Switch, TextField } from '@mui/material'
import { registerValidate } from "../../../utils/validateFormInput";
import Swal from "sweetalert2";


export const Register = () => {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(false)
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");

  const inputRef = useRef()
  const [imageList, setImageList] = useState([])

  const handleSubmit = async () => {

  }

  const handleAddImage = async () => {
    const files = inputRef.current.files
    try {
      await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/trungkien2022001/image/upload",
            data
          );
          const { url } = uploadRes.data;
          setImageList(prev => [...prev, url])
        })
      );
    } catch (err) {
    }
  }

  const handleRemoveImage = (item) => {
    setImageList(imageList.filter(i => i !== item))
  }

  const handleRegister = () => {
    const user_register = {
      name,
      username,
      email,
      phone,
      password,
      rePassword,
      birthday,
      address,
      avatar: imageList[0] || 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
    }
    const validate = registerValidate(user_register)
    if (validate.err) {
      Swal.fire(
        'Có lỗi khi đăng ký?',
        validate.message,
        'error'
      )
      return
    }
    delete user_register.rePassword
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/signup`, user_register)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Register Successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(res => {
              axios
                .post(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
                  email,
                  password,
                })
                .then((resLogin) => {
                  if (resLogin.data.success) {
                    dispatch(userSlice.actions.login(resLogin.data.data.user))
                    window.location.href = './';
                  }
                  else {
                    Swal.fire({
                      icon: 'error',
                      title: "Có lỗi xảy ra",
                      showConfirmButton: true,
                    })
                  }
                });
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

  return (
    <div>
      <Header />
      <div className="register-container">
        <div className="register-container-back">
          <Link to={'../'} style={{ color: "black" }}>Quay lại trang chủ</Link>
        </div>
        <div className="register-container-header">
          Thêm một tài khoản mới
        </div>
        <div className='register-product-part'>
          <div className='register-product-item'>
            <TextField
              className='text-input text-input-90'
              id="standard-basic"
              label="Họ và tên"
              variant="outlined"
              helperText=""
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='register-product-item'>
            <TextField
              className='text-input text-input-90'
              id="standard-basic"
              label="Username"
              variant="outlined"
              helperText='Tên hiển thị'
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className='register-product-part'>
          <div className='register-product-item'>
            <TextField
              className='text-input text-input-90'
              id="standard-basic"
              label="Email"
              variant="outlined"
              helperText=""
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='register-product-item'>
            <TextField
              className='text-input text-input-90'
              id="standard-basic"
              label="Số điện thoại"
              variant="outlined"
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className='register-product-part'>
          <div className='register-product-item'>
            <TextField
              className='text-input text-input-90'
              id="standard-basic"
              label="Mật khẩu"
              variant="outlined"
              helperText=""
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='register-product-item'>
            <TextField
              className='text-input text-input-90'
              id="standard-basic"
              label="Nhập lại mật khẩu"
              variant="outlined"
              onChange={e => setrePassword(e.target.value)}
            />
          </div>
        </div>
        <div className='new-product-part' style={{ marginBottom: "20px" }}>
          <div className='new-product-item'>
            <TextField
              className='text-input text-input-40'
              id="datetime-local"
              label="Ngày sinh"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setBirthday(e.target.value)}
            />
          </div>
        </div>
        <div className='new-product-part'>
          <div className='new-product-item'>
            <TextField
              className='text-input text-input-95'
              id="standard-basic"
              multiline
              maxRows={3}
              label="Địa chỉ"
              variant="outlined"
              placeholder='Địa chỉ hiện nay của bạn'
              onChange={e => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="register-product-image">
          <div className="register-product-image-header">
            Thêm ảnh đại diện
          </div>
          <div className="register-product-image-review">
            {imageList.length ?
              <>

                <div className="imageItem" >
                  <img src={imageList[0]} alt="" />
                  <div onClick={() => handleRemoveImage(imageList[0])} className="remove_small_image">
                    <ClearIcon />
                  </div>
                </div>

              </> :
              <div className="addImage">
                <AddAPhotoIcon />
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={() => handleAddImage()}
                  ref={inputRef}
                />
              </div>}
          </div>
        </div>

        <div className="submit">
          <Button onClick={() => handleRegister()} variant="contained">Submit</Button>
        </div>
      </div>
    </div>
  )
};