/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Header } from "../../../components/header/Header";
import { Footer } from "../../../components/footer/Footer";
import "./Product.scss";
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
import { Link } from "react-router-dom";
import { authenticate } from "../../../utils/authenticate";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { checkApiResponse } from "../../../utils/checkApiResponse";
import { AUCTION_STATUS, AUCTION_TIMES } from "../../../utils/constants";
import config from "../../../config";
import { tryParseJson } from "../../../utils/common";
// const _ = require('lodash')



export const Product = ({ socket }) => {
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
  const [bigImageIndex, setBigImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [preLoading, setPreLoading] = useState(false)
  const [productConfig, setProductConfig] = useState({})
  const productCategoriesConfig = tryParseJson(localStorage.getItem('product_category')) || {
    data: []
  };

  async function getData() {
    setLoading(true)
    setPreLoading(false)
    const f = async () => {
      let result = await post(`/api/v1/auction/${id}`, {}, currentUser)
      if (checkApiResponse(result)) {
        setData(result.data.data)
        const newConfig = productCategoriesConfig.data.find(i=>i.name === result.data.data.product_category) || {}
        setProductConfig(newConfig)
        setAuctionBet(result.data.data.sell_price + (newConfig.bid_increment || 50000))
        setPreLoading(true)
      }
      result = await get(`/auction-history?auction_id=${id}`, currentUser)
      if (checkApiResponse(result)) {
        setAuctionHistoryData(result.data.data)
      }
    }
    const delayPromise = new Promise((resolve) => setTimeout(resolve, config.productWaitTime));
    await Promise.all([f(), delayPromise])
    setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [id])
  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', () => {
        // getData()
      })
    }
  }, [socket.current])
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
    setOpenAuctionDialog(false)
    if (authenticate(currentUser)) {
      return
    }
    if (auctionBet > config.maxPrice) {
      Swal.fire(
        'Vui lòng đặt mức đấu giá hợp lí?',
        `Mức đấu giá tối đa cho sản phẩm là ${config.maxPrice} VND`,
        'error'
      )
      return
    }
    if (data.sell_price > auctionBet) {
      Swal.fire(
        'Vui lòng đặt mức đấu giá lớn hơn?',
        `Mức đấu giá tối thiểu cho sản phẩm này là ${data.sell_price + 1} VND`,
        'error'
      )
      return
    }
    // if(currentUser.id === data.seller.id){
    //   Swal.fire(
    //     'Bạn không thể đấu giá sản phẩm của chính bạn?',
    //     '',
    //     'error'
    //   )
    //   return 
    // }

    let result = await post(`/auction/raise?auction_id=${id}`, {
      price: auctionBet,
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, currentUser)
    if (result.data.success) {
      if (socket.current) {
        socket.current.emit('raise', {
          user: currentUser,
          auction: data,
          bet: {
            auctioneer_id: currentUser.id,
            auctioneer_name: currentUser.name,
            bet_price: auctionBet
          }
        })
      }
      Swal.fire({
        icon: 'success',
        title: 'Raise thành công',
        showConfirmButton: true,
        timer: 4000
      }).then(() => {
        data.sell_price = auctionBet
        data.auction_count = data.auction_count + 1
        auctionHistoryData.unshift({
          id: auctionHistoryData.length.id + 1,
          bet_time: new Date(),
          bet_amount: auctionBet,
          auctioneer_name: currentUser.name
        })
        setAuctionBet( parseInt(auctionBet) + productConfig.bid_increment || 50000)
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

  useEffect(() => {
    let length = data?.images.length
    let timeId = setInterval(() => {
      setBigImageIndex(bigImageIndex + 1 < length ? bigImageIndex + 1 : 0)
    }, 4000)
    return () => clearInterval(timeId)
  })

  const renderer = ({ days, hours, minutes, seconds }) => (
    <span>
      {days}d {zeroPad(hours)}h{zeroPad(minutes)}p{zeroPad(seconds)}s
    </span>
  );

  const handleStop = () => {
    // socket.current.emit('ping')
    setSuccessAuction(false)
    // window.location.reload()
  }

  function customDescription(str) {
    // str = str.replaceAll('\r', '')
    let customStr
    let arr = str.split('\n')
    if (arr.length > 1) {
      customStr = arr.map(i => {
        if (i.replaceAll(' ', '') !== '') {
          return `<div>${i}</div>`
        }
        return `<div style='opacity:0'>none-content</div>`
      }).join('')
    } else {
      customStr = str
    }
    return {
      __html: customStr
    };
  };

  return (
    <div>
      <Header socket={socket} />
      <div className="padding__product product-container">
        <div className="product-header">
        </div>
        {
          preLoading && data && data.images ? data.images.map((item, index) =>
            <div key={index}>
              <img style={{ display: 'none' }} rel="prefetch" src={item.url} alt="Product_Image" />
            </div>
          ) : <></>
        }
        {data ?
          <>
            <div className="product-detail">
              <div className="product-main">
                <div className='product__left'>
                  <div className="product-image">
                    <div className="product-image__wrapper">
                      {loading ?
                        <div className="loading">
                          <Skeleton width={350} height={350} />
                        </div>
                        :
                        <img src={data.images.length ? data.images[bigImageIndex].url : 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg'} alt="" />

                      }
                    </div>
                  </div>
                  <div className="product-sub-image">
                    {loading ? Array(5).fill(1).map((item, index) =>
                      <div key={index} className="loading" style={{ margin: '5px' }}>
                        <Skeleton width={50} height={60} />
                      </div>
                    ) :
                      <>
                        {data && data.images && data.images.map((item, index) => (
                          <div className="product-sub-image__wrapper" key={index} onClick={() => setBigImageIndex(index)}>
                            <img src={item.url} alt="" />
                          </div>
                        ))
                        }
                      </>}
                  </div>
                </div>
                <div className='product__right'>
                  <div className="product-name">{data.name}</div>
                  <div className="product-title">{data.title}</div>
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
                            // date={moment(data.start_time).add(data.time, 'minutes')}
                            date={Date.now() + moment(data.start_time).add(data.time, 'minutes').diff(moment(new Date()))}
                            renderer={renderer}
                          />
                        </div>
                      }
                    </div>
                    <div className="product-vote">{data.auction_count} Lượt đấu giá</div>
                  </div>
                  <div className="product-price-and-action">
                    <div className="product-price-wrap">
                      <div className="product-price-title">Giá khởi điểm:</div>
                      <div className='product-price'>
                        <div className='product-price-icon'>
                          <PaidIcon />
                        </div>
                        <div className="product-price-title">
                          {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(data.start_price)}
                        </div>
                      </div>
                      <div className="product-price-title">Giá hiện tại</div>
                      <div className='product-price'>
                        <div className='product-price-icon'>
                          <SellIcon />
                        </div>
                        <div className="product-price-title">
                          {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(data.sell_price)}
                        </div>
                      </div>
                    </div>
                    <div className="product-action">
                      <div className="action-button-log">
                        <Button onClick={() => handleClickOpenAuctionHistoryDialog()} style={{ width: '100%', height: '35px', overflow: 'hidden' }} variant="outlined">Lịch sử</Button>
                      </div>
                      {/* <div className="action-button-log">
                        <Button style={{ width: '100%', height: '35px', overflow: 'hidden' }} variant="outlined" disabled={data.auction_status !== 2 || currentUser.id === data.seller.id}>Theo dõi</Button>
                      </div> */}
                      <div className="action-button">
                        <Button onClick={() => handleClickOpenAuctionDialog()} style={{ width: '100%', fontSize: '18px', height: '40px', overflow: 'hidden' }} disabled={data.auction_status !== 2 || currentUser.id === data.seller.id} variant="contained">Đấu giá</Button>
                      </div>
                      <div className="action-button product-price-title" style={{color: "#d0011b", textAlign: "center", paddingTop: "10px", fontWeight: "bold"}}>
                        Bước nhảy: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(productConfig.bid_increment || 50000)}
                      </div>
                      <div className="action-button product-price-title" style={{color: "#d0011b", textAlign: "center", paddingTop: "10px", fontWeight: "bold"}}>
                        {
                          productConfig.fee ? 
                          <>
                            Phụ thu: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(productConfig.fee || 0)}
                          </> : 
                          <></>
                        }
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
                    <Avatar style={{ height: '45px', width: '45px' }} alt="Seller Avatar" src={data.seller.avatar} />
                  </div>
                  <div className="seller-info">
                    <Link style={{ textDecoration: 'none', color: "black" }} to={`/user/${data.seller.id}`}>
                      <div className="seller-info__name">{data.seller.username || data.seller.name}</div>
                    </Link>
                    <div className="seller-info__vote">0 Đánh giá</div>
                  </div>
                </div>
                <div className="seller-address">
                  <div className="seller-address__icon"><HomeIcon /></div>
                  <div className="seller-address__content">{data.seller.address}</div>
                </div>
                <div className="seller-history">
                  <div className="history history__all">
                    <div className="history-count">{data.seller.auction_sale_all_count || 100}</div>
                    <div className="history-title ">Đã bán</div>
                  </div>
                  <div className="history  history__success">
                    <div className="history-count">{data.seller.auction_sale_success_count || 5}</div>
                    <div className="history-title">Thành công</div>
                  </div>
                  <div className="history  history__failed">
                    <div className="history-count">{data.seller.auction_sale_failed_count || 95}</div>
                    <div className="history-title">Thất bại</div>
                  </div>
                </div>
                {data.seller.prestige === 1
                  ?
                  <>
                    <div className="seller-rate seller-rate__medium">
                      <div className="seller-rate__detail">
                        Mức độ uy tín trung bình. Bạn lên liên lạc với người bán nếu trúng thầu.
                      </div>
                      <div>
                        <Button className="seller-rate__content" variant="contained">Độ uy tín trung bình</Button>
                      </div>
                    </div>
                  </>
                  :
                  <></>
                }
                {data.seller.prestige === 2
                  ?
                  <>
                    <div className="seller-rate seller-rate__hight">
                      <div className="seller-rate__detail">
                        Mức độ uy tín cao. Bạn hoàn toàn yên tâm vào người bán này
                      </div>
                      <div>
                        <Button className="seller-rate__content" variant="contained">Độ uy tín cao</Button>
                      </div>
                    </div>
                  </>
                  :
                  <></>
                }
                {data.seller.prestige === 0
                  ?
                  <>
                    <div className="seller-rate seller-rate__low">
                      <div className="seller-rate__detail">
                        Mức độ uy tín thấp, nếu tham gia đấu giá bạn phải chấp nhận hoàn toàn mọi rủi ro.
                      </div>
                      <div>
                        <Button className="seller-rate__content" variant="contained">Độ uy tín thấp</Button>
                      </div>
                    </div>
                  </>
                  :
                  <></>
                }
              </div>
            </div>
            <div className="product-info">
              <div className="product-info__header">
                <b></b>
                <h3 style={{ color: "#d0011b" }}>Thông tin chi tiết sản phẩm</h3>
                <b></b>
              </div>
              <div className="product-info-wrap">
                <div className="product-info">
                  <div className="product-info-title">ID</div>
                  <div className="product-info-detail">{data.id}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Danh mục</div>
                  <div className="product-info-detail">{data.product_category}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Nhãn hiệu</div>
                  <div className="product-info-detail">{data.branch}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Tình trạng sản phẩm</div>
                  <div className="product-info-detail">{data.status}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Keyword</div>
                  <div className="product-info-detail">{data.key_word}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Số lượng</div>
                  <div className="product-info-detail">1</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Hoàn trả</div>
                  <div className="product-info-detail">{data.is_returned ? 'Có' : 'Không'}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Thời gian đấu giá</div>
                  <div className="product-info-detail">{AUCTION_TIMES[data.time]}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Thời gian bắt đầu</div>
                  <div className="product-info-detail">{moment(data.start_time).format('DD-MM-YYYY HH:mm:ss')}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Thời gian kết thúc</div>
                  <div className="product-info-detail">{moment(data.start_time).add(data.time, 'minutes').format('DD-MM-YYYY HH:mm:ss')}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Kết thúc sớm</div>
                  <div className="product-info-detail">{data.is_finished_soon ? "Có" : "Không"}</div>
                </div>
                <div className="product-info">
                  <div className="product-info-title">Tình trạng phiên đấu giá</div>
                  <div className="product-info-detail">{AUCTION_STATUS.find(i => i.value === data.auction_status)?.title}</div>
                </div>
              </div>
            </div>
            <div className="product-description">
              <div className="product-description__header">
                <b></b>
                <h3 style={{ color: "#d0011b" }}>Mô tả sản phẩm</h3>
                <b></b>
              </div>
              <div className="product-description__detail" dangerouslySetInnerHTML={customDescription(data.description)}>
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
            defaultValue={auctionBet}
            onChange={e => setAuctionBet(e.target.value)}
          // onKeyDown={onEnterWork}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAuctionDialog}>Hủy</Button>
          <Button onClick={handleSubmitAuction} >Xác nhận</Button>
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
                <div className="history-dialog-user">{item.auctioneer_name}</div>
                <div className="history-dialog-amount">{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(parseInt(item.bet_amount))}</div>
                <div className="history-dialog-time">{moment(item.bet_time).format('DD-MM-YYYY HH:mm:ss')}</div>
              </div>
            ))}
          </div>
        </div>
        <DialogActions>
          <Button onClick={handleCloseAuctionHistoryDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};
