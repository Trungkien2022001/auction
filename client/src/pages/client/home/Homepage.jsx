/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useState } from "react";
import { Header } from "../../../components/header/Header";
import "./Homepage.scss";
// import axios from "axios";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, List, ListItem, ListItemText } from "@mui/material";
import Countdown, { zeroPad } from 'react-countdown'
import { useEffect } from "react";
import { get } from "../../../utils/customRequest";
import { useSelector } from "react-redux";
import { Footer } from "../../../components/footer/Footer";
import moment from "moment";

const renderer = ({ days, hours, minutes, seconds }) => (
  <span>
    {days} day {zeroPad(hours)}h:{zeroPad(minutes)}':{zeroPad(seconds)}s
  </span>
);;

export const Homepage = ({ socket }) => {
  const messageRef = useRef(null);
  const currentUser = useSelector(state => state.user)
  const [data, setData] = useState(JSON.parse(`{"latest":[{"id":44,"start_time":"2023-06-08T13:34:00.000Z","start_price":5000,"sell_price":6001,"auction_count":2,"name":"trgf","title":"4rf","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231117/upload/b2two0yehsdbtm5ioiue.jpg","time":43200},{"id":41,"start_time":"2023-05-22T16:39:00.000Z","start_price":5002,"sell_price":5005,"auction_count":3,"name":"ekrjgerjge","title":"erger","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1684773269/upload/kdnmnjh85g0ovutx0thv.jpg","time":43200},{"id":42,"start_time":"2023-06-08T13:32:00.000Z","start_price":50000,"sell_price":52000000,"auction_count":3,"name":"Test","title":"ffd","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231021/upload/eu101fz7vra6de6an0kc.jpg","time":43200},{"id":43,"start_time":"2023-06-08T13:33:00.000Z","start_price":50000,"sell_price":61000,"auction_count":11,"name":"4rtgfh","title":"ds","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231083/upload/qhbznptmame1eiyptoe6.jpg","time":43200}],"featured":[{"id":43,"start_time":"2023-06-08T13:33:00.000Z","start_price":50000,"sell_price":61000,"auction_count":11,"name":"4rtgfh","title":"ds","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231083/upload/qhbznptmame1eiyptoe6.jpg","time":43200},{"id":41,"start_time":"2023-05-22T16:39:00.000Z","start_price":5002,"sell_price":5005,"auction_count":3,"name":"ekrjgerjge","title":"erger","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1684773269/upload/kdnmnjh85g0ovutx0thv.jpg","time":43200},{"id":42,"start_time":"2023-06-08T13:32:00.000Z","start_price":50000,"sell_price":52000000,"auction_count":3,"name":"Test","title":"ffd","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231021/upload/eu101fz7vra6de6an0kc.jpg","time":43200},{"id":44,"start_time":"2023-06-08T13:34:00.000Z","start_price":5000,"sell_price":6001,"auction_count":2,"name":"trgf","title":"4rf","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231117/upload/b2two0yehsdbtm5ioiue.jpg","time":43200}],"cheap":[{"id":44,"start_time":"2023-06-08T13:34:00.000Z","start_price":5000,"sell_price":6001,"auction_count":2,"name":"trgf","title":"4rf","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231117/upload/b2two0yehsdbtm5ioiue.jpg","time":43200},{"id":41,"start_time":"2023-05-22T16:39:00.000Z","start_price":5002,"sell_price":5005,"auction_count":3,"name":"ekrjgerjge","title":"erger","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1684773269/upload/kdnmnjh85g0ovutx0thv.jpg","time":43200},{"id":42,"start_time":"2023-06-08T13:32:00.000Z","start_price":50000,"sell_price":52000000,"auction_count":3,"name":"Test","title":"ffd","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231021/upload/eu101fz7vra6de6an0kc.jpg","time":43200},{"id":43,"start_time":"2023-06-08T13:33:00.000Z","start_price":50000,"sell_price":61000,"auction_count":11,"name":"4rtgfh","title":"ds","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231083/upload/qhbznptmame1eiyptoe6.jpg","time":43200}],"incoming":[{"id":44,"start_time":"2023-06-08T13:34:00.000Z","start_price":5000,"sell_price":6001,"auction_count":2,"name":"trgf","title":"4rf","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231117/upload/b2two0yehsdbtm5ioiue.jpg","time":43200},{"id":41,"start_time":"2023-05-22T16:39:00.000Z","start_price":5002,"sell_price":5005,"auction_count":3,"name":"ekrjgerjge","title":"erger","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1684773269/upload/kdnmnjh85g0ovutx0thv.jpg","time":43200},{"id":42,"start_time":"2023-06-08T13:32:00.000Z","start_price":50000,"sell_price":52000000,"auction_count":3,"name":"Test","title":"ffd","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231021/upload/eu101fz7vra6de6an0kc.jpg","time":43200},{"id":43,"start_time":"2023-06-08T13:33:00.000Z","start_price":50000,"sell_price":61000,"auction_count":11,"name":"4rtgfh","title":"ds","image":"http://res.cloudinary.com/nguyenkien2022001/image/upload/v1686231083/upload/qhbznptmame1eiyptoe6.jpg","time":43200}]}`))
  const [productCategory, setProductCategory] = useState(JSON.parse(`[{"id":1,"name":"Đồng hồ & Phụ kiện","created_at":"2022-11-23T04:09:40.000Z"},{"id":2,"name":"Điện tử, vi tính","created_at":"2022-12-16T15:31:24.000Z"},{"id":3,"name":"Đồ điện tử, AV & Máy ảnh","created_at":"2022-11-23T04:11:07.000Z"},{"id":4,"name":"Nhà cửa đời sống","created_at":"2022-11-23T04:11:21.000Z"},{"id":5,"name":"Thể thao & Giải trí","created_at":"2022-11-23T04:11:35.000Z"},{"id":6,"name":"Văn hóa phẩm","created_at":"2022-11-23T04:11:46.000Z"},{"id":7,"name":"Thời trang - Phụ kiện","created_at":"2022-11-23T04:12:00.000Z"},{"id":8,"name":"Phim, video","created_at":"2022-11-23T04:12:10.000Z"},{"id":9,"name":"Âm nhạc","created_at":"2022-11-23T04:12:18.000Z"},{"id":10,"name":"Sức khỏe & Làm đẹp","created_at":"2022-11-23T04:12:33.000Z"},{"id":11,"name":"Đồ trẻ em","created_at":"2022-11-23T04:12:40.000Z"},{"id":12,"name":"Sách, VPP, Quà tặng","created_at":"2022-11-23T04:12:55.000Z"},{"id":13,"name":"Ô tô, Xe máy, Xe đạp","created_at":"2022-11-23T04:13:10.000Z"},{"id":14,"name":"Sưu tầm đồ cổ","created_at":"2022-11-23T04:13:17.000Z"},{"id":15,"name":"Đồ chơi, trò chơi","created_at":"2022-11-23T04:13:24.000Z"},{"id":16,"name":"Thực phẩm & Đồ uống","created_at":"2022-11-23T04:13:33.000Z"},{"id":17,"name":"Hoa, Trồng trọ","created_at":"2022-11-23T04:13:41.000Z"},{"id":18,"name":"Sách & Tạp chí","created_at":"2022-11-23T04:13:50.000Z"},{"id":19,"name":"Truyện tranh, phim hoạt hình","created_at":"2022-11-23T04:13:59.000Z"},{"id":20,"name":"Sở thích & Văn hóa","created_at":"2022-11-23T04:14:19.000Z"},{"id":21,"name":"Khác","created_at":"2022-11-23T04:14:30.000Z"}]`));
  const [check, setCheck] = useState(true)
  const [message, setMessage] = useState("");
  const [isReal, setIsReal] = useState(true)
  const [mess, setMess] = useState(JSON.parse(`[{"id":1,"chat_id":6,"user_id":319,"is_admin":0,"content":"hello","created_at":"2023-05-26T15:31:11.000Z","updated_at":"2023-05-26T15:31:11.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":2,"chat_id":6,"user_id":319,"is_admin":0,"content":"ewger","created_at":"2023-05-26T15:53:00.000Z","updated_at":"2023-05-26T16:04:05.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":3,"chat_id":6,"user_id":319,"is_admin":0,"content":"Hi kien","created_at":"2023-05-26T15:57:08.000Z","updated_at":"2023-05-26T16:04:06.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":4,"chat_id":6,"user_id":319,"is_admin":0,"content":"alo","created_at":"2023-05-26T15:58:05.000Z","updated_at":"2023-05-26T15:58:05.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":5,"chat_id":6,"user_id":319,"is_admin":0,"content":"check","created_at":"2023-05-26T15:59:47.000Z","updated_at":"2023-05-26T15:59:47.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":6,"chat_id":6,"user_id":319,"is_admin":0,"content":"kelfew","created_at":"2023-05-26T15:59:49.000Z","updated_at":"2023-05-26T15:59:49.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":7,"chat_id":6,"user_id":319,"is_admin":0,"content":"hi","created_at":"2023-05-26T16:00:06.000Z","updated_at":"2023-05-26T16:00:06.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":8,"chat_id":6,"user_id":319,"is_admin":0,"content":"ki","created_at":"2023-05-26T16:01:05.000Z","updated_at":"2023-05-26T16:01:05.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":9,"chat_id":6,"user_id":319,"is_admin":0,"content":"wefwe","created_at":"2023-05-26T16:01:08.000Z","updated_at":"2023-05-26T16:01:08.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":10,"chat_id":6,"user_id":319,"is_admin":0,"content":"wefw","created_at":"2023-05-26T16:01:09.000Z","updated_at":"2023-05-26T16:01:09.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":11,"chat_id":6,"user_id":319,"is_admin":0,"content":"wef","created_at":"2023-05-26T16:02:17.000Z","updated_at":"2023-05-26T16:02:17.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":12,"chat_id":6,"user_id":319,"is_admin":0,"content":"wef","created_at":"2023-05-26T16:02:18.000Z","updated_at":"2023-05-26T16:02:18.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":13,"chat_id":6,"user_id":319,"is_admin":0,"content":"wef","created_at":"2023-05-26T16:02:18.000Z","updated_at":"2023-05-26T16:02:18.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":14,"chat_id":6,"user_id":319,"is_admin":0,"content":"wef","created_at":"2023-05-26T16:02:18.000Z","updated_at":"2023-05-26T16:02:18.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":15,"chat_id":6,"user_id":319,"is_admin":0,"content":"wfwe","created_at":"2023-05-26T16:02:19.000Z","updated_at":"2023-05-26T16:02:19.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":16,"chat_id":6,"user_id":319,"is_admin":0,"content":"f","created_at":"2023-05-26T16:02:19.000Z","updated_at":"2023-05-26T16:02:19.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":17,"chat_id":6,"user_id":319,"is_admin":0,"content":"wef","created_at":"2023-05-26T16:02:19.000Z","updated_at":"2023-05-26T16:02:19.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":18,"chat_id":6,"user_id":319,"is_admin":0,"content":"wefew","created_at":"2023-05-26T16:02:24.000Z","updated_at":"2023-05-26T16:02:24.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":19,"chat_id":6,"user_id":319,"is_admin":0,"content":"erhgewirguhierughewriughewriughewriguerherw","created_at":"2023-05-26T16:02:35.000Z","updated_at":"2023-05-26T16:02:35.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":20,"chat_id":6,"user_id":319,"is_admin":0,"content":"gretfytewfrtyytre trung kien ngayf xuwa cos mon con meo","created_at":"2023-05-26T16:03:49.000Z","updated_at":"2023-05-26T16:03:49.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":21,"chat_id":6,"user_id":319,"is_admin":0,"content":"abc","created_at":"2023-05-26T16:10:09.000Z","updated_at":"2023-05-26T16:10:09.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":22,"chat_id":6,"user_id":319,"is_admin":0,"content":"clear","created_at":"2023-05-26T16:10:11.000Z","updated_at":"2023-05-26T16:10:11.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":23,"chat_id":6,"user_id":319,"is_admin":0,"content":"ưiefwefij","created_at":"2023-05-26T16:10:12.000Z","updated_at":"2023-05-26T16:10:12.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":24,"chat_id":6,"user_id":319,"is_admin":0,"content":"Hi","created_at":"2023-05-26T16:21:02.000Z","updated_at":"2023-05-26T16:21:02.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":25,"chat_id":6,"user_id":319,"is_admin":0,"content":"ALo","created_at":"2023-05-26T16:21:04.000Z","updated_at":"2023-05-26T16:21:04.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":26,"chat_id":6,"user_id":319,"is_admin":0,"content":"abc","created_at":"2023-05-26T16:40:20.000Z","updated_at":"2023-05-26T16:40:20.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":31,"chat_id":6,"user_id":319,"is_admin":0,"content":"kien","created_at":"2023-05-26T16:49:50.000Z","updated_at":"2023-05-26T16:49:50.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":32,"chat_id":6,"user_id":319,"is_admin":0,"content":"sđsvds","created_at":"2023-05-26T16:51:42.000Z","updated_at":"2023-05-26T16:51:42.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":33,"chat_id":6,"user_id":319,"is_admin":1,"content":"anh yêu em","created_at":"2023-05-26T16:52:41.000Z","updated_at":"2023-05-26T16:52:41.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":34,"chat_id":6,"user_id":319,"is_admin":1,"content":"ẻv","created_at":"2023-05-26T16:52:42.000Z","updated_at":"2023-05-26T16:52:42.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":35,"chat_id":6,"user_id":319,"is_admin":0,"content":"ki","created_at":"2023-05-26T16:53:29.000Z","updated_at":"2023-05-26T16:53:29.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":308,"chat_id":6,"user_id":319,"is_admin":0,"content":"hi kien","created_at":"2023-05-28T03:32:45.000Z","updated_at":"2023-05-28T03:32:45.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":309,"chat_id":6,"user_id":319,"is_admin":0,"content":"lo","created_at":"2023-05-28T04:09:50.000Z","updated_at":"2023-05-28T04:09:50.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":310,"chat_id":6,"user_id":319,"is_admin":0,"content":"ekrerg","created_at":"2023-05-28T04:09:54.000Z","updated_at":"2023-05-28T04:09:54.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":311,"chat_id":6,"user_id":319,"is_admin":0,"content":"ergk","created_at":"2023-05-28T04:09:55.000Z","updated_at":"2023-05-28T04:09:55.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":312,"chat_id":6,"user_id":319,"is_admin":0,"content":"ergk","created_at":"2023-05-28T04:09:57.000Z","updated_at":"2023-05-28T04:09:57.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":313,"chat_id":6,"user_id":319,"is_admin":0,"content":"erglk","created_at":"2023-05-28T04:09:58.000Z","updated_at":"2023-05-28T04:09:58.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":314,"chat_id":6,"user_id":319,"is_admin":0,"content":"erger","created_at":"2023-05-28T04:10:04.000Z","updated_at":"2023-05-28T04:10:04.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":315,"chat_id":6,"user_id":319,"is_admin":0,"content":"erg","created_at":"2023-05-28T04:10:06.000Z","updated_at":"2023-05-28T04:10:06.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":316,"chat_id":6,"user_id":319,"is_admin":0,"content":"erg","created_at":"2023-05-28T04:10:06.000Z","updated_at":"2023-05-28T04:10:06.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":340,"chat_id":6,"user_id":319,"is_admin":0,"content":"hireig","created_at":"2023-05-28T08:51:20.000Z","updated_at":"2023-05-28T08:51:20.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":341,"chat_id":6,"user_id":319,"is_admin":0,"content":"lrthk","created_at":"2023-05-28T08:51:21.000Z","updated_at":"2023-05-28T08:51:21.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":342,"chat_id":6,"user_id":319,"is_admin":0,"content":"a b c","created_at":"2023-05-28T08:53:36.000Z","updated_at":"2023-05-28T08:53:36.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":343,"chat_id":6,"user_id":319,"is_admin":0,"content":"d e gg","created_at":"2023-05-28T08:53:37.000Z","updated_at":"2023-05-28T08:53:37.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":356,"chat_id":6,"user_id":319,"is_admin":1,"content":"abv","created_at":"2023-05-28T08:54:47.000Z","updated_at":"2023-05-28T08:54:47.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":357,"chat_id":6,"user_id":319,"is_admin":1,"content":"vsdvds","created_at":"2023-05-28T08:55:17.000Z","updated_at":"2023-05-28T08:55:17.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":358,"chat_id":6,"user_id":319,"is_admin":1,"content":"sdv","created_at":"2023-05-28T08:55:19.000Z","updated_at":"2023-05-28T08:55:19.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":381,"chat_id":6,"user_id":319,"is_admin":0,"content":"hi chi","created_at":"2023-05-28T09:03:13.000Z","updated_at":"2023-05-28T09:03:13.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":399,"chat_id":6,"user_id":319,"is_admin":0,"content":"alo em","created_at":"2023-05-28T09:04:50.000Z","updated_at":"2023-05-28T09:04:50.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"},{"id":400,"chat_id":6,"user_id":319,"is_admin":1,"content":"gi do","created_at":"2023-05-28T09:05:05.000Z","updated_at":"2023-05-28T09:05:05.000Z","deleted_at":null,"user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","username":"Nguyễn Trung Kiên"}]`));

  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', async () => {
        await getData()
      })
      socket.current.on('receive-admin-msg', params => {
        // setMess(prev=>[...prev, {...params, updated_at: moment(new Date()).format()}])
        setMess(prev => [...prev, { ...params }])
      })
    }
  }, [socket.current])

  async function getData() {
    let result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-overview`, currentUser)
    if (result.status === 200) {
      setIsReal(false)
      setData(result.data.data)
    }

    result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-helper`, currentUser)
    if (result.status === 200) {

      setProductCategory(result.data.product_category)
    }
    if (currentUser.id) {
      result = await get(`${process.env.REACT_APP_API_ENDPOINT}/message?user_id=${currentUser.id}`, currentUser)
      if (result.status === 200) {
        setMess(result.data.body)
      }
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const handleStop = () => {
  }
  useEffect(() => {
    messageRef.current?.scrollIntoView()
  }, [mess.length])

  async function sendMessage() {
    if (message !== "" && currentUser.id && currentUser.id !== 1) {
      let msg
      if (!mess.length) {
        msg = {
          is_admin: 0,
          content: message,
          user: currentUser.name,
          user_id: currentUser.id,
          isUpdatedLastMsg: true
        }
      } else {
        msg = {
          is_admin: 0,
          content: message,
          user: currentUser.name,
          user_id: currentUser.id,
          chat_id: mess[0].chat_id
        }
        setMess(prev =>
          [...prev, {
            chat_id: mess[0].chat_id,
            user_id: currentUser.id,
            is_admin: 0,
            content: message,
            updated_at: new Date()
          }])
      }
      socket.current.emit('client-send-msg', msg)
    }
    setMessage("");
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };

  const handleChangePage = id => {
    window.location.href = (`/product/${id}`)
  }

  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  return (
    <div>
      <Header />
      <div className="padding__main container">
        <div className='left-container'>
          <div className="head-m">Danh mục sản phẩm</div>
          <List sx={style} component="nav" aria-label="mailbox folders" className="homepage-sidebar">
            {
              productCategory.length && productCategory.map((item, index) => (

                <div key={index}>
                  <ListItem style={{ padding: '4px 5px' }} className="list-item-category">
                    <ListItemText style={{ cursor: 'pointer' }} primary={item.name} onClick={() => handleChangePage(item.id)} />
                  </ListItem>
                  <Divider />
                </div>
              ))
              || <></>
            }
          </List>
        </div>
        <div className='right-container'>
          <div className="chat">
            {check ?
              <img
                onClick={() => setCheck(!check)}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/512px-Facebook_Messenger_logo_2020.svg.png?20220118041828"
                alt=""
              />
              :
              <div className="chatbox">
                <div className="chatbox-header">
                  <div className="content">
                    Bạn cần giúp gì ?
                  </div>
                  <div className="close">
                    <CloseIcon onClick={() => setCheck(!check)} />
                  </div>
                </div>
                <div className="chat-container">
                  {
                    mess.map((item, index) =>
                      <div key={index} className={!item.is_admin ? "right item" : "left item"}>
                        <div className="content">
                          {item.content}
                          <div className='time'>
                            {moment(item.updated_at).format("DD/MM/YYYY HH:mm")}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {!mess.length ?
                    <div className="left item">
                      <div className="content">
                        Nếu bạn có bất cứ câu hỏi gì hoặc cần giúp đỡ thì hãy nhắn vào đây nhé.
                        Chúng tôi sẽ giúp đỡ bạn ngay lập tức!
                        Tổng đài hỗ trợ 24/24
                        Vui lòng đăng nhập để sử dụng tính năng này
                      </div>
                    </div>
                    :
                    <></>
                  }
                  <div ref={messageRef} />
                </div>
                <div className='chat-input'>
                  <input
                    style={{ width: "224px", height: "44px", borderRadius: "5px", border: "1px solid #ccc" }}
                    onKeyDown={onEnterPress}
                    value={message}
                    disabled={currentUser.id ? false : true}
                    onChange={e => setMessage(e.target.value)}
                    type="text"
                    placeholder="Nhập tin nhắn"
                  />
                  <Button
                    style={{ width: "70px", height: "44px" }}
                    onClick={sendMessage} variant="contained"
                    disabled={currentUser.id ? false : true}
                  >
                    Send
                  </Button>
                </div>
              </div>
            }
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
          <div className="without-backend" style={{ fontSize: "22px", padding: "10px 30px", color: "red" , border: "1px solid red", borderRadius: "10px"}}>Hiện tại hệ thống server đang được bảo trì nên một vài tính năng không thể sủ dụng được. Xin lỗi bạn vì sự bất tiện này, trên đây là giao diện demo của chúng tôi, vui lòng xem  <Link to={'/tutorial'}>
           Hướng dẫn sử dụng!
          </Link></div>
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <Link to={'/product/2000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm nổi bật</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.featured && data.featured.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product">
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div className="product-action">
                        <div className="product-time">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                            renderer={renderer}
                          />
                        </div>
                        <div className="product-vote">{item.auction_count} Lượt đấu giá</div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-detail">{item.title}</div>
                      <div className="product-price">
                        Khởi điểm: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price">
                        Giá hiện tại: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                      </div>
                    </div>
                  </Link>
                ))
                || <></>
              }
            </div>

          </div>
          {/* Sản phẩm mới nhất */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <Link to={'/product/1000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm mới nhất</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.latest && data.latest.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product" key={item.id}>
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div className="product-action">
                        <div className="product-time">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                            renderer={renderer}
                          />
                        </div>
                        <div className="product-vote">{item.auction_count} Lượt đấu giá</div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-detail">{item.title}</div>
                      <div className="product-price">
                        Khởi điểm: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price">
                        Giá hiện tại: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                      </div>
                    </div>
                  </Link>
                ))
                || <></>
              }
            </div>

          </div>
          {/* Sản phẩm siêu rẻ */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <Link to={'/product/3000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm siêu rẻ</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.cheap && data.cheap.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product" key={item.id}>
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div className="product-action">
                        <div className="product-time">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                            renderer={renderer}
                          />
                        </div>
                        <div className="product-vote">{item.auction_count} Lượt đấu giá</div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-detail">{item.title}</div>
                      <div className="product-price">
                        Khởi điểm: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price">
                        Giá hiện tại: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                      </div>
                    </div>
                  </Link>
                ))
                || <></>
              }
            </div>

          </div>
          {/* Sản phẩm sắp đấu giá */}
          <div className="product-part-wrapper">
            <div className="title-header">
              <b></b>
              <Link to={'/product/4000'} style={{ color: 'black', textDecoration: 'none' }}> <h2>Sản phẩm sắp đấu giá</h2></Link>
              <b></b>
            </div>
            <div className="product-wrapper">
              {
                data && data.incoming && data.incoming.map(item => (
                  <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="product" key={item.id}>
                      <div className="productImg">
                        <img src={item.image} alt="Product_Image" />
                      </div>
                      <div className="product-action">
                        <div className="product-time">
                          <Countdown
                            onComplete={() => handleStop()}
                            // onStop={()=>handleStop()}
                            date={moment(item.start_time)}
                            renderer={renderer}
                          />
                        </div>
                        <div className="product-vote">{item.auction_count} Lượt đấu giá</div>
                      </div>
                      <div className="product-name">{item.name}</div>
                      <div className="product-detail">{item.title}</div>
                      <div className="product-price">
                        Khởi điểm: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                      </div>
                      <div className="product-price">
                        Giá hiện tại: {new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                      </div>
                    </div>
                  </Link>
                ))
                || <></>
              }
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
