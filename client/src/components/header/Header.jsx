/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import './Header.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { get, post } from '../../utils/customRequest';
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/userSlice";
import Swal from 'sweetalert2';
import { checkApiResponse } from '../../utils/checkApiResponse';
import { tryParseJson } from '../../utils/common';
import { authenticate } from '../../utils/authenticate';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export const Header = ({ socket, systemConfig }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const openMenu = Boolean(anchorE2);
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(anchorE3);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  if (!systemConfig) {
    systemConfig = tryParseJson(localStorage.getItem('sytem_config'))?.data || {}
  }

  const handleClickOpenAuctionDialog = () => {
    setOpenAuctionDialog(true);
  };

  const handleCloseAuctionDialog = () => {
    setOpenAuctionDialog(false);
  };

  const handleSearch = () => {
    if (text !== '') {
      window.location.href = (`/products?sort=featured&category=all&name=${text}`)
    }
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleSearch();
    }
  };

  const handleProfileMenuOpen = (event) => {
    if (!currentUser.id) {
      window.location.href = '/login'
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleSubmitAuction = async () => {
    if(!feedback){
      return
    }
    setOpenAuctionDialog(false)
    if (authenticate(currentUser)) {
      return
    }
    let result = await post(`/auction/feedback`, {
      feedback
    }, currentUser)
    if (result.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Gửi Feedback thành công!',
        showConfirmButton: true,
        timer: 4000
      }).then(() => {
        setOpenAuctionDialog(false)
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Đã xảy ra lỗi',
        text: result.data.message,
        showConfirmButton: true,
      })
    }
    setFeedback('')
  };

  useEffect(() => {
    getData(currentUser.id)
  }, [currentUser.id])

  useEffect(() => {
    if (socket && socket.current) {
      socket.current.on('updateUI', async () => {
        // await getData(currentUser.id)
      })
    }
  }, [])

  async function getData(id) {
    if (id) {
      let result = await get(`/notification/${id}`, currentUser)
      if (checkApiResponse(result)) {
        setData(result.data.notification)
      }
    }

  }

  const handleNotificationMenuOpen = (event) => {
    if (!currentUser.id) {
      // window.location.href = './login'
    } else {
      setAnchorE3(event.currentTarget);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (target) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    if (target === 'profile') {
      window.location.href = `/user/${currentUser.id}`
    }
    if (target === 'logout') {
      localStorage.removeItem("system-config");
      localStorage.removeItem("product_category");
      dispatch(userSlice.actions.logout())
      Swal.fire({
        icon: 'success',
        title: 'Logout Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  };
  const handleNotificationClose = () => {
    setAnchorE3(null);
    handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const handleMenuClick = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorE2(null);
  };
  const handleGotoAuction = (id) => {
    window.location.href = `/auction/${id}`
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      style={{ marginTop: '30px' }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={() => handleMenuClose('')}
    >
      <MenuItem onClick={() => handleMenuClose('profile')}>Profile</MenuItem>
      <MenuItem onClick={() => handleMenuClose('')}>
        <Link style={{ textDecoration: "none", color: "black" }} to={"/management/dashboard"}>
          Management
        </Link>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose('')}>
        <Link style={{ textDecoration: "none", color: "black" }} to={"/english"}>
          English Test
        </Link>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose('logout')}>Logout</MenuItem>
    </Menu>
  );
  const renderNotification = (
    <Menu
      style={{ marginTop: '35px', marginLeft: '100px', maxHeight: '450px' }}
      anchorEl={anchorE3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationOpen}
      onClose={() => handleNotificationClose('')}
    >
      <div className='notification-container'>
        {
          data && data.length ?
            <>{data.map(item => (
              () => {
                switch (item.type) {
                  case 1:
                    return (
                      <div className='notification-item'>
                        <div className='notification-item-avatar'>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://e7.pngegg.com/pngimages/567/97/png-clipart-computer-icons-information-signal-miscellaneous-text.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1716652299/upload/em7dspu4e6fjcwberwua.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>From Admin</span> Chúc mừng, bạn đã thêm một phiên đấu giá mới
                        </div>
                      </div>
                    )
                    break;
                  case 2:
                    return (
                      <div className='notification-item'>
                        <div className='notification-item-avatar'>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://e7.pngegg.com/pngimages/567/97/png-clipart-computer-icons-information-signal-miscellaneous-text.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1716652299/upload/em7dspu4e6fjcwberwua.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>From Admin</span> Một sản phẩm của bạn đã hoàn thành đấu giá. Vui lòng xác nhận!
                        </div>
                      </div>
                    )
                    break;
                  case 3:
                    return (
                      <div className='notification-item'>
                        <div className='notification-item-avatar'>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://cdn-icons-png.flaticon.com/512/3983/3983618.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src={item.action_user_avatar}
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>{item.action_username}</span> đã đấu giá về một sản phẩm của bạn
                        </div>
                      </div>
                    )
                    break;
                  case 4:
                    return (
                      <div key={item.id} className='notification-item' onClick={() => handleGotoAuction(item.auction_id)}>
                        <div className='notification-item-avatar'>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src='https://cdn-icons-png.flaticon.com/512/7616/7616550.png' />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src={item.action_user_avatar} />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>{item.action_username}</span> đã có một đấu giá mới trong một phiên đấu giá mà bạn từng raise
                        </div>
                      </div>
                    )
                    break;
                  case 5:
                    return (
                      <div className='notification-item'>
                        <div className='notification-item-avatar'>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://e7.pngegg.com/pngimages/567/97/png-clipart-computer-icons-information-signal-miscellaneous-text.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1716652299/upload/em7dspu4e6fjcwberwua.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>From Admin</span> Bạn đã thắng cược một phiên đấu giá. Sản phẩm sẽ được người bán xác nhận !
                        </div>
                      </div>
                    )
                    break;
                  case 6:
                    return (
                      <div className='notification-item'>
                        <div className='notification-item-avatar'>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://e7.pngegg.com/pngimages/567/97/png-clipart-computer-icons-information-signal-miscellaneous-text.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1716652299/upload/em7dspu4e6fjcwberwua.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>From Admin</span> Người bán đã xác nhận bán sản phẩm. Vui lòng xác nhận lấy hàng!
                        </div>
                      </div>
                    )
                    break;
                  case 7:
                    return (
                      <div className='notification-item'>
                        <div className='notification-item-avatar'>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://www.citypng.com/public/uploads/preview/png-info-information-round-red-icon-symbol-11640517577hdkfkc5pnj.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1716652299/upload/em7dspu4e6fjcwberwua.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>From Admin</span> Tài khoản của bạn bị cảnh cáo vì có hành phi vi phạm chính sách của chúng tôi. Bạn sẽ không thể thêm hay đấu giá sản phẩm nữa!
                        </div>
                      </div>
                    )
                    break;
                  case 8:
                    return (
                      <div className='notification-item'>
                        <div className='notification-item-avatar'>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://www.citypng.com/public/uploads/preview/png-info-information-round-red-icon-symbol-11640517577hdkfkc5pnj.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1716652299/upload/em7dspu4e6fjcwberwua.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>From Admin</span> Chả có ai đấu giá sản phẩm của bạn hết. vui lòng đăng chi tiết thông tin của sản phẩm hoặc giảm giá đi nhé hehehe!
                        </div>
                      </div>
                    )
                    break;
                  case 9:
                    return (
                      <div key={item.id} className='notification-item' onClick={() => handleGotoAuction(item.auction_id)}>
                        <div className='notification-item-avatar'>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src='https://cdn-icons-png.flaticon.com/512/7616/7616550.png' />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src={item.action_user_avatar} />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>{item.action_username}</span> đã đấu giá một sản phẩm của bạn!!!
                        </div>
                      </div>
                    )
                    break;
                  case 10:
                    return (
                      <div key={item.id} className='notification-item' onClick={() => handleGotoAuction(item.auction_id)}>
                        <div className='notification-item-avatar'>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://www.citypng.com/public/uploads/preview/png-info-information-round-red-icon-symbol-11640517577hdkfkc5pnj.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1716652299/upload/em7dspu4e6fjcwberwua.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                        <span style={{ fontWeight: 'bold' }}>From Admin: </span>Phiên đấu giá của bạn sẽ được đội ngũ admin phê duyệt và đưa vào đấu giá
                        </div>
                      </div>
                    )
                    break;
                  case 11:
                    return (
                      <div key={item.id} className='notification-item' onClick={() => handleGotoAuction(item.auction_id)}>
                        <div className='notification-item-avatar'>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://www.citypng.com/public/uploads/preview/png-info-information-round-red-icon-symbol-11640517577hdkfkc5pnj.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1716652299/upload/em7dspu4e6fjcwberwua.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                        <span style={{ fontWeight: 'bold' }}>From Admin: </span>Sản phẩm của bạn đã được quản trị viên xét duyệt
                        </div>
                      </div>
                    )
                    break;
                  case 12:
                    return (
                      <div key={item.id} className='notification-item' onClick={() => handleGotoAuction(item.auction_id)}>
                        <div className='notification-item-avatar'>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <SmallAvatar alt="Avatar" src="https://www.citypng.com/public/uploads/preview/png-info-information-round-red-icon-symbol-11640517577hdkfkc5pnj.png" />
                            }
                          >
                            <Avatar
                              sx={{ width: 55, height: 55 }}
                              alt="Action"
                              src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1716652299/upload/em7dspu4e6fjcwberwua.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                        <span style={{ fontWeight: 'bold' }}>From Admin: </span> Sản phẩm của bạn đã bị đội ngũ quản trị viên từ chối đưa vào đấu giá. Nếu có thắc mắc thì hay nhắn tin cho hệ thống!
                        </div>
                      </div>
                    )
                    break;

                  default:
                    break;
                }
              })()
            )}

            </>
            :
            <div className='notification-item'>
              Bạn không có thông báo nào cả
            </div>
        }
      </div>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={data.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className='app-header' sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <AppBar position="static" className='app-header-wrapper'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorE2}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleCloseMenu}>
              <Link style={{ textDecoration: "none", color: "#d0011b" }} to={"/management/dashboard"}>
                Management
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link style={{ textDecoration: "none", color: "#d0011b" }} to={"/auctions"}>
                Auctions
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link style={{ textDecoration: "none", color: "#d0011b" }} to={"/new-auction"}>
                New Auction
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link style={{ textDecoration: "none", color: "#d0011b" }} to={"/introduce"}>
                Blogs
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link style={{ textDecoration: "none", color: "#d0011b" }} to={"/introduce"}>
                About Us
              </Link>
            </MenuItem>
            {/* <MenuItem onClick={handleCloseMenu}>Feature under development</MenuItem> */}
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: '#d0011b', fontSize: "28px", fontWeight: '550' }}>
              {/* {systemConfig.app_name || 'TIKA'} */}
              <div className="logo">
                <img src="/logo.png" alt="" />
              </div>
            </Link>
          </Typography>
          <Search
            sx={{ display: { xs: 'none', sm: 'block' } }}
            className='search-header'
          >
            <SearchIconWrapper>
              <SearchIcon
                style={{ cursor: 'pointer' }}
                onClick={() => handleSearch()}
              />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setText(e.target.value)}
              onKeyDown={onEnterPress}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }}>
            {/* <TargetTextWrapper style={{ fontSize: "22px" }}>
              {systemConfig.slogan}
            </TargetTextWrapper> */}
            <div className="header-component">
              {currentUser && currentUser.role && currentUser.role.admin ?
                <div className="item">
                  <Link to={"/management"} style={{ textDecoration: 'none', color: '#d0011b' }}>
                    Management
                  </Link>
                </div>
                : <></>}
              <div className="item">
                Home
              </div>
              <div className="item">
                <Link to={"/products"} style={{ textDecoration: 'none', color: '#d0011b' }}>
                  Auctions
                </Link>
              </div>
              <div className="item">
                <Link to={"/introduce"} style={{ textDecoration: 'none', color: '#d0011b' }}>
                  Blogs
                </Link>
              </div>
              <div className="item">
                <Link to={"/introduce"} style={{ textDecoration: 'none', color: '#d0011b' }}>
                  About Us
                </Link>
              </div>
             <>
             {
                currentUser && currentUser.id ? 
              <div className="item" onClick={handleClickOpenAuctionDialog}>
                Feedback
              </div>
              : <></>
              }
             </> 
            </div>
          </Box>
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={data.length} color="error" >
                <NotificationsIcon />
              </Badge >
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                alt="Avatar"
                src={currentUser.avatar}
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
          </Box>
          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotification}
      <Dialog open={openAuctionDialog} onClose={handleCloseAuctionDialog}>
        <DialogTitle>Gửi Feebback</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Những ý kiến đóng góp, góp ý của bạn sẽ giúp chúng tôi có những sửa đổi, cái tiến đề phù hợp hơn với người dùng. Chúng tôi cảm ơn những đóng góp của bạn!
          </DialogContentText>
          <TextField
            className='text-input text-input-95'
            id="standard-basic"
            multiline
            rows={8}
            maxRows={8}
            label="Feedback"
            variant="outlined"
            placeholder='Ý kiến, góp ý...'
            helperText='Không quá 1000 kí tự'
            onChange={e => setFeedback(e.target.value )}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAuctionDialog}>Hủy</Button>
          <Button onClick={handleSubmitAuction} >Gửi góp ý</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}