/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { Header } from "../../../components/header/Header";
import "./Products.scss";
// import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from "@mui/material";
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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const renderer = ({ days, hours, minutes, seconds }) => (
  <span>
    {days} day {zeroPad(hours)}h:{zeroPad(minutes)}':{zeroPad(seconds)}s
  </span>
);;

export const Products = ({ socket }) => {
  const location = useLocation();
  let id = location.pathname.split('/')[2]
  const params = new URLSearchParams(location.search)
  const limit = 24
  const currentUser = useSelector(state => state.user)
  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState({})
  const [type, setType] = useState(id >= 1000 ? parseInt(id / 1000) : 1)
  const [category, setCategory] = useState(id && id < 1000 ? parseInt(id) : 0)
  const [search, setSearch] = useState('')
  const [productCategory, setProductCategory] = useState([])
  const [cnt, setCnt] = useState(1)
  const [loading, setLoading] = useState(true)
  const [preLoading, setPreLoading] = useState(false)
  const [filter, setFilter] = useState({
    type: params.get('type') === 'dashboard' ? 'dashboard' : 'homepage',
    category: params.get('category') || 'all',
    price_from: params.get('price_from') || 0,
    price_to: params.get('price_to') || 99999999999,
    name: params.get('name') || '',
    page: params.get('page') || 1,
    limit: params.get('limit') || 24
  })
  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', () => {
        getData()
      })
    }
  }, [socket.current])


  async function getData() {
    setLoading(true)
    setPreLoading(false)
    const f = async () => {
      const result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auctions?type=${filter.type}&category=${filter.category}&price_from=${filter.price_from}&price_to=${filter.price_to}&name=${filter.name}&page=${filter.page}&limit=${filter.limit}`, currentUser)
      if (result.status === 200) {
        setInitialData(result.data.data.products)
        setCnt(result.data.data.count.total)
        setPreLoading(true)
        if (id) {
          handleSearchAll(result.data.data, id && id < 1000 ? id : 0, '', id >= 1000 ? id / 1000 : 1)
        } else {
          setData(result.data.data.products)
        }
      }
    }
    const delayPromise = new Promise((resolve) => setTimeout(resolve, process.env.PRODUCTS_WAIT_TIME || 3000));
    await Promise.all([f(), delayPromise])
    setLoading(false)
  }

  async function getMetaData() {
    const result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-helper`, currentUser)
    if (result.status === 200) {
      setProductCategory(result.data.product_category)
    }
  }

  useEffect(() => {
    getData()
    getMetaData()
  }, [])
  const handleStop = () => {
  }

  const handleSearchAll = (metaData, category, search, type) => {

  }

  const handleSearch = (value, t) => {
    if (t === 'type') {
      setType(value)
      handleSearchAll(initialData, category, search, value)

    }
    if (t === 'category') {
      setCategory(value)
      handleSearchAll(initialData, value, search, type)
    }
    if (t === 'search') {
      setSearch(value)
      handleSearchAll(initialData, category, value, type)
    }
  }

  const handleChangePage = (event, value) => {
    setFilter(prev => {
      return { ...prev, page: value }
    });
  };
  return (
    <div>
      <Header socket={socket} />
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
                  style={{ width: '30vw', maxWidth: '150px' }}
                  onChange={(e) => handleSearch(e.target.value, 'type')}
                >
                  <MenuItem value={1}>Mới nhất</MenuItem>
                  <MenuItem value={2}>Nổi bật</MenuItem>
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
                  style={{ width: '30vw', maxWidth: '150px' }}
                  onChange={(e) => handleSearch(e.target.value, 'category')}
                >
                  <MenuItem value={0}>Tất cả</MenuItem>
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
                onChange={(e) => handleSearch(e.target.value, 'search')}
              />
            </div>
          </div>
          <div className="product-wrapper">
            {loading ? Array(6).fill(1).map((item, index) =>
              <div key={index} className="loading" style={{ margin: '20px' }}>
                <Skeleton width={175} height={200} />
                <Skeleton width={175} height={45} count={2} style={{ marginTop: "10px" }} />
              </div>
            ) :
              <>
                {
                  data && data.length ? data.slice(filter.limit * (filter.page - 1), filter.limit * filter.page).map(item => (
                    <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <div className="product">
                        <div className="productImg">
                          <img rel="prefetch" src={item.image} alt="Product_Image" />
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
                  )) : <div className="none-content" style={{ height: "280px", textAlign: "center" }}>Không có sản phẩm nào</div>
                }
              </>}
          </div>

        </div>
        <div className="products-pagination">
          <Pagination spacing={2}
            count={cnt % limit === 0 ? cnt / limit : parseInt(cnt / limit + 1)}
            page={filter.page}
            onChange={handleChangePage}
          />
        </div>
        {
          preLoading && data && data.length ? data.map((item, index) =>
            <div key={index}>
              <img style={{ display: 'none' }} rel="prefetch" src={item.image} alt="Product_Image" />
            </div>
          ) : <></>
        }
      </div>
      <Footer />
    </div>
  );
};
