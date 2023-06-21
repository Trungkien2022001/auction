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
import { Avatar } from '@mui/material';
import './Header.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../../utils/customRequest';
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/userSlice";
import Swal from 'sweetalert2';

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
const TargetTextWrapper = styled('div')(({ theme }) => ({
  width: '1000px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('xl')]: {
    display: 'none'
  },
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

export const Header = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [data, setData] = useState(JSON.parse(`[{"id":234,"auction_id":45,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-06-08T13:43:42.000Z"},{"id":233,"auction_id":26,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-06-08T13:29:49.000Z"},{"id":232,"auction_id":37,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T04:11:27.000Z"},{"id":230,"auction_id":26,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T04:10:40.000Z"},{"id":229,"auction_id":37,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T04:10:39.000Z"},{"id":228,"auction_id":37,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T03:39:29.000Z"},{"id":227,"auction_id":37,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T03:37:06.000Z"},{"id":226,"auction_id":37,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T03:36:58.000Z"},{"id":225,"auction_id":37,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T03:36:36.000Z"},{"id":224,"auction_id":37,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T03:36:32.000Z"},{"id":223,"auction_id":37,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T03:14:41.000Z"},{"id":222,"auction_id":26,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T03:05:14.000Z"},{"id":221,"auction_id":26,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T03:04:55.000Z"},{"id":218,"auction_id":40,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T02:19:16.000Z"},{"id":217,"auction_id":26,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-19T02:19:13.000Z"},{"id":211,"auction_id":40,"type":8,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-05-18T15:34:50.000Z"},{"id":204,"auction_id":39,"type":4,"action_user_id":323,"action_username":"Kien","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-03-24T01:42:00.000Z"},{"id":202,"auction_id":31,"type":4,"action_user_id":323,"action_username":"Kien","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-03-24T01:34:39.000Z"},{"id":200,"auction_id":32,"type":4,"action_user_id":329,"action_username":"Phạm đình thiên","action_user_avatar":"http://res.cloudinary.com/trungkien2022001/image/upload/v1670991270/upload/igfp2hdm4pbupswo1jvd.jpg","updated_at":"2023-02-24T02:03:03.000Z"},{"id":193,"auction_id":37,"type":2,"action_user_id":327,"action_username":"Phạm Thị Diệu Linh","action_user_avatar":"http://res.cloudinary.com/trungkien2022001/image/upload/v1670765936/upload/ak95nj29imkav2ulzctn.jpg","updated_at":"2023-02-23T16:54:00.000Z"},{"id":188,"auction_id":27,"type":2,"action_user_id":317,"action_username":"kiennt","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2023-02-19T02:04:00.000Z"},{"id":22,"auction_id":10,"type":4,"action_user_id":327,"action_username":"Phạm Thị Diệu Linh","action_user_avatar":"http://res.cloudinary.com/trungkien2022001/image/upload/v1670765936/upload/ak95nj29imkav2ulzctn.jpg","updated_at":"2023-01-06T16:15:40.000Z"},{"id":185,"auction_id":25,"type":2,"action_user_id":324,"action_username":"Đỗ Thị Nhung","action_user_avatar":"http://res.cloudinary.com/trungkien2022001/image/upload/v1669568892/upload/nbo9dpvsptdmtn8ngqsl.jpg","updated_at":"2022-12-17T01:55:00.000Z"},{"id":184,"auction_id":22,"type":4,"action_user_id":324,"action_username":"Đỗ Thị Nhung","action_user_avatar":"http://res.cloudinary.com/trungkien2022001/image/upload/v1669568892/upload/nbo9dpvsptdmtn8ngqsl.jpg","updated_at":"2022-12-16T15:48:00.000Z"},{"id":181,"auction_id":15,"type":2,"action_user_id":324,"action_username":"Đỗ Thị Nhung","action_user_avatar":"http://res.cloudinary.com/trungkien2022001/image/upload/v1669568892/upload/nbo9dpvsptdmtn8ngqsl.jpg","updated_at":"2022-12-16T15:25:00.000Z"},{"id":5,"auction_id":6,"type":4,"action_user_id":324,"action_username":"Đỗ Thị Nhung","action_user_avatar":"http://res.cloudinary.com/trungkien2022001/image/upload/v1669568892/upload/nbo9dpvsptdmtn8ngqsl.jpg","updated_at":"2022-12-16T13:16:55.000Z"},{"id":179,"auction_id":3,"type":2,"action_user_id":317,"action_username":"kiennt","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2022-12-15T17:00:00.000Z"},{"id":177,"auction_id":13,"type":4,"action_user_id":317,"action_username":"kiennt","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2022-12-15T11:07:30.000Z"},{"id":174,"auction_id":11,"type":4,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2022-12-15T10:28:00.000Z"},{"id":173,"auction_id":11,"type":2,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2022-12-15T10:28:00.000Z"},{"id":172,"auction_id":11,"type":4,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2022-12-15T10:25:25.000Z"},{"id":171,"auction_id":11,"type":2,"action_user_id":319,"action_username":"Nguyễn Trung Kiên","action_user_avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","updated_at":"2022-12-15T10:25:25.000Z"},{"id":17,"auction_id":1,"type":4,"action_user_id":324,"action_username":"Đỗ Thị Nhung","action_user_avatar":"http://res.cloudinary.com/trungkien2022001/image/upload/v1669568892/upload/nbo9dpvsptdmtn8ngqsl.jpg","updated_at":"2022-12-11T14:50:43.000Z"},{"id":7,"auction_id":2,"type":4,"action_user_id":324,"action_username":"Đỗ Thị Nhung","action_user_avatar":"http://res.cloudinary.com/trungkien2022001/image/upload/v1669568892/upload/nbo9dpvsptdmtn8ngqsl.jpg","updated_at":"2022-12-11T14:19:49.000Z"}]`))
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const openMenu = Boolean(anchorE2);
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(anchorE3);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    if (!currentUser.id) {
      window.location.href = '/login'
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  useEffect(() => {
    if (currentUser.id) {
      getData(currentUser.id)
    }
  }, [currentUser.id])

  async function getData(id) {
    let result = await get(`${process.env.REACT_APP_API_ENDPOINT}/notification/${id}`, currentUser)
    if (result.status === 200) {
      setData(result.data.notification)
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
    if (target === 'logout'){
      dispatch(userSlice.actions.logout())  
      Swal.fire({
        icon: 'success',
        title: 'Login Successfully',
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
        <Link style={{ textDecoration: "none", color: "black" }} to={"/management"}>
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
                              src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
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
                              src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
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
                              src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
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
                              src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
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
                              src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
                            />
                          </Badge>
                        </div>
                        <div className='notification-item-content'>
                          <span style={{ fontWeight: 'bold' }}>From Admin</span> Tài khoản của bạn bị cảnh cáo vì có hành phi vi phạm chính sách của chúng tôi. Bạn sẽ không thể thêm hay đấu giá sản phẩm nữa!
                        </div>
                      </div>
                    )
                    break;

                  default:
                    break;
                }
              })()
            )}
              {/* <div className='notification-item'>
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
                      src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
                    />
                  </Badge>
                </div>
                <div className='notification-item-content'>
                  <span style={{ fontWeight: 'bold' }}>From Admin</span> Chúc mừng, bạn đã thêm một phiên đấu giá mới
                </div>
              </div> */}
              {/* <div className='notification-item'>
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
                      src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
                    />
                  </Badge>
                </div>
                <div className='notification-item-content'>
                  <span style={{ fontWeight: 'bold' }}>From Admin</span> Một sản phẩm của bạn đã hoàn thành đấu giá. Vui lòng xác nhận!
                </div>
              </div> */}
              {/* <div className='notification-item'>
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
                      src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
                    />
                  </Badge>
                </div>
                <div className='notification-item-content'>
                  <span style={{ fontWeight: 'bold' }}>From Admin</span> Bạn đã thắng cược một phiên đấu giá. Sản phẩm sẽ được người bán xác nhận !
                </div>
              </div> */}
              {/* <div className='notification-item'>
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
                      src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
                    />
                  </Badge>
                </div>
                <div className='notification-item-content'>
                  <span style={{ fontWeight: 'bold' }}>From Admin</span> Người bán đã xác nhận bán sản phẩm. Vui lòng xác nhận lấy hàng!
                </div>
              </div> */}
              {/* <div className='notification-item'>
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
                      src="https://decg5lu73tfmh.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m_v_1501069185.png"
                    />
                  </Badge>
                </div>
                <div className='notification-item-content'>
                  <span style={{ fontWeight: 'bold' }}>From Admin</span> Tài khoản của bạn bị cảnh cáo vì có hành phi vi phạm chính sách của chúng tôi. Bạn sẽ không thể thêm hay đấu giá sản phẩm nữa!
                </div>
              </div> */}
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
          <Badge badgeContent={4} color="error">
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
          <Badge badgeContent={17} color="error">
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
      <AppBar position="static">
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
              <Link style={{ textDecoration: "none", color: "black" }} to={"/management"}>
                Management
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link style={{ textDecoration: "none", color: "black" }} to={"/english"}>
                English Test
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>Feature under development</MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: '#fff' }}>
              TIKA
            </Link>
          </Typography>
          <Search
          sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }}>
            <TargetTextWrapper>
              {/* trang này không tồn tại, trang này không tồn tại trang này không tồn tại, trang này không tồn tại, trang này không tồn tại, trang này không tồn */}
              Trang web đấu giá hàng đầu Việt Nam, bạn cần mua, chúng tôi có, hahaha
            </TargetTextWrapper>
          </Box>
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={17} color="error" >
                <NotificationsIcon />
              </Badge >
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
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
    </Box>
  );
}