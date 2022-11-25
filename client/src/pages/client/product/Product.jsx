import React from "react";
import { Header } from "../../../components/header/Header";
import "./Product.scss";

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


export const Product = () => {
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
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
              <div className="product-name">Đồng hồ siêu đẹp nhật khẩu từ canadaĐồng hồ siêu đẹp nhật Đồng hồ siêu đẹp nhật khẩu từ canadakhẩu từ canada</div>
              <div className="product-title">Đồng hồ siêu đẹp nhật khẩu từ canadaĐồng hồ siêu đẹp nhật khẩu từ canadaĐồng hồ siêu đẹp nhật khẩu từ canadaĐồng hồ siêu đẹp nhật khẩu từ canadaĐồng hồ siêu đẹp nhật khẩu từ canada</div>
              <div className="product-auction">
                <div className="product-time">Thời: 1D 20h19'15s</div>
                <div className="product-vote">10 Lượt đấu giá</div>
              </div>
              <div className="product-price-and-action">
                <div className="product-price-wrap">100000D</div>
                <div className="product-action">10 Lượt đấu giá</div>
              </div>
            </div>
          </div>
          <div className="product-seller"></div>
        </div>
      </div>
    </div>
  );
};
