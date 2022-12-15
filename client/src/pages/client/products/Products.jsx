/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { Header } from "../../../components/header/Header";
import "./Products.scss";
// import axios from "axios";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from "@mui/material";
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

export const Products = ({ socket }) => {
  const limit = 16
  const currentUser = useSelector(state => state.user)
  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState({})
  const [type, setType] = useState(1)
  const [category, setCategory] = useState(0)
  const [search, setSearch] = useState('')
  const [productCategory, setProductCategory] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', () => {
        getData()
      })
    }
  }, [socket.current])

  async function getData() {
    let result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auctions`, currentUser)
    if (result.status === 200) {
      setData(result.data.data)
      setInitialData(result.data.data)
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

  const handleSearchAll = (category, search, type) => {
    let firstData, secondData, finalData
    if(category){
      firstData = initialData.filter(i=>i.category_id === category)
    } else {
      firstData = initialData
    }
    console.log(search)
    if(search === ''){
      secondData = firstData
    } else {
      secondData = firstData.filter(i=>i.name.toLowerCase().includes(search.toLowerCase()))
      // firstData.map(i=>console.log(i.name.includes(search)))
    }
    switch (type) {
      case 1: 
        finalData = secondData.sort((a, b)=> a.start_time < b.start_time ? 1 : -1).filter(i=>i.status === 2)
        break
      case 2: 
        finalData = secondData.sort((a, b)=> a.auction_count < b.auction_count ? 1 : -1).filter(i=>i.status === 2)
        break
      case 3: 
        finalData = secondData.sort((a, b)=> a.start_price > b.start_price ? 1 : -1).filter(i=>i.status === 2)
        break
      case 4: 
      finalData = secondData.sort((a, b)=> a.start_time < b.start_time ? 1 : -1).filter(i=>i.status === 1)
        break
      default: 
        break
    }
    setData(finalData)
    
  }

  const handleSearch = (value, t)=>{
    if(t === 'type') {
      setType(value)
      handleSearchAll(category, search, value)

    }
    if(t === 'category') {
      setCategory(value)
      handleSearchAll(value, search, type)
    }
    if(t === 'search') {
      setSearch(value)
      handleSearchAll(category, value, type)
    }
  }

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  return (
    <div>
      <Header />
      <div className="padding__products product-container">
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
            <h2>Danh sách sản phẩm</h2>
            <b></b>
          </div>
          <div className='products-search'>
            <div className="products-search-item">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chủ đề</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Chủ đề"
                  style={{ width: '30vw' , maxWidth: '150px'}}
                  onChange={(e)=>handleSearch(e.target.value, 'type')}
                >
                  <MenuItem value={1}>Mới nhất</MenuItem>
                  <MenuItem value={2}>Bán chạy</MenuItem>
                  <MenuItem value={3}>Siêu rẻ</MenuItem>
                  <MenuItem value={4}>Sắp đấu giá</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="products-search-item">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Chủ đề"
                  style={{ width: '30vw' , maxWidth: '150px'}}
                  onChange={(e)=>handleSearch(e.target.value, 'category')}
                > 
                  <MenuItem key={0} value={0}>Tất cả</MenuItem>
                  {
                    productCategory.length && productCategory.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))
                    || <div></div>
                  }
                </Select>
              </FormControl>
            </div>
            <div className="products-search-item">
              <TextField 
                id="outlined-basic" 
                label="Tên sản phẩm" 
                variant="outlined" 
                onChange={(e)=>handleSearch(e.target.value, 'search')}
                />
            </div>
          </div>
          <div className="product-wrapper">
            {
              data && data.length && data.slice(limit*(page-1), limit * page).map(item => (
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
        <div className="products-pagination">
          <Pagination spacing={2}
              count={data.length % limit === 0 ? data.length / limit : parseInt(data.length / limit + 1)}
              page={page}
              onChange={handleChangePage}
            />
        </div>
      </div>
      <Footer />
    </div>
  );
};