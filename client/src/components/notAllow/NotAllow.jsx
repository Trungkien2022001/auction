import React from "react";
import { Link } from "react-router-dom";
import "./NotAllow.scss";
export const NotAllow = () => {
  return (
    <div className="NotAllow padding___main">
      <div className="title">Bạn không có quyền truy cập trang này</div>
      <div className="title">Vui lòng đăng nhập bằng tài khoản admin</div>
      <Link to={"/login"}>
        <div className="more">Chuyển đến trang đăng nhập</div>
      </Link>
    </div>
  );
};
