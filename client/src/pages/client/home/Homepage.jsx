import React from "react";
import { useState } from "react";
import { Header } from "../../../components/header/Header";
import "./Homepage.scss";
// import axios from "axios";
import { Link } from "react-router-dom";
import { Divider, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
// import InfiniteScroll from "react-infinite-scroll-component";


export const Homepage = () => {
  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  // const [mainData, setMainData] = useState([]);
  const [filter, setFilter] = useState('0')
  // const [page, setPage] = useState(1)
  // const [hasMore, setHasMore] = useState(true)
  // const [bOption, setBOption] = useState(false);

  // const [age, setAge] = useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  // const [height, setHeight] = useState(document.querySelector(".main")?.clientHight  || 840)
  // const displayHeight = document.querySelector(".main")?.clientHeight;
  // useEffect(() => {
  //   setHeight(displayHeight);
  // }, [displayHeight]);
  // useEffect(() => {
  //   const get = async () => {
  //     const result = await axios.get(`/v1/post/get_all?page=${page}`);
  //     if (result.data.data && result.data.data.length) {
  //       setMainData(prev => [...prev, ...result.data.data]);
  //     } else {
  //       setHasMore(false)
  //     }
  //   };
  //   get();
  // }, [page]);


  // async function handleFetching(){

  //   setPage(page+1)
  //   return
  // }
  return (
    <div>
      <Header />
      <div className="padding__main container">
        <div className='left-container'>
          <div className="head-m">Danh mục sản phẩm</div>
          <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="Đồng hồ & phụ kiện" />
            </ListItem>
            <Divider/>
          </List>
        </div>
        <div className='right-container'>
            <div className="chat">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/512px-Facebook_Messenger_logo_2020.svg.png?20220118041828"
                alt=""
              />
            </div>
          <div className="homepage-filter">
            {/* <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Lọc sản phẩm</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
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
          <div className="product-part-wrapper">
            <div className="head-l">
              Siêu rẻ
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
      </div>
    </div>
  );
};
