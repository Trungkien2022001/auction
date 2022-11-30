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
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import './Header.scss'
import { useSelector } from 'react-redux';

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

export const Header = () => {
  const currentUser = useSelector(state=>state.user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [anchorE2, setAnchorE2] = React.useState(null);
  const openMenu = Boolean(anchorE2);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    if(!currentUser.id){
      window.location.href = './login'
    } else{
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (target) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    if(target === 'profile'){
      window.location.href = `/user/${currentUser.id}`
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorE2(null);
  };

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
      onClose={()=>handleMenuClose('')}
    >
      <MenuItem onClick={()=>handleMenuClose('profile')}>Profile</MenuItem>
      <MenuItem onClick={()=>handleMenuClose('')}>
        <Link style={{ textDecoration: "none", color: "black" }} to={"/management"}>
          Management
        </Link>
      </MenuItem>
      <MenuItem onClick={()=>handleMenuClose('')}>
        <Link style={{ textDecoration: "none", color: "black" }} to={"/english"}>
          English Test
        </Link>
      </MenuItem>
      <MenuItem onClick={()=>handleMenuClose('')}>Logout</MenuItem>
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
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: '#fff' }}>
              TIKA
            </Link>
          </Typography>
          <Search>
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
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error" >
                <NotificationsIcon />
              </Badge >
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
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}