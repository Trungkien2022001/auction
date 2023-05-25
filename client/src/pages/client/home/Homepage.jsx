/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useState } from "react";
import { Header } from "../../../components/header/Header";
import "./Homepage.scss";
// import axios from "axios";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, List, ListItem, ListItemText, TextField } from "@mui/material";
import Countdown, { zeroPad } from 'react-countdown'
import { useEffect } from "react";
import { get } from "../../../utils/customRequest";
import { useSelector } from "react-redux";
import { Footer } from "../../../components/footer/Footer";
import moment from "moment";
import axios from "axios";

const renderer = ({ days, hours, minutes, seconds }) => (
  <span>
    {days} day {zeroPad(hours)}h:{zeroPad(minutes)}':{zeroPad(seconds)}s
  </span>
);;

export const Homepage = ({ socket }) => {
  const messageRef = useRef(null);
  const currentUser = useSelector(state => state.user)
  const [data, setData] = useState({})
  const [productCategory, setProductCategory] = useState([]);
  const [check, setCheck] = useState(false)
  const [message, setMessage] = useState("");
  const [mess, setMess] = useState([{
    content: "Nếu có thắc mắc gì thì hãy nhắn cho chúng tôi",
    isAdmin: 1,
    user_id: 1
  }]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', () => {
        getData()
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
  }
  useEffect(() => {
    getData()
  }, [])
  const handleStop = () => {
  }

  async function sendMessage() {
    if (message !== "" && currentUser.id && currentUser.id !== 1) {
      const msg = {
        idAdmin: 0,
        content: message,
        user: currentUser.name || "Guest",
        userID: currentUser.id || 0,
      };
      await axios.post(`/message/createMess`, {
        user_id: currentUser.id,
        isAdmin: 0,
        content: message,
        username: currentUser.name,
      });
      // socketRef.current.emit("clientSend", msg);
      setMessage("");
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };

  const handleChangePage = id => {
    window.location.href = (`/product/${id}`)
  }

  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  return (
    <div>
      <Header />
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
              <img
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
                    <CloseIcon />
                  </div>
                </div>
                <div className="chat-container">
                  <div className="left item">
                    <div className="message">
                      Ăn cứt không
                      <div className='time'>
                        24/05/2023 10:25
                      </div>
                    </div>
                  </div>
                  <div className="right item">
                    <div className="message">
                      eiorgeroiger
                      <div className='time'>
                        24/05/2023 10:25
                      </div>
                    </div>
                  </div>

                  <div ref={messageRef} />
                </div>
                <div className='chat-input'>
                  <input
                    style={{ width: "245px", height: "44px", borderRadius: "5px", border: "1px solid #ccc" }}
                    onKeyDown={onEnterPress}
                    value={message}
                    onChange={handleStop}
                    type="text"
                    placeholder="Nhập tin nhắn"
                  />
                  <Button style={{ width: "70px", height: "50px" }} onClick={handleStop} variant="contained">Send</Button>
                </div>
              </div>
            }
          </div>
          <div className="new-auction-btn">
            <Link to={'/new-auction'}>
              <img
                src="https://banner2.cleanpng.com/20180315/sdw/kisspng-plus-and-minus-signs-computer-icons-clip-art-plus-sign-5aaad8632b3888.9799936515211459551771.jpg"
                alt=""
              />
            </Link>
          </div>

          {/* Sản phẩm nổi bật */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <Link to={'/product/2000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm nổi bật</h2></Link>
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
                      <div className="product-action">
                        <div className="product-time">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                            renderer={renderer}
                          />
                        </div>
                        <div className="product-vote">{item.auction_count} Lượt đấu giá</div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-detail">{item.title}</div>
                      <div className="product-price">
                        Khởi điểm: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price">
                        Giá hiện tại: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
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
              <Link to={'/product/1000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm mới nhất</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.latest && data.latest.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product" key={item.id}>
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div className="product-action">
                        <div className="product-time">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                            renderer={renderer}
                          />
                        </div>
                        <div className="product-vote">{item.auction_count} Lượt đấu giá</div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-detail">{item.title}</div>
                      <div className="product-price">
                        Khởi điểm: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price">
                        Giá hiện tại: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
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
              <Link to={'/product/3000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm siêu rẻ</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.cheap && data.cheap.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product" key={item.id}>
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div className="product-action">
                        <div className="product-time">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                            renderer={renderer}
                          />
                        </div>
                        <div className="product-vote">{item.auction_count} Lượt đấu giá</div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-detail">{item.title}</div>
                      <div className="product-price">
                        Khởi điểm: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price">
                        Giá hiện tại: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
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
              <Link to={'/product/4000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm sắp đấu giá</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.incoming && data.incoming.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product" key={item.id}>
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div className="product-action">
                        <div className="product-time">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            date={moment(item.start_time)}
                            renderer={renderer}
                          />
                        </div>
                        <div className="product-vote">{item.auction_count} Lượt đấu giá</div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-detail">{item.title}</div>
                      <div className="product-price">
                        Khởi điểm: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price">
                        Giá hiện tại: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
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
