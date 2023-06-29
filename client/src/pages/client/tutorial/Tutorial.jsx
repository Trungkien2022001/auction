
import { Divider } from "@mui/material";
import { Header } from "../../../components/header/Header";
import "./Tutorial.scss";

export const Tutorial = ({socket}) => {

  return (
    <div>
      <Header socket = {socket}></Header>
      <div className="tutorial" style={{margin: "90px 60px"}}>
        <div>
          <div className="header">
            Giới thiệu
          </div>
          <div className="content">
            TIKA là hệ thống đấu giá trực tuyến hàng đầu việt nam. Nói phét thôi hehehe.
            Hiện tại thì việt nam có rất ít những trang web đấu giá trực tuyến. 
            Nên hiện tại trang web với hi vọng sau này trở thành trang web được nhiều người biết đến, mang lại doanh thu hàng tỉ đồng mỗi ngày
            <span>Hehehehehehe</span> 
          </div>
          <Divider/>
        </div>
        <div>
          <div className="header">
            Cách sử dụng
          </div>
          <Divider/>
          <div className="content">
            Nếu bạn chưa đăng ký tài khoản thì bạn có thể theo dõi, xem chi tiết những phiên đấu giá với giá trị tài sản lên đến hàng trăm tỉ hahaha
          </div>
          <Divider/>
          <div className="content">
            Nếu bạn có tài khoản mà nếu tài khoản có độ xác thực cao thì có thể đang bán sản phẩm của mình, tạo mới các phiên đấu giá, nhắn tin với admin, tố cáo người chơi, vân vấn và mấy mấy
          </div>
          <Divider/>
          <div className="content">
            Nếu bạn có vai trò admin, bạn có thể vào trang mangagement để có thể xem lưu lượng request trực tiếp đến server, quản lý pods, container,scale hệ thống, report,unlock người dùng, nhắn tin với hàng nghìn người đấu giá hahaha
          </div>
          <Divider/>
          <div className="content">
            Một vài hình ảnh demo để bạn có thể sử dụng dễ dàng
          </div>
          <div className="header">
            Trang chủ, bạn có thể xem danh sách auction, thêm mới, chat, xem thông báo, xem trang cá nhân, admin
          </div>
          <div className="content">
            <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1687360684/upload/gx1fqzlu5r4if8wr0qha.png" alt="" />
          </div>
          <div className="header">
            Trang sản phẩm: Xem đấu giá, xem lịch sử, theo dõi phiên đấu giá
          </div>
          <div className="content">
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1687360409/upload/brl0jaljstqjt265guix.png" alt="" />
          </div>
          <div className="content">
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1687360405/upload/rkfghhfxvbuwp7v9cs2k.png" alt="" />
          </div>
          <div className="content">
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1687360405/upload/ymniigsyvpdsn0nkpiqh.png" alt="" />
          </div>
          <div className="content">
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1687360405/upload/noyepso9taxbedqlvgk5.png" alt="" />
          </div>
          <div className="content">
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1687360406/upload/t5qerzlvbxuy96acwihb.png" alt="" />
          </div>
          <div className="content">
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1687360407/upload/zdsudcjrewflwynpszpk.png" alt="" />
          </div>

          <Divider/>
        </div>
      </div>
    </div>

  );
};

