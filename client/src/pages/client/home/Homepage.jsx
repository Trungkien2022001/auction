/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useState } from "react";
import { Header } from "../../../components/header/Header";
import "./Homepage.scss";
// import axios from "axios";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, List, ListItem, ListItemText } from "@mui/material";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import Countdown, { zeroPad } from 'react-countdown'
import { useEffect } from "react";
import { get } from "../../../utils/customRequest";
import { useSelector } from "react-redux";
import { Footer } from "../../../components/footer/Footer";
import moment from "moment";

const renderer = ({ days, hours, minutes, seconds }) => (
  <span>
    {days}d {zeroPad(hours)}h:{zeroPad(minutes)}':{zeroPad(seconds)}s
  </span>
);;

export const Homepage = ({ socket }) => {
  const messageRef = useRef(null);
  const currentUser = useSelector(state => state.user)
  const [data, setData] = useState({})
  const [productCategory, setProductCategory] = useState([]);
  const [check, setCheck] = useState(true)
  const [message, setMessage] = useState("");
  const [mess, setMess] = useState([]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', async () => {
        await getData()
      })
      socket.current.on('receive-admin-msg', params => {
        // setMess(prev=>[...prev, {...params, updated_at: moment(new Date()).format()}])
        setMess(prev => [...prev, { ...params }])
      })
    }
  }, [socket.current])

  async function getData() {
    let result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-overview`, currentUser)
    if (result.status === 200) {
      setData(result.data.data)
    }

    result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-helper`, currentUser)
    if (result.status === 200) {

      setProductCategory(result.data.product_category)
    }
    if (currentUser.id) {
      result = await get(`${process.env.REACT_APP_API_ENDPOINT}/message?user_id=${currentUser.id}`, currentUser)
      if (result.status === 200) {
        setMess(result.data.body)
      }
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const handleStop = () => {
  }
  useEffect(() => {
    messageRef.current?.scrollIntoView()
  }, [mess.length])

  async function sendMessage() {
    if (message !== "" && currentUser.id && currentUser.id !== 1) {
      let msg
      if (!mess.length) {
        msg = {
          is_admin: 0,
          content: message,
          user: currentUser.name,
          user_id: currentUser.id,
          isUpdatedLastMsg: true
        }
        setMess([{
          chat_id: 1,
          user_id: currentUser.id,
          is_admin: 0,
          content: message,
          updated_at: new Date()
        }])
      } else {
        msg = {
          is_admin: 0,
          content: message,
          user: currentUser.name,
          user_id: currentUser.id,
          chat_id: mess[0].chat_id
        }
        setMess(prev =>
          [...prev, {
            chat_id: mess[0].chat_id,
            user_id: currentUser.id,
            is_admin: 0,
            content: message,
            updated_at: new Date()
          }])
      }
      socket.current.emit('client-send-msg', msg)
    }
    setMessage("");
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };

  const handleChangePage = id => {
    window.location.href = (`/products/${id}`)
  }

  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  return (
    <div>
      <Header socket={socket} />
      <div className="padding__main container">
        <div className='left-container'>
          <div className="head-m">Danh mục sản phẩm</div>
          <List sx={style} component="nav" aria-label="mailbox folders" className="homepage-sidebar">
            {
              productCategory.length && productCategory.map((item, index) => (

                <div key={index}>
                  <ListItem style={{ padding: '4px 5px' }} className="list-item-category">
                    <ListItemText style={{ cursor: 'pointer' }} primary={item.name} onClick={() => handleChangePage(item.id)} />
                  </ListItem>
                  <Divider />
                </div>
              ))
              || <></>
            }
          </List>
        </div>
        <div className='right-container'>
          <div className="chat">
            {check ?
              <img className="chat-icon"
                onClick={() => setCheck(!check)}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/512px-Facebook_Messenger_logo_2020.svg.png?20220118041828"
                alt=""
              />
              :
              <div className="chatbox">
                <div className="chatbox-header">
                  <div className="content">
                    Bạn cần giúp gì ?
                  </div>
                  <div className="close">
                    <CloseIcon onClick={() => setCheck(!check)} />
                  </div>
                </div>
                <div className="chat-container">
                  {
                    mess.map((item, index) =>
                      <div key={index} className={!item.is_admin ? "right item" : "left item"}>
                        <div className="content">
                          {item.content}
                          <div className='time'>
                            {moment(item.updated_at).format("DD/MM/YYYY HH:mm")}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {!mess.length ?
                    <div className="left item">
                      <div className="content">
                        Nếu bạn có bất cứ câu hỏi gì hoặc cần giúp đỡ thì hãy nhắn vào đây nhé.
                        Chúng tôi sẽ giúp đỡ bạn ngay lập tức!
                        Tổng đài hỗ trợ 24/24
                        Vui lòng đăng nhập để sử dụng tính năng này
                      </div>
                    </div>
                    :
                    <></>
                  }
                  <div ref={messageRef} />
                </div>
                <div className='chat-input'>
                  <input
                    style={{ width: "224px", height: "44px", borderRadius: "5px", border: "1px solid #ccc" }}
                    onKeyDown={onEnterPress}
                    value={message}
                    disabled={currentUser.id ? false : true}
                    onChange={e => setMessage(e.target.value)}
                    type="text"
                    placeholder="Nhập tin nhắn"
                  />
                  <Button
                    style={{ width: "70px", height: "44px" }}
                    onClick={sendMessage} variant="contained"
                    disabled={currentUser.id ? false : true}
                  >
                    Send
                  </Button>
                </div>
              </div>
            }
          </div>
          <div className="new-auction-btn">
            <Link to={'/new-auction'}>
              <img
                src="https://media.istockphoto.com/id/1437225090/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-pop-m%E1%BB%9Bi-s%E1%BA%A3n-ph%E1%BA%A9m-m%E1%BB%9Bi-khuy%E1%BA%BFn-m%C3%A3i-%C4%91%E1%BA%B7t-vect%C6%A1.jpg?s=2048x2048&w=is&k=20&c=Y16uTx7wkfTGLZzKYsRbogVMpzcU9k-LiTqA9euXYRQ="
                alt=""
              />
            </Link>
          </div>

          {/* Sản phẩm nổi bật */}
          {/* <div className="without-backend" style={{ fontSize: "22px", padding: "10px 30px", color: "red" , border: "1px solid red", borderRadius: "10px"}}>Hiện tại hệ thống server đang được bảo trì nên một vài tính năng không thể sủ dụng được. Xin lỗi bạn vì sự bất tiện này, trên đây là giao diện demo của chúng tôi, vui lòng xem  <Link to={'/tutorial'}>
           Hướng dẫn sử dụng!
          </Link></div> */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <Link to={'/products/2000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm nổi bật</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.featured && data.featured.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product">
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
                        <div className="product-time product-item">
                          <div className="product-icon">
                            <AccessTimeIcon />
                          </div>
                          <div className="product-content" style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                            <Countdown
                              onComplete={() => handleStop()}
                              // onStop={()=>handleStop()}
                              date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                              renderer={renderer}
                            />
                          </div>
                        </div>
                        <div className="product-vote product-item">
                          <div className="product-icon">
                            <EmojiPeopleIcon />
                          </div>
                          <div className="product-content" style={{ fontSize: "1.2rem" }}>
                            {item.auction_count}
                          </div>
                        </div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                        <AttachMoneyIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                        <SellIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                      </div>
                    </div>
                  </Link>
                ))
                || <></>
              }
            </div>

          </div>
          {/* Sản phẩm mới nhất */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <Link to={'/products/1000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm mới nhất</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.latest && data.latest.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product">
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
                        <div className="product-time product-item">
                          <div className="product-icon">
                            <AccessTimeIcon />
                          </div>
                          <div className="product-content" style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                            <Countdown
                              onComplete={() => handleStop()}
                              // onStop={()=>handleStop()}
                              date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                              renderer={renderer}
                            />
                          </div>
                        </div>
                        <div className="product-vote product-item">
                          <div className="product-icon">
                            <EmojiPeopleIcon />
                          </div>
                          <div className="product-content" style={{ fontSize: "1.2rem" }}>
                            {item.auction_count}
                          </div>
                        </div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                        <AttachMoneyIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                        <SellIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                      </div>
                    </div>
                  </Link>
                ))
                || <></>
              }
            </div>

          </div>
          {/* Sản phẩm siêu rẻ */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <Link to={'/products/3000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm siêu rẻ</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.cheap && data.cheap.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product">
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
                        <div className="product-time product-item">
                          <div className="product-icon">
                            <AccessTimeIcon />
                          </div>
                          <div className="product-content" style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                            <Countdown
                              onComplete={() => handleStop()}
                              // onStop={()=>handleStop()}
                              date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                              renderer={renderer}
                            />
                          </div>
                        </div>
                        <div className="product-vote product-item">
                          <div className="product-icon">
                            <EmojiPeopleIcon />
                          </div>
                          <div className="product-content" style={{ fontSize: "1.2rem" }}>
                            {item.auction_count}
                          </div>
                        </div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                        <AttachMoneyIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                        <SellIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                      </div>
                    </div>
                  </Link>
                ))
                || <></>
              }
            </div>

          </div>
          {/* Sản phẩm sắp đấu giá */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <Link to={'/products/4000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm sắp đấu giá</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.incoming && data.incoming.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product">
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
                        <div className="product-time product-item">
                          <div className="product-icon">
                            <AccessTimeIcon />
                          </div>
                          <div className="product-content" style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                            <Countdown
                              onComplete={() => handleStop()}
                              // onStop={()=>handleStop()}
                              date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                              renderer={renderer}
                            />
                          </div>
                        </div>
                        <div className="product-vote product-item">
                          <div className="product-icon">
                            <EmojiPeopleIcon />
                          </div>
                          <div className="product-content" style={{ fontSize: "1.2rem" }}>
                            {item.auction_count}
                          </div>
                        </div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                        <AttachMoneyIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                        <SellIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                      </div>
                    </div>
                  </Link>
                ))
                || <></>
              }
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
