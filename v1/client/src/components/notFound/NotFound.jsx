import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import "./NotFound.scss";
export const NotFound = ({socket}) => {
  return (
    <>
      <Header socket = {socket}></Header>
      <div className="NotAllow padding___main">
        <div className="title">Trang này không tồn tại</div>
        <div className="title">Vui lòng quay lại trang chủ</div>
        <Link to={"/"}>
          <div className="more">Chuyển đến trang chủ</div>
        </Link>
      </div>
      <Footer></Footer>
    </>
  );
};
