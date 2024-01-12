/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import unidecode from 'unidecode';
import { Header } from "../../../components/header/Header";
import "./Products.scss";
// import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from "@mui/material";
import { useEffect } from "react";
import { get, post } from "../../../utils/customRequest";
import { useSelector } from "react-redux";
import { Footer } from "../../../components/footer/Footer";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { checkApiResponse } from "../../../utils/checkApiResponse";
import config from "../../../config";
import { ProductComponent } from "../../../components/product/ProductComponent";


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
      const result = await post(`/auctions?type=${filter.type}&sort=${filter.sort}&category=${filter.category}&price_from=${filter.price_from}&price_to=${filter.price_to}&name=${unidecode(filter.name)}&page=${filter.page}&limit=${filter.limit}`, {}, currentUser)
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
    getData({ ...filter, page: value })
  };
  return (
    <div>
      <Header socket={socket} />
      <div className="padding__main products-container" >
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
        <ProductComponent data={data} title={'Danh sách sản phẩm'} loading={loading} showMore={false} />
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
