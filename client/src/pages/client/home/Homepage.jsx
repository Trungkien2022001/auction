/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useState } from "react";
import { Header } from "../../../components/header/Header";
import "./Homepage.scss";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button } from "@mui/material";
import { useEffect } from "react";
import { get } from "../../../utils/customRequest";
import { useSelector } from "react-redux";
import { Footer } from "../../../components/footer/Footer";
import moment from "moment";
import { PRODUCT_CATEGORY } from "../../../utils/constants";
import 'react-loading-skeleton/dist/skeleton.css'
import { CustomSlider } from "../../../components/slider/Slider";
import _ from 'lodash';
import { ProductComponent } from "../../../components/product/ProductComponent";
import Skeleton from "react-loading-skeleton";
import { checkApiResponse } from "../../../utils/checkApiResponse";
import { tryParseJson } from "../../../utils/common";


export const Homepage = ({ socket }) => {
  const messageRef = useRef();
  const currentUser = useSelector(state => state.user)
  const [data, setData] = useState({})
  const [productCategory, setProductCategory] = useState([]);
  const [sytemConfig, setSytemConfig] = useState({});
  const [check, setCheck] = useState(true)
  const [message, setMessage] = useState("");
  const [mess, setMess] = useState([]);
  const [loading, setLoading] = useState(true)
  const [loadingMeta, setLoadingMeta] = useState(true)
  const [preLoading, setPreLoading] = useState(false)
  const [preLoadingMeta, setPreLoadingMeta] = useState(false)

  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', async () => {
        // await getData()
      })
      socket.current.on('receive-admin-msg', params => {
        // setMess(prev=>[...prev, {...params, updated_at: moment(new Date()).format()}])
        setMess(prev => [...prev, { ...params }])
      })
    }
  }, [socket.current])

  async function getData() {
    setLoading(true)
    setPreLoading(false)
    const f = async () => {
      const result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-overview`, currentUser)
      if (checkApiResponse(result)) {
        setData(result.data.data)
      }
      setPreLoading(true)
    }
    const delayPromise = new Promise((resolve) => setTimeout(resolve, process.env.HOMEPAGE_WAIT_TIME || 3500));
    await Promise.all([f(), delayPromise])
    setLoading(false)
  }

  async function getMetaData() {
    setLoadingMeta(true)
    setPreLoadingMeta(false)
    const f = async () => {
      let tmp_product_category = tryParseJson(localStorage.getItem('product_category'))
      let tmp_banner_image = tryParseJson(localStorage.getItem('sytem_config'))
      if (
        !tmp_product_category ||
        !tmp_banner_image ||
        moment().diff(moment(tmp_product_category.created_at), 'days') > 1 ||
        moment().diff(moment(tmp_banner_image.created_at), 'days') > 1
      ) {
        let result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-helper`, currentUser)
        if (checkApiResponse(result)) {
          setProductCategory(result.data.product_category)
          setSytemConfig(result.data.system_config)
          localStorage.setItem('product_category', JSON.stringify({ data: result.data.product_category, created_at: moment().format() }));
          localStorage.setItem('system_config', JSON.stringify({ data: result.data.system_config, created_at: moment().format() }));
        }

      } else {
        setProductCategory(tmp_product_category.data)
        setSytemConfig(tmp_banner_image.data)
      }
      setPreLoadingMeta(true)
      if (currentUser.id) {
        let result = await get(`${process.env.REACT_APP_API_ENDPOINT}/message?user_id=${currentUser.id}`, currentUser)
        if (checkApiResponse(result)) {
          setMess(result.data.body)
        }
      }
    }
    const delayPromise = new Promise((resolve) => setTimeout(resolve, process.env.HOMEPAGE_METADATA_WAIT_TIME || 2500));
    await Promise.all([f(), delayPromise])
    setLoadingMeta(false)
  }
  useEffect(() => {
    getData()
    getMetaData()
  }, [])
  useEffect(() => {
    messageRef.current?.scrollIntoView()
  }, [mess.length])

  const handleChangePage = id => {
    window.location.href = (`/products?sort=featured&category=${PRODUCT_CATEGORY[id]}`)
  }

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
        setMess([{
          chat_id: 1,
          user_id: currentUser.id,
          is_admin: 0,
          content: message,
          updated_at: new Date()
        }])
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

  return (
    <div>
      <Header socket={socket} systemConfig={sytemConfig}/>
      <CustomSlider loading={loadingMeta} images={sytemConfig.banner_image} />
      <div className="padding__main homepage-container">
        {
          loadingMeta ?
            <div className="product-category">
              <div className="product-category-header">
                <Skeleton width={250} height={30} />
              </div>
              <div style={{ width: "100%" }}>
                <Skeleton width={"100%"} height={110} />
                <Skeleton width={"100%"} height={110} style={{ marginTop: "12px" }} />
              </div>
            </div>
            :
            <div className="product-category">
              <div className="product-category-header">
                Danh mục sản phẩm
              </div>
              <div className="product-category-wrapper">
                {
                  productCategory.length && _.chunk(productCategory, 2).map((item, index) => (
                    <div className="group-category" key={index}>
                      <div className="product-category-item" onClick={() => handleChangePage(item[0].id)}>
                        <div className="product-category-image">
                          <Avatar sx={{ width: 70, height: 70 }} alt="" src={item[0].image} />
                        </div>
                        <div className="product-category-title">
                          {item[0].name}
                        </div>
                      </div>
                      {item[1] ?
                        <div className="product-category-item">
                          <div className="product-category-image">
                            <Avatar sx={{ width: 70, height: 70 }} alt="" src={item[1].image} onClick={() => handleChangePage(item[1].id)} />
                          </div>
                          <div className="product-category-title">
                            {item[1].name}
                          </div>
                        </div> :
                        <></>
                      }

                    </div>
                  ))
                  || <></>
                }
              </div>
            </div>
        }

        <ProductComponent data={data.featured} title={'Sản phẩm nổi bật'} loading={loading} keyword={'featured'} />
        <ProductComponent data={data.latest} title={'Sản phẩm mới nhất'} loading={loading} keyword={'latest'} />
        <ProductComponent data={data.cheap} title={'Sản phẩm siêu rẻ'} loading={loading} keyword={'cheapest'} />
        <ProductComponent data={data.expensive} title={'Sản phẩm cao cấp'} loading={loading} keyword={'expensive'} />
        <ProductComponent data={data.incoming} title={'Sản phẩm sắp đấu giá'} loading={loading} keyword={'incoming'} />
        <div className="chat">
          {check ?
            <img className="chat-icon"
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
              src="https://media.istockphoto.com/id/1437225090/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-pop-m%E1%BB%9Bi-s%E1%BA%A3n-ph%E1%BA%A9m-m%E1%BB%9Bi-khuy%E1%BA%BFn-m%C3%A3i-%C4%91%E1%BA%B7t-vect%C6%A1.jpg?s=2048x2048&w=is&k=20&c=Y16uTx7wkfTGLZzKYsRbogVMpzcU9k-LiTqA9euXYRQ="
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="tmp">
        {
          preLoading && data ? _.flatten(Object.keys(data).map((item) => data[item].map(p => p.image))).map((item, index) =>
            <div key={index}>
              <img style={{ display: 'none' }} rel="prefetch" src={item} alt="Product_Image" />
            </div>
          ) : <></>
        }
        {
          preLoadingMeta && productCategory && productCategory.length ? productCategory.map((item, index) =>
            <div key={index}>
              <img style={{ display: 'none' }} rel="prefetch" src={item.image} alt="Product_Image" />
            </div>
          ) : <></>
        }
      </div>
      <Footer systemConfig={sytemConfig}/>
    </div >
  );
};
