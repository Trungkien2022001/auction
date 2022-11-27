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


export const Register = () => {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(false)
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [repassword, setRepassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const inputRef = useRef()
  const [imageList, setImageList] = useState([])
  const [type, setType] = useState(1)
  const [branch, setBranch] = useState(1)
  const [status, setStatus] = useState(1)
  const [startTime, setStartTime] = useState(1)
  const [totalTime, setTotalTime] = useState(1)
  const [detail, setDetail] = useState(1)
  const [description, setDescription] = useState(1)
  const [isReturn, setisReturn] = useState(1)

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
            "https://api.cloudinary.com/v1_1/nguyenkien2022001/image/upload",
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
            />
          </div>
          <div className='register-product-item'>
            <TextField
              className='text-input text-input-90'
              id="standard-basic"
              label="Username"
              variant="outlined"
              helperText='Tên hiển thị'
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
            />
          </div>
          <div className='register-product-item'>
            <TextField
              className='text-input text-input-90'
              id="standard-basic"
              label="Số điện thoại"
              variant="outlined"
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
                {
                  imageList.map((item, index) => (
                    <div className="imageItem" key={index}>
                      <img src={item} alt="" />
                      <div onClick={() => handleRemoveImage(item)} className="remove_small_image">
                        <ClearIcon />
                      </div>
                    </div>
                  ))
                }
              </> : <></>}
            <div className="addImage">
              <AddAPhotoIcon />
              <input
                type="file"
                id="file"
                multiple
                onChange={() => handleAddImage()}
                ref={inputRef}
              />
            </div>
          </div>
        </div>

        <div className="submit">
          <Button variant="contained">Submit</Button>
        </div>
      </div>
    </div>
  )
};