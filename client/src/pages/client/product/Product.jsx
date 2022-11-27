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
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Product = () => {
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const [openAuctionHistoryDialog, setOpenAuctionHistoryDialog] = useState(false);

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

  return (
    <div>
      <Header />
      <div className="padding__product product-container">
        <div className="product-header">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
        </div>
        <div className="product-detail">
          <div className="product-main">
            <div className='product__left'>
              <div className="product-image">
                <div className="product-image__wrapper">
                  <img src="https://cdn.tgdd.vn/Files/2016/04/23/819804/anhpanorama3.jpg" alt="" />
                </div>
              </div>
              <div className="product-sub-image">
                <div className="product-sub-image__wrapper">
                  <img src="https://cdn.tgdd.vn/Files/2016/04/23/819804/anhpanorama3.jpg" alt="" />
                </div>
                <div className="product-sub-image__wrapper">
                  <img src="https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2orf72f5I8AX8uBIvh&_nc_ht=scontent-frt3-2.xx&oh=00_AfBUVuRGwcShvByGvaaw6H8Z9VRnFABOLyLFnw0GSUCTmw&oe=63857C96" alt="" />
                </div>
                <div className="product-sub-image__wrapper">
                  <img src="https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2orf72f5I8AX8uBIvh&_nc_ht=scontent-frt3-2.xx&oh=00_AfBUVuRGwcShvByGvaaw6H8Z9VRnFABOLyLFnw0GSUCTmw&oe=63857C96" alt="" />
                </div>
                <div className="product-sub-image__wrapper">
                  <img src="https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2orf72f5I8AX8uBIvh&_nc_ht=scontent-frt3-2.xx&oh=00_AfBUVuRGwcShvByGvaaw6H8Z9VRnFABOLyLFnw0GSUCTmw&oe=63857C96" alt="" />
                </div>
                <div className="product-sub-image__wrapper">
                  <img src="https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2orf72f5I8AX8uBIvh&_nc_ht=scontent-frt3-2.xx&oh=00_AfBUVuRGwcShvByGvaaw6H8Z9VRnFABOLyLFnw0GSUCTmw&oe=63857C96" alt="" />
                </div>
              </div>
            </div>
            <div className='product__right'>
              <div className="product-name">Đồng hồ u từ canada</div>
              <div className="product-title">Đồng hồ siêu đẹp nhật khẩu từ canadaĐồng hồ siêu đẹp nhật khẩu từ canadaĐồng hồ siêu đẹp nhật khẩu từ canadaĐồng hồ siêu đẹp nhật khẩu từ canadaĐồng hồ siêu đẹp nhật khẩu từ canada</div>
              <div className="product-auction">
                <div className="product-time">
                  <div className='product-time-icon'>
                    <TimerIcon />
                  </div>
                  <div className="product-time-title">
                    1D 20h19'15s
                  </div>
                </div>
                <div className="product-vote">10 Lượt đấu giá</div>
              </div>
              <div className="product-price-and-action">
                <div className="product-price-wrap">
                  <div className="product-price-title">Giá khởi điểm</div>
                  <div className='product-price'>
                    <div className='product-price-icon'>
                      <PaidIcon />
                    </div>
                    <div className="product-price-title">
                      100000VND
                    </div>
                  </div>
                  <div className="product-price-title">Giá hiện tại</div>
                  <div className='product-price'>
                    <div className='product-price-icon'>
                      <SellIcon />
                    </div>
                    <div className="product-price-title">
                      100000VND
                    </div>
                  </div>
                </div>
                <div className="product-action">
                  <div className="action-button-log">
                    <Button onClick={()=>handleClickOpenAuctionHistoryDialog()} style={{ width: '100%', height: '35px', overflow: 'hidden' }} variant="outlined">Lịch sử</Button>
                  </div>
                  <div className="action-button-log">
                    <Button style={{ width: '100%', height: '35px', overflow: 'hidden' }} variant="outlined">Theo dõi</Button>
                  </div>
                  <div className="action-button">
                    <Button onClick={()=>handleClickOpenAuctionDialog()} style={{ width: '100%', fontSize: '18px', height: '50px', overflow: 'hidden' }} variant="contained">Đấu giá</Button>
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
                <Avatar style={{ height: '60px', width: '60px' }} alt="Seller Avatar" src="https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2orf72f5I8AX8uBIvh&_nc_ht=scontent-frt3-2.xx&oh=00_AfBUVuRGwcShvByGvaaw6H8Z9VRnFABOLyLFnw0GSUCTmw&oe=63857C96" />
              </div>
              <div className="seller-info">
                <div className="seller-info__name">Trung Kiên</div>
                <div className="seller-info__vote">0 Đánh giá</div>
              </div>
            </div>
            <div className="seller-address">
              <div className="seller-address__icon"><HomeIcon /></div>
              <div className="seller-address__content">Yên Đồng, Yên Mô, Ninh BìnhYên Đồng, Yên Mô, Ninh Bình</div>
            </div>
            <div className="seller-history">
              <div className="history history__all">
                <div className="history-count">5</div>
                <div className="history-title ">Đã bán</div>
              </div>
              <div className="history  history__success">
                <div className="history-count">1</div>
                <div className="history-title">Thành công</div>
              </div>
              <div className="history  history__failed">
                <div className="history-count">4</div>
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
              <div className="product-info-detail">Đồng hồ</div>
            </div>
            <div className="product-info">
              <div className="product-info-title">Số lượng</div>
              <div className="product-info-detail">Đồng hồ</div>
            </div>
            <div className="product-info">
              <div className="product-info-title">Tình trạng sản phẩm</div>
              <div className="product-info-detail">Đồng hồ</div>
            </div>
            <div className="product-info">
              <div className="product-info-title">Hoàn trả</div>
              <div className="product-info-detail">Đồng hồ</div>
            </div>
            <div className="product-info">
              <div className="product-info-title">Thời gian bắt đầu</div>
              <div className="product-info-detail">Đồng hồ</div>
            </div>
            <div className="product-info">
              <div className="product-info-title">Thời gian kết thúc</div>
              <div className="product-info-detail">Đồng hồ</div>
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
          Outlined button
Outlined buttons are medium-emphasis buttons. They contain actions that are important but aren't the primary action in an app.

Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher emphasis alternative to text buttons.
          </div>
        </div>
        <div className="product-part-wrapper">
          <div className="title-header">
            <b></b>
            <h2>Sản phẩm nổi bật</h2>
            <b></b>
          </div>
            <div className="product-wrapper">
              <div className="product">
                  <div className="productImg">
                    <img src="https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2orf72f5I8AX8uBIvh&_nc_ht=scontent-frt3-2.xx&oh=00_AfBUVuRGwcShvByGvaaw6H8Z9VRnFABOLyLFnw0GSUCTmw&oe=63857C96" alt="" />
                  </div>
                  <div className="product-action">
                    <div className="product-time">3d -20h38'12s</div>
                    <div className="product-vote">20 Lượt đấu giá</div>
                  </div>
                  <div className="product-name">Đồng hồ</div>
                  <div className="product-detail">Đồng hồ rất đẹp, cực ngày xưa có một con chó làm hồ rất đẹp, cực kì đẹp</div>
                  <div className="product-price">Giá: 2000đ</div>
              </div>
              <div className="product">
                  <div className="productImg">
                    <img src="https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2orf72f5I8AX8uBIvh&_nc_ht=scontent-frt3-2.xx&oh=00_AfBUVuRGwcShvByGvaaw6H8Z9VRnFABOLyLFnw0GSUCTmw&oe=63857C96" alt="" />
                  </div>
                  <div className="product-action">
                    <div className="product-time">3d -20h38'12s</div>
                    <div className="product-vote">20 Lượt đấu giá</div>
                  </div>
                  <div className="product-name">Đồng hồ</div>
                  <div className="product-detail">Đồng hồ rất đẹp, cực kì đẹp</div>
                  <div className="product-price">Giá: 2000đ</div>
              </div>
              <div className="product">
                  <div className="productImg">
                    <img src="https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2orf72f5I8AX8uBIvh&_nc_ht=scontent-frt3-2.xx&oh=00_AfBUVuRGwcShvByGvaaw6H8Z9VRnFABOLyLFnw0GSUCTmw&oe=63857C96" alt="" />
                  </div>
                  <div className="product-action">
                    <div className="product-time">3d -20h38'12s</div>
                    <div className="product-vote">20 Lượt đấu giá</div>
                  </div>
                  <div className="product-name">Đồng hồ</div>
                  <div className="product-detail">Đồng hồ rất đẹp, cực kì đẹp</div>
                  <div className="product-price">Giá: 2000đ</div>
              </div>
              <div className="product">
                  <div className="productImg">
                    <img src="https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=f2orf72f5I8AX8uBIvh&_nc_ht=scontent-frt3-2.xx&oh=00_AfBUVuRGwcShvByGvaaw6H8Z9VRnFABOLyLFnw0GSUCTmw&oe=63857C96" alt="" />
                  </div>
                  <div className="product-action">
                    <div className="product-time">3d -20h38'12s</div>
                    <div className="product-vote">20 Lượt đấu giá</div>
                  </div>
                  <div className="product-name">Đồng hồ</div>
                  <div className="product-detail">Đồng hồ rất đẹp, cực kì đẹp</div>
                  <div className="product-price">Giá: 2000đ</div>
              </div>
            </div>
          </div>
      </div>
      <Dialog open={openAuctionDialog} onClose={handleCloseAuctionDialog}>
        <DialogTitle>Đấu giá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng suy nghĩ kĩ trước khi đấu giá. Một khi tham gia vào quá trình đấu giá. Nếu bạn đấu trúng, bạn sẽ phải có trách nhiệm thanh toán tiền cho bên bán. Số tiền tối thiểu là: 50001đ
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Số tiền đấu giá (VND)"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAuctionDialog}>Hủy</Button>
          <Button onClick={handleCloseAuctionDialog}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAuctionHistoryDialog} onClose={handleCloseAuctionHistoryDialog}>
          <div className="auction-history-dialog">
            <div className="history-dialog-header">Lịch sử đấu giá</div>
            <div className="history-dialog-wrapper">
              <div className="history-dialog-item">
                <div className="history-dialog-stt">STT</div>
                <div className="history-dialog-user" style={{textAlign:'center'}}>Người đấu giá</div>
                <div className="history-dialog-amount">Số tiền(VND)</div>
                <div className="history-dialog-time" style={{textAlign:'center'}}>Thời gian</div>
              </div>
              <div className="history-dialog-item">
                <div className="history-dialog-stt">20</div>
                <div className="history-dialog-user">TrungKien2022001</div>
                <div className="history-dialog-amount">120000000</div>
                <div className="history-dialog-time">11:01:26 26-02-2022</div>
              </div>
              <div className="history-dialog-item">
                <div className="history-dialog-stt">20</div>
                <div className="history-dialog-user">TrungKien2022001</div>
                <div className="history-dialog-amount">120000000</div>
                <div className="history-dialog-time">11:01:26 26-02-2022</div>
              </div>
              <div className="history-dialog-item">
                <div className="history-dialog-stt">20</div>
                <div className="history-dialog-user">TrungKien2022001</div>
                <div className="history-dialog-amount">120000000</div>
                <div className="history-dialog-time">11:01:26 26-02-2022</div>
              </div>
              <div className="history-dialog-item">
                <div className="history-dialog-stt">20</div>
                <div className="history-dialog-user">TrungKien2022001</div>
                <div className="history-dialog-amount">120000000</div>
                <div className="history-dialog-time">11:01:26 26-02-2022</div>
              </div>
            </div>
          </div>
          <DialogActions>
          <Button onClick={handleCloseAuctionHistoryDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
