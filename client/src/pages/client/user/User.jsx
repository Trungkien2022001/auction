import React, { useState } from 'react'
import { Header } from '../../../components/header/Header'
import './User.scss'
import { THEME } from '../../../utils/constants'
import MessageIcon from '@mui/icons-material/Message';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InputIcon from '@mui/icons-material/Input';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookIcon from '@mui/icons-material/Book';
import Divider from '@mui/material/Divider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import { Overview } from '../../../components/user/overview/Overview'
import { SaleHistory } from '../../../components/user/sale-history/SaleHistory';
import { BuyHistory } from '../../../components/user/buy-history/BuyHistory';
import { useSelector } from 'react-redux';

const drawerWidth = 250;

export const User = ({socket}) => {

  const themes = THEME
  const currentUser = useSelector((state) => state.user);
  const [selectedTheme, setSelectedTheme] = useState(themes[14]);
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [themeOpen, setThemeOpen] = useState(false);
  const [transactionNavOpen, setTransactionNavOpen] = useState(false);

  const handleClickOpenTheme = () => {
    setThemeOpen(true);
  };

  const handleCloseTheme = (value) => {
    setThemeOpen(false);
    setSelectedTheme(value);
  };

  const handleChangeTheme = (type) => {
    if (type === 1) {
      if (selectedTheme.id < themes.length - 1) {
        setSelectedTheme(themes[selectedTheme.id + 1])
      }
    } else {
      if (selectedTheme.id) {
        setSelectedTheme(themes[selectedTheme.id - 1])
      }
    }
  }

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle style={{ textAlign: 'center', fontWeight: '700' }}>Select Theme</DialogTitle>
        <List sx={{ pt: 0 }}>

          {themes.map((theme) => (
            <ListItem button onClick={() => handleListItemClick(theme)} key={theme.id} style={{ textAlign: 'center', backgroundColor: `${theme.backgroundColor}` }}>
              <ListItemText primary={theme.name} sx={{ color: `${theme.textColor}`, width: 300 }} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
  };
  return (
    <div>
      <Header />
      <div className='user-info-container'>
        <div onClick={() => handleDrawerToggle()} className='user-info-sidebar-open'>
          <KeyboardDoubleArrowRightIcon />
        </div>
        {mobileOpen ?
          <div className='user-info-sidebar-mobile'>
            <div onClick={() => handleDrawerToggle()} className='user-info-sidebar-close'>
              <div className='user-info-close-sidebar'>
                <KeyboardDoubleArrowLeftIcon />
              </div>
            </div>
            <List className='user-drawer'
              sx={{ width: drawerWidth, bgcolor: `${selectedTheme.backgroundColor}`, color: `${selectedTheme.textColor}` }}
              component="nav"
            >
              <div className='profile-dashboard'>
                <Avatar className='avatar-dashboard'
                  alt="avatar"
                  src={currentUser.avatar}
                  sx={{ width: 150, height: 150 }}
                />
                <div className='username-dashboard'>Trung Kiên</div>
                <div className='username-dashboard-role'>Administrator</div>
              </div>
              <Divider />
              <ListItemButton
                onClick={() => setCurrentPage(1)}
                sx={currentPage === 1 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
              >
                <ListItemIcon>
                  <DashboardIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Tổng quan" />
              </ListItemButton>
              <ListItemButton onClick={() => setTransactionNavOpen(!transactionNavOpen)}>
                <ListItemIcon>
                  <LocalLibraryIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Giao dịch" />
                {transactionNavOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={transactionNavOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={currentPage === 2 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(2)}>
                    <ListItemIcon>
                      <BookIcon sx={{ color: `${selectedTheme.textColor}` }} />
                    </ListItemIcon>
                    <ListItemText primary="Mua" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding sx={currentPage === 3 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(3)}>
                    <ListItemIcon>
                      <BookmarkIcon sx={{ color: `${selectedTheme.textColor}` }} />
                    </ListItemIcon>
                    <ListItemText primary="Bán" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => setCurrentPage(4)}
                sx={currentPage === 4 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
              >
                <ListItemIcon>
                  <MessageIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Tin nhắn" />
              </ListItemButton>
              <ListItemButton
                onClick={() => setCurrentPage(20)}
                sx={currentPage === 20 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
              >
                <ListItemIcon>
                  <SettingsApplicationsIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Setting" />
              </ListItemButton>
              <ListItemButton onClick={() => window.location.href = './'}>
                <ListItemIcon>
                  <HomeIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Back to homepage" />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <InputIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
              <Divider />
              <List className='theme-select'>
                <ButtonGroup style={{ marginLeft: "52px", marginTop: "5px" }} variant="text" aria-label="text button group">
                  <Button onClick={() => handleChangeTheme(-1)}><ArrowBackIosIcon /></Button>
                  <Button onClick={handleClickOpenTheme}>Theme</Button>
                  <Button onClick={() => handleChangeTheme(1)}><ArrowForwardIosIcon /></Button>
                </ButtonGroup>
              </List>
            </List>
          </div>
          :
          <div className='user-info-sidebar'>
            <List className='user-drawer'
              sx={{ width: drawerWidth, bgcolor: `${selectedTheme.backgroundColor}`, color: `${selectedTheme.textColor}` }}
              component="nav"
            >
              <div className='profile-dashboard'>
                <Avatar className='avatar-dashboard'
                  alt="Remy Sharp"
                  src={currentUser.avatar}
                  sx={{ width: 150, height: 150 }}
                />
                <div className='username-dashboard'>{currentUser.username}</div>
                <div className='username-dashboard-role'>{currentUser.role_id}</div>
              </div>
              <Divider />
              <ListItemButton
                onClick={() => setCurrentPage(1)}
                sx={currentPage === 1 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
              >
                <ListItemIcon>
                  <DashboardIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Tổng quan" />
              </ListItemButton>
              <ListItemButton onClick={() => setTransactionNavOpen(!transactionNavOpen)}>
                <ListItemIcon>
                  <LocalLibraryIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Giao dịch" />
                {transactionNavOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={transactionNavOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={currentPage === 2 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(2)}>
                    <ListItemIcon>
                      <BookIcon sx={{ color: `${selectedTheme.textColor}` }} />
                    </ListItemIcon>
                    <ListItemText primary="Mua" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding sx={currentPage === 3 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(3)}>
                    <ListItemIcon>
                      <BookmarkIcon sx={{ color: `${selectedTheme.textColor}` }} />
                    </ListItemIcon>
                    <ListItemText primary="Bán" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => setCurrentPage(4)}
                sx={currentPage === 4 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
              >
                <ListItemIcon>
                  <MessageIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Tin nhắn" />
              </ListItemButton>
              <ListItemButton
                onClick={() => setCurrentPage(20)}
                sx={currentPage === 20 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
              >
                <ListItemIcon>
                  <SettingsApplicationsIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Setting" />
              </ListItemButton>
              <ListItemButton onClick={() => window.location.href = './'}>
                <ListItemIcon>
                  <HomeIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Back to homepage" />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <InputIcon sx={{ color: `${selectedTheme.textColor}` }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
              <Divider />
              <List className='theme-select'>
                <ButtonGroup style={{ marginLeft: "52px", marginTop: "5px" }} variant="text" aria-label="text button group">
                  <Button onClick={() => handleChangeTheme(-1)}><ArrowBackIosIcon /></Button>
                  <Button onClick={handleClickOpenTheme}>Theme</Button>
                  <Button onClick={() => handleChangeTheme(1)}><ArrowForwardIosIcon /></Button>
                </ButtonGroup>
              </List>
            </List>
          </div>
        }
        <div className='user-info-item'>
          {currentPage === 1 ? <Overview currentUser={currentUser} socket = {socket}/> : <></>}
          {currentPage === 2 ? <BuyHistory currentUser={currentUser} socket = {socket}/> : <></>}
          {currentPage === 3 ? <SaleHistory currentUser={currentUser} socket = {socket}/> : <></>}
        </div>
      </div>
      <SimpleDialog
        selectedValue={selectedTheme}
        open={themeOpen}
        onClose={handleCloseTheme}
      />
    </div>
  )
}
