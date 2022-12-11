/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { Header } from "../../../components/header/Header";
import "./Homepage.scss";
// import axios from "axios";
import { Link } from "react-router-dom";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import Countdown, { zeroPad } from 'react-countdown'
import { useEffect } from "react";
import { get } from "../../../utils/customRequest";
import { useSelector } from "react-redux";
import { Footer } from "../../../components/footer/Footer";
import moment from "moment";

const renderer = ({ days, hours, minutes, seconds }) => (
  <span>
    {days} day {zeroPad(hours)}h:{zeroPad(minutes)}':{zeroPad(seconds)}s
  </span>
);;

export const Homepage = ({socket}) => {
  const currentUser = useSelector(state => state.user)
  const [data, setData] = useState({})
  const [productCategory, setProductCategory] = useState([]);

  useEffect(()=>{
    if(socket.current){
      socket.current.on('updateUI', ()=>{
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
          <List sx={style} component="nav" aria-label="mailbox folders">
            {
              productCategory.length && productCategory.map((item, index) => (

                <div key={index}>
                  <ListItem style={{ padding: '4px 5px' }}>
                    <ListItemText style={{ cursor: 'pointer' }} primary={item.name} />
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
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/512px-Facebook_Messenger_logo_2020.svg.png?20220118041828"
              alt=""
            />
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
              <h2>Sản phẩm nổi bật</h2>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.featured && data.featured.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>    
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
          {/* Sản phẩm siêu rẻ */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <h2>Sản phẩm siêu rẻ</h2>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.cheap && data.cheap.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>    
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
          {/* Sản phẩm mới nhất */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <h2>Sản phẩm mới nhất</h2>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.latest && data.latest.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>    
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
              <h2>Sản phẩm sắp đấu giá</h2>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.incoming && data.incoming.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>    
                    <div className="product" key={item.id}>
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div className="product-action">
                        <div className="product-time">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            date={moment(item.start_time).add(item.time, 'minutes')}
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
