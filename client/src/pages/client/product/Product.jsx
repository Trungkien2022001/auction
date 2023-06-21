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


export const Product = ({ socket }) => {
  const currentUser = useSelector(state => state.user)
  const location = useLocation();
  let id = location.pathname.split("/")[2];
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const [openAuctionHistoryDialog, setOpenAuctionHistoryDialog] = useState(false);
  const [successAuction, setSuccessAuction] = useState(false);
  const [reload, setReload] = useState(false);
  const [auctionBet, setAuctionBet] = useState(0);
  const [data, setData] = useState(JSON.parse(`{"product":{"id":43,"start_time":"2023-06-08T13:33:00.000Z","start_price":50000,"sell_price":61000,"seller_id":319,"auction_count":11,"auction_status":2,"is_finished_soon":0,"is_returned":0,"name":"Đồng hồ phiên bản Limited Xuất Xừ từ Ninh Bình, Thụy sĩ","branch":"Đồng Hồ Thụy Sĩ","key_word":"","title":"Chiếc đồng hồ có 1 0 2 trên thế giới được chế tác bằng uranium","description":"Về phương pháp định giá đất, trong phiên thảo luận dự án Luật Đất đai sửa đổi, nhiều đại biểu quan tâm đến vấn đề này. Bộ trưởng TN&MT cho biết, dự thảo luật lần này đưa ra 4 phương pháp định giá đất là: Phương pháp so sánh trực tiếp với giá thị trường, phương pháp chiết trừ, phương pháp thu nhập và phương pháp hệ số điều chỉnh.Tuỳ trường hợp cụ thể, UBND tỉnh, thành sẽ xác định phương pháp phù hợp để định giá đất. Các phương án lựa chọn bảo đảm công bằng, sát giá thị trường, đồng thời phòng chống tiêu cực, tham nhũng”, ông Đặng Quốc Khánh cho hay.Về chính sách tái định cư cho người dân mất đất, người đứng đầu ngành TN&MT cho biết, trong Luật Đất đai sửa đổi sẽ cố gắng xây dựng các điều khoản với nội dung đảm bảo cuộc sống bằng hoặc tốt hơn nơi ở cũ cho người mất đất. Việc này không chỉ là về cơ sở hạ tầng mà còn phải phù hợp với phong tục, tập quán, bản sắc văn hoá, tính cộng đồng. Do vậy, chính quyền địa phương phải tham khảo, đối thoại với nhân dân để quyết định nơi tái định cư phù hợp.“Chắc chắn là chúng ta phải xây dựng hạ tầng kỹ thuật, hạ tầng xã hội tốt hơn nơi ở cũ. Nhưng về lâu dài, chúng ta phải đảm bảo sinh kế cho người dân mất đất thông qua việc đào tạo việc làm cho thế hệ trẻ”, ông Đặng Quốc Khánh nói thêm.","status":"Chưa được dùng một lần nào hết","product_category":"Thời trang - Phụ kiện","time":43200,"images":[{"url":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231083/upload/futl7eh7gfnvxctxyc2w.png"},{"url":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231083/upload/ujfuku2dycfzec43kana.jpg"},{"url":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231083/upload/futl7eh7gfnvxctxyc2w.png"},{"url":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231083/upload/qhbznptmame1eiyptoe6.jpg"},{"url":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231083/upload/ujfuku2dycfzec43kana.jpg"}]},"seller_info":{"id":319,"name":"Nguyễn Trung Kiên","username":"trungkien2022001","email":"trungkien07yd@gmail.com","phone":"0989983025","role_id":"admin","avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","birthday":"2001-02-19T17:00:00.000Z","address":"136 Nguyễn An Ninh, Hoàng Mai, Hà Nội","prestige":0,"is_verified":1,"is_blocked":0,"rating":0,"sell_failed_count_by_seller":0,"sell_failed_count_by_auctioneer":0,"sell_success_count":0,"buy_cancel_count_by_seller":0,"buy_cancel_count_by_auctioneer":0,"buy_success_count":0,"created_at":"2022-11-19T01:59:39.000Z","updated_at":"2023-05-22T15:15:40.000Z","del_flag":0}}`));
  const [auctionHistoryData, setAuctionHistoryData] = useState(JSON.parse(`[{"id":331,"bet_time":"2023-06-10T03:29:24.000Z","bet_amount":61000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":330,"bet_time":"2023-06-10T02:23:22.000Z","bet_amount":60000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":329,"bet_time":"2023-06-10T02:23:10.000Z","bet_amount":59000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":328,"bet_time":"2023-06-10T02:21:19.000Z","bet_amount":58000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":327,"bet_time":"2023-06-10T02:20:27.000Z","bet_amount":57000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":326,"bet_time":"2023-06-10T02:20:00.000Z","bet_amount":56000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":325,"bet_time":"2023-06-10T02:19:37.000Z","bet_amount":55000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":324,"bet_time":"2023-06-10T02:19:29.000Z","bet_amount":54000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":323,"bet_time":"2023-06-10T02:19:17.000Z","bet_amount":53000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":322,"bet_time":"2023-06-10T02:18:05.000Z","bet_amount":52000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"},{"id":321,"bet_time":"2023-06-10T02:17:18.000Z","bet_amount":51000,"is_blocked":0,"auctioneer_name":"Phạm Thị Diệu Linh"}]`));
  const [bigImageIndex, setBigImageIndex] = useState(0)
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
  useEffect(() => {
    getData()
  }, [id])
  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', () => {
        getData()
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

  const onEnterWork = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleSubmitAuction()
    }
  }

  const handleSubmitAuction = async () => {
    setOpenAuctionDialog(false);
    if (data.product.sell_price > auctionBet) {
      Swal.fire(
        'Vui lòng đặt mức đấu giá lớn hơn?',
        `Mức đấu giá tối thiểu cho sản phẩm này là ${data.product.sell_price + 1} VND`,
        'error'
      )
      return
    }
    // if(currentUser.id === data.seller_info.id){
    //   Swal.fire(
    //     'Bạn không thể đấu giá sản phẩm của chính bạn?',
    //     '',
    //     'error'
    //   )
    //   return 
    // }

    let result = await post(`${process.env.REACT_APP_API_ENDPOINT}/auction/raise?auction_id=${id}`, {
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
        data.product.sell_price = auctionBet
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

  useEffect(() => {
    let length = data?.product.images.length
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

  return (
    <div>
      <Header />
      <div className="padding__product product-container">
        <div className="product-header">
        </div>
        {data ?
          <>
            <div className="product-detail">
              <div className="product-main">
                <div className='product__left'>
                  <div className="product-image">
                    <div className="product-image__wrapper">
                      <img src={data.product.images[bigImageIndex].url} alt="" />
                    </div>
                  </div>
                  <div className="product-sub-image">
                    {data && data.product.images && data.product.images.map((item, index) => (
                      <div className="product-sub-image__wrapper" key={index} onClick={() => setBigImageIndex(index)}>
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
                        <Button style={{ width: '100%', height: '35px', overflow: 'hidden' }} variant="outlined" disabled={data.product.auction_status !== 2 || currentUser.id === data.seller_info.id}>Theo dõi</Button>
                      </div>
                      <div className="action-button">
                        <Button onClick={() => handleClickOpenAuctionDialog()} style={{ width: '100%', fontSize: '18px', height: '50px', overflow: 'hidden' }} disabled={data.product.auction_status !== 2 || currentUser.id === data.seller_info.id} variant="contained">Đấu giá</Button>
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
                    <Link style={{ textDecoration: 'none', color: "black" }} to={`/user/${data.seller_info.id}`}>
                      <div className="seller-info__name">{data.seller_info.username || data.seller_info.name}</div>
                    </Link>
                    <div className="seller-info__vote">0 Đánh giá</div>
                  </div>
                </div>
                <div className="seller-address">
                  <div className="seller-address__icon"><HomeIcon /></div>
                  <div className="seller-address__content">{data.seller_info.address}</div>
                </div>
                <div className="seller-history">
                  <div className="history history__all">
                    <div className="history-count">{data.seller_info.auction_sale_all_count|| 100}</div>
                    <div className="history-title ">Đã bán</div>
                  </div>
                  <div className="history  history__success">
                    <div className="history-count">{data.seller_info.auction_sale_success_count|| 100}</div>
                    <div className="history-title">Thành công</div>
                  </div>
                  <div className="history  history__failed">
                    <div className="history-count">{data.seller_info.auction_sale_failed_count|| 100}</div>
                    <div className="history-title">Thất bại</div>
                  </div>
                </div>
                {data.seller_info.prestige === 1
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
                {data.seller_info.prestige === 2
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
                {data.seller_info.prestige === 0
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
            onKeyDown={onEnterWork}
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
                <div className="history-dialog-amount">{item.bet_amount}</div>
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
