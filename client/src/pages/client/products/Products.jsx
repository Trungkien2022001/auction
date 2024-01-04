/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import unidecode from 'unidecode'; 
import { Header } from "../../../components/header/Header";
import "./Products.scss";
// import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from "@mui/material";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import Countdown, { zeroPad } from 'react-countdown'
import { useEffect } from "react";
import { get, post } from "../../../utils/customRequest";
import { useSelector } from "react-redux";
import { Footer } from "../../../components/footer/Footer";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import moment from "moment";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { checkApiResponse } from "../../../utils/checkApiResponse";
import config from "../../../config";

const renderer = ({ days, hours, minutes, seconds }) => (
  <span>
    {days} day {zeroPad(hours)}h:{zeroPad(minutes)}':{zeroPad(seconds)}s
  </span>
);;

export const Products = ({ socket }) => {
  const location = useLocation();
  const navigate = useNavigate();


  const params = new URLSearchParams(location.search)
  const limit = 24
  const currentUser = useSelector(state => state.user)
  const [data, setData] = useState([])
  const [productCategory, setProductCategory] = useState([])
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const [cnt, setCnt] = useState(1)
  const [loading, setLoading] = useState(true)
  const [preLoading, setPreLoading] = useState(false)
  const initialSeach = {
    type: params.get('type') === 'dashboard' ? 'dashboard' : 'homepage',
    sort: params.get('sort') || 'featured',
    category: params.get('category') || 'all',
    price_from: params.get('price_from') || 5000,
    price_to: params.get('price_to') || 5000000000,
    name: params.get('name') || '',
    page: params.get('page') || 1,
    limit: params.get('limit') || 24
  }
  const [filter, setFilter] = useState(initialSeach)
  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', () => {
        // getData(filter)
      })
    }
  }, [socket.current])


  async function getData(filter) {
    setLoading(true)
    setPreLoading(false)
    const f = async () => {
      const result = await post(`/auctions?type=${filter.type}&sort=${filter.sort}&category=${filter.category}&price_from=${filter.price_from}&price_to=${filter.price_to}&name=${unidecode(filter.name)}&page=${filter.page}&limit=${filter.limit}`, {},currentUser)
      if (checkApiResponse(result)) {
        setPreLoading(true)
        setCnt(result.data.data.count.total)
        setData(result.data.data.products)
      }
    }
    const delayPromise = new Promise((resolve) => setTimeout(resolve, config.productWaitTime));
    await Promise.all([f(), delayPromise])
    setLoading(false)
  }

  async function getMetaData() {
    const result = await get(`/auction-helper`, currentUser)
    if (checkApiResponse(result)) {
      setProductCategory(result.data.product_category)
    }
  }

  useEffect(() => {
    getData(filter)
    getMetaData()
  }, [])
  const handleStop = () => {
  }

  const buildParamURL = () => {
    return `/products?type=${filter.type}&category=${filter.category}&sort=${filter.sort}&price_from=${filter.price_from}&price_to=${filter.price_to}&name=${filter.name}&page=${filter.page}&limit=${filter.limit}`
  }

  const handleSearch = () => {
    navigate(buildParamURL())
    handleCloseAuctionDialog();
    setCnt(1)
    getData(filter)
  }

  const handleClickOpenAuctionDialog = () => {
    setOpenAuctionDialog(true);
  };

  const handleCloseAuctionDialog = () => {
    setOpenAuctionDialog(false);
  };

  const handleChangePage = (event, value) => {
    setFilter(prev => {
      return { ...prev, page: value }
    });
    getData({...filter, page: value})
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
            {
              !loading ? <div className="products-search-item">
                Có {cnt} kết quả được tìm thấy
              </div> :
                <div className="products-search-item">
                  <Skeleton width={220} height={30} />
                </div>
            }
            <div className="products-search-item">
              <Button onClick={() => handleClickOpenAuctionDialog()} variant="contained"><FilterAltIcon /></Button>
            </div>
          </div>
          <div className="product-wrapper">
            {loading ? Array(6).fill(1).map((item, index) =>
              <div key={index} className="loading" style={{ margin: '20px' }}>
                <Skeleton width={178} height={200} />
                <Skeleton width={178} height={45} count={2} style={{ marginTop: "10px" }} />
              </div>
            ) :
              <>
                {
                  data && data.length ? data.map(item => (
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
                          <AttachMoneyIcon style={{ marginBottom: '-5px', fontSize: "18px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                        </div>
                        <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                          <SellIcon style={{ marginBottom: '-5px', fontSize: "18px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                        </div>
                      </div>
                    </Link>
                  )) : <div className="none-content" style={{ height: "280px", textAlign: "center" }}></div>
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
          {
            preLoading && data && data.length ? data.map((item, index) =>
              <div key={index}>
                <img style={{ display: 'none' }} rel="prefetch" src={item.image} alt="Product_Image" />
              </div>
            ) : <></>
          }
        </div>
      </div>
      <Dialog className="filter-dialog" open={openAuctionDialog} onClose={handleCloseAuctionDialog}>
        <DialogTitle>Đấu giá</DialogTitle>
        <DialogContent>
          <div className="filter-dialog-item">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chủ đề</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter.sort}
                label="Chủ đề"
                onChange={e => setFilter({ ...filter, sort: e.target.value })}
              >
                <MenuItem value={'latest'}>Mới nhất</MenuItem>
                <MenuItem value={'featured'}>Nổi bật</MenuItem>
                <MenuItem value={'cheapest'}>Siêu rẻ</MenuItem>
                <MenuItem value={'expensive'}>Cao cấp</MenuItem>
                <MenuItem value={'incoming'}>Sắp đấu giá</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="filter-dialog-item">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter.category}
                label="Chủ đề"
                onChange={e => setFilter({ ...filter, category: e.target.value })}
              >
                <MenuItem value={'all'}>Tất cả</MenuItem>
                {
                  productCategory.length && productCategory.map((item) => (
                    <MenuItem key={item.id} value={item.key}>{item.name}</MenuItem>
                  ))
                  || <div></div>
                }
              </Select>
            </FormControl>
          </div>
          {/* <div className="filter-dialog-item">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Khoảng giá</InputLabel>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                // value={value}
                // onChange={handleChange}
                valueLabelDisplay="auto"
                min={50}
                max={50000}
                // getAriaValueText={valuetext}
              />
            </FormControl>
          </div> */}
          <div className="filter-dialog-item">
            <TextField
              id="outlined-basic"
              label="Giá từ"
              variant="outlined"
              type="number"
              value={filter.price_from}
              style={{ width: "250px" }}
              onChange={e => setFilter({ ...filter, price_from: e.target.value })}
            />
          </div>
          <div className="filter-dialog-item">
            <TextField
              id="outlined-basic"
              label="Đến"
              variant="outlined"
              type="number"
              value={filter.price_to}
              style={{ width: "250px" }}
              onChange={e => setFilter({ ...filter, price_to: e.target.value })}
            />
          </div>
          <div className="filter-dialog-item">
            <TextField
              id="outlined-basic"
              label="Tên sản phẩm"
              variant="outlined"
              value={filter.name}
              style={{ width: "250px" }}
              onChange={e => setFilter({ ...filter, name: e.target.value })}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAuctionDialog}>Hủy</Button>
          <Button onClick={handleSearch} >Xác nhận</Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};
