/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Header } from "../../../components/header/Header";
import "./Product.scss";

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import TimerIcon from '@mui/icons-material/Timer';
import PaidIcon from '@mui/icons-material/Paid';
import SellIcon from '@mui/icons-material/Sell';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import Countdown, { zeroPad } from 'react-countdown'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { get, post } from "../../../utils/customRequest";
import { useSelector } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";


export const Product = ({socket}) => {
  const currentUser = useSelector(state => state.user)
  const location = useLocation();
  let id = location.pathname.split("/")[2];
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const [openAuctionHistoryDialog, setOpenAuctionHistoryDialog] = useState(false);
  const [successAuction, setSuccessAuction] = useState(false);
  const [reload, setReload] = useState(false);
  const [auctionBet, setAuctionBet] = useState(0);
  const [data, setData] = useState(null);
  const [auctionHistoryData, setAuctionHistoryData] = useState([]);

  useEffect(() => {
    async function getData() {
      let result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction?id=${id}`, currentUser)
      if (result.status === 200) {
        setData(result.data.data)
      }
      result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-history?auction_id=${id}`, currentUser)
      if (result.status === 200) {
        setAuctionHistoryData(result.data.data)
      }
    }
    getData()
  }, [id])

  useEffect(()=>{
    if(socket.current){
      socket.current.on('updateUI', ()=>{
        console.log("updateUI")
      })
    }
  }, [])
  // console.log(data)
  // useEffect(() => {
  //   async function getData() {
  //     let result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-history?auction_id=${id}`, currentUser)
  //     if (result.status === 200) {
  //       setAuctionHistoryData(result.data.data)
  //     }
  //   }
  //   getData()
  // }, [id, openAuctionDialog])
  const handleClickOpenAuctionHistoryDialog = () => {
    setOpenAuctionHistoryDialog(true);
  };

  const handleCloseAuctionHistoryDialog = () => {
    setOpenAuctionHistoryDialog(false);
  };

  const handleClickOpenAuctionDialog = () => {
    setOpenAuctionDialog(true);
  };

  const handleCloseAuctionDialog = () => {
    setOpenAuctionDialog(false);
  };
  const handleSubmitAuction = async () => {
    setOpenAuctionDialog(false);
    if (data.product.sell_price > auctionBet) {
      Swal.fire(
        'Vui lòng đặt mức cược lớn hơn?',
        `Mức cược tối thiểu cho sản phẩm này là ${data.product.sell_price + 1} VND`,
        'error'
      )
      return
    }

    let result = await post(`${process.env.REACT_APP_API_ENDPOINT}/auction/raise?auction_id=${id}`, {
      price: auctionBet,
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, currentUser)
    if (result.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Raise thành công',
        showConfirmButton: true,
        timer: 4000
      }).then(() => {
        data.product.auction_count = auctionBet
        data.product.auction_count = data.product.auction_count + 1
       auctionHistoryData.unshift({
           id: auctionHistoryData.length.id + 1,
           bet_time: new Date(),
           bet_amount: auctionBet,
           auctioneer_name: currentUser.name
         })
        setReload(!reload)
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Đã xảy ra lỗi',
        text: result.data.message,
        showConfirmButton: true,
      })
    }
  };

  const renderer = ({ days, hours, minutes, seconds }) => (
    <span>
      {hours}d {zeroPad(hours)}h{zeroPad(minutes)}p{zeroPad(seconds)}s
    </span>
  );

  const handleStop = () => {
    // socket.current.emit('ping')
    setSuccessAuction(false)
  }

  return (
    <div>
      <Header />
      <div className="padding__product product-container">
        <div className="product-header">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              P1
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              P2
            </Link>
            <Typography color="text.primary">P3</Typography>
          </Breadcrumbs>
        </div>
        {data ?
          <>
            <div className="product-detail">
              <div className="product-main">
                <div className='product__left'>
                  <div className="product-image">
                    <div className="product-image__wrapper">
                      <img src="https://cdn.tgdd.vn/Files/2016/04/23/819804/anhpanorama3.jpg" alt="" />
                    </div>
                  </div>
                  <div className="product-sub-image">
                    {data && data.product_images && data.product_images.map((item, index) => (
                      <div className="product-sub-image__wrapper" key={index}>
                        <img src={item.url} alt="" />
                      </div>
                    ))
                    }

                  </div>
                </div>
                <div className='product__right'>
                  <div className="product-name">{data.product.name}</div>
                  <div className="product-title">{data.product.title}</div>
                  <div className="product-auction">
                    <div className="product-time">
                      <div className='product-time-icon'>
                        <TimerIcon />
                      </div>
                      {successAuction ?
                        <div className="product-success-auction">
                          Đã hoàn thành
                        </div>
                        :
                        <div className="product-time-title">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            // date={moment(data.product.start_time).add(data.product.time, 'minutes')}
                            date={Date.now() + moment(data.product.start_time).add(data.product.time, 'minutes').diff(moment(new Date()))}
                            renderer={renderer}
                          />
                        </div>
                      }
                    </div>
                    <div className="product-vote">{data.product.auction_count} Lượt đấu giá</div>
                  </div>
                  <div className="product-price-and-action">
                    <div className="product-price-wrap">
                      <div className="product-price-title">Giá khởi điểm</div>
                      <div className='product-price'>
                        <div className='product-price-icon'>
                          <PaidIcon />
                        </div>
                        <div className="product-price-title">
                          {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(data.product.start_price)}
                        </div>
                      </div>
                      <div className="product-price-title">Giá hiện tại</div>
                      <div className='product-price'>
                        <div className='product-price-icon'>
                          <SellIcon />
                        </div>
                        <div className="product-price-title">
                          {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(data.product.sell_price)}
                        </div>
                      </div>
                    </div>
                    <div className="product-action">
                      <div className="action-button-log">
                        <Button onClick={() => handleClickOpenAuctionHistoryDialog()} style={{ width: '100%', height: '35px', overflow: 'hidden' }} variant="outlined">Lịch sử</Button>
                      </div>
                      <div className="action-button-log">
                        <Button style={{ width: '100%', height: '35px', overflow: 'hidden' }} variant="outlined">Theo dõi</Button>
                      </div>
                      <div className="action-button">
                        <Button onClick={() => handleClickOpenAuctionDialog()} style={{ width: '100%', fontSize: '18px', height: '50px', overflow: 'hidden' }} variant="contained">Đấu giá</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-seller">
                <div className="product-seller-header">Thông tin người bán</div>
                <div className="product-seller-header-mobile">
                  <b></b>
                  <h2>Thông tin người bán</h2>
                  <b></b>
                </div>
                {/* <div className="product-seller-wrapper">

            </div> */}
                <div className="product-seller-info">
                  <div className="seller-info__avatar">
                    <Avatar style={{ height: '60px', width: '60px' }} alt="Seller Avatar" src={data.seller_info.avatar} />
                  </div>
                  <div className="seller-info">
                    <div className="seller-info__name">{data.seller_info.username || data.seller_info.name}</div>
                    <div className="seller-info__vote">0 Đánh giá</div>
                  </div>
                </div>
                <div className="seller-address">
                  <div className="seller-address__icon"><HomeIcon /></div>
                  <div className="seller-address__content">{data.seller_info.address}</div>
                </div>
                <div className="seller-history">
                  <div className="history history__all">
                    <div className="history-count">{data.seller_info.auction_sale_all_count}</div>
                    <div className="history-title ">Đã bán</div>
                  </div>
                  <div className="history  history__success">
                    <div className="history-count">{data.seller_info.auction_sale_success_count}</div>
                    <div className="history-title">Thành công</div>
                  </div>
                  <div className="history  history__failed">
                    <div className="history-count">{data.seller_info.auction_sale_failed_count}</div>
                    <div className="history-title">Thất bại</div>
                  </div>
                </div>
                <div className="seller-rate seller-rate__low">
                  <div className="seller-rate__detail">
                    Mức độ uy tín thấp, nếu tham gia đấu giá bạn phải chấp nhận hoàn toàn mọi rủi ro.
                  </div>
                  <div>
                    <Button className="seller-rate__content" variant="contained">Độ uy tín thấp</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-info">
              <div className="product-info__header">
                <b></b>
                <h2>Thông tin chi tiết sản phẩm</h2>
                <b></b>
              </div>
              <div className="product-info-wrap">
                <div className="product-info">
                  <div className="product-info-title">Danh mục</div>
                  <div className="product-info-detail">{data.product.product_category}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Số lượng</div>
                  <div className="product-info-detail">1</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Tình trạng sản phẩm</div>
                  <div className="product-info-detail">{data.product.status}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Hoàn trả</div>
                  <div className="product-info-detail">{data.product.is_returned ? 'Có' : 'Không'}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Thời gian bắt đầu</div>
                  <div className="product-info-detail">{moment(data.product.start_time).format('DD-MM-YYYY HH:mm:ss')}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Thời gian kết thúc</div>
                  <div className="product-info-detail">{moment(data.product.start_time).add(data.product.time, 'minutes').format('DD-MM-YYYY HH:mm:ss')}</div>
                </div>
              </div>
            </div>
            <div className="product-description">
              <div className="product-description__header">
                <b></b>
                <h2>Mô tả sản phẩm</h2>
                <b></b>
              </div>
              <div className="product-description__detail">
                {data.product.description}
              </div>
            </div>
          </>
          : <></>}
      </div>
      <Dialog open={openAuctionDialog} onClose={handleCloseAuctionDialog}>
        <DialogTitle>Đấu giá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng suy nghĩ kĩ trước khi đấu giá. Một khi tham gia vào quá trình đấu giá. Nếu bạn đấu trúng, bạn sẽ phải có trách nhiệm thanh toán tiền cho bên bán
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Số tiền đấu giá (VND)"
            type="number"
            fullWidth
            variant="standard"
            onChange={e => setAuctionBet(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAuctionDialog}>Hủy</Button>
          <Button onClick={handleSubmitAuction}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAuctionHistoryDialog} onClose={handleCloseAuctionHistoryDialog}>
        <div className="auction-history-dialog">
          <div className="history-dialog-header">Lịch sử đấu giá</div>
          <div className="history-dialog-wrapper">
            <div className="history-dialog-item">
              <div className="history-dialog-stt">STT</div>
              <div className="history-dialog-user" style={{ textAlign: 'center' }}>Người đấu giá</div>
              <div className="history-dialog-amount">Số tiền(VND)</div>
              <div className="history-dialog-time" style={{ textAlign: 'center' }}>Thời gian</div>
            </div>
            {auctionHistoryData && auctionHistoryData.length && auctionHistoryData.map((item, index) => (
              <div key={item.id} className="history-dialog-item">
                <div className="history-dialog-stt">{auctionHistoryData.length - index}</div>
                <div className="history-dialog-user" style={{ textAlign: 'center' }}>{item.auctioneer_name}</div>
                <div className="history-dialog-amount">{item.bet_amount}</div>
                <div className="history-dialog-time" style={{ textAlign: 'center' }}>{moment(item.bet_time).format('DD-MM-YYYY HH:mm:ss')}</div>
              </div>
            ))}
          </div>
        </div>
        <DialogActions>
          <Button onClick={handleCloseAuctionHistoryDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
