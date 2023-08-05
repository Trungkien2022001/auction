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

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { Avatar } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonGroup from '@mui/material/ButtonGroup';

import { THEME } from '../../../utils/constants'

import './Management.scss'
import { useState } from 'react';
import { Auction } from '../../../components/managements/auction/Auction';
import { ActionLog } from '../../../components/managements/actionLog/ActionLog';
import { useSelector } from 'react-redux';
import { User } from '../../../components/managements/user/User';
import { Chat } from '../../../components/managements/chat/Chat';
import { Chart } from '../../../components/managements/chart/Chart';
import { useLocation } from 'react-router-dom';
import { SystemConfig } from '../../../components/managements/systemConfig/SystemConfig';

const drawerWidth = 250;


export const Management = ({ socket }) => {
  const themes = THEME
  const currentUser = useSelector((state) => state.user);
  if (!currentUser || !currentUser.role.admin) {
    window.location.href = '/'
  }
  const location = useLocation();
  let type = location.pathname.split('/')[2]

  const [selectedTheme, setSelectedTheme] = useState(themes[14]);
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [themeOpen, setThemeOpen] = useState(false);
  const [englishNavOpen, setEnglishNavOpen] = useState(false);

  const handleChangePage = (t) => {
    switch (t) {
      case 'auction':
        window.location.href = `/management/auction`
        break;
      case 'dashboard':
        window.location.href = `/management/dashboard`
        break;

      case 'user':
        window.location.href = `/management/user`
        break;

      case 'chat':
        window.location.href = `/management/chat`
        break;

      case 'action-log':
        window.location.href = `/management/action-log`
        break;
      case 'system-config':
        window.location.href = `/management/system-config`
        break;

      default:
        break;
    }
  }

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

  const drawer = (
    <div>
      <List
        sx={{ width: drawerWidth, bgcolor: `${selectedTheme.backgroundColor}`, color: `${selectedTheme.textColor}`, height: 'calc(100vh - 17px)' }}
        component="nav"
      >
        <div className='profile-dashboard'>
          <Avatar className='avatar-dashboard'
            alt="Remy Sharp"
            // src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1667133652/upload/mfyfdkfy6e3279cpqyfu.png"
            // src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/avatar-trang-cuc-doc.jpg"
            src="https://kenh14cdn.com/thumb_w/620/2020/7/17/brvn-15950048783381206275371.jpg"
            // src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg"
            sx={{ width: 150, height: 150 }}
          />
          <div className='username-dashboard'>{currentUser.name}</div>
          <div className='username-dashboard-role'>{currentUser.role.description}</div>
        </div>
        <Divider />
        <ListItemButton
          onClick={() => handleChangePage('dashboard')}
          sx={type === 'dashboard' ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: `${selectedTheme.textColor}` }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        {currentUser.role.dashboard_auction ?
          <ListItemButton
            onClick={() => handleChangePage('auction')}
            sx={type === 'auction' ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
            <ListItemIcon>
              <HourglassTopIcon sx={{ color: `${selectedTheme.textColor}` }} />
            </ListItemIcon>
            <ListItemText primary="Auction" />
          </ListItemButton>
          : <></>
        }
        {currentUser.role.dashboard_user ?
          <ListItemButton
            onClick={() => handleChangePage('user')}
            sx={type === 'user' ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
            <ListItemIcon>
              <HourglassTopIcon sx={{ color: `${selectedTheme.textColor}` }} />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItemButton>
          : <></>
        }
        {currentUser.role.dashboard_chat ?
          <ListItemButton
            onClick={() => handleChangePage('chat')}
            sx={type === 'chat' ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
            <ListItemIcon>
              <HourglassTopIcon sx={{ color: `${selectedTheme.textColor}` }} />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
          : <></>
        }
        {currentUser.role.dashboard_action_log ?
          <ListItemButton
            onClick={() => handleChangePage('action-log')}
            sx={type === 'action-log' ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
            <ListItemIcon>
              <HourglassTopIcon sx={{ color: `${selectedTheme.textColor}` }} />
            </ListItemIcon>
            <ListItemText primary="Action Log" />
          </ListItemButton>
          : <></>
        }
        {currentUser.role.dashboard_config ?
          <ListItemButton
            onClick={() => handleChangePage('system-config')}
            sx={currentPage === 6 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
            <ListItemIcon>
              <HourglassTopIcon sx={{ color: `${selectedTheme.textColor}` }} />
            </ListItemIcon>
            <ListItemText primary="System config" />
          </ListItemButton>
          : <></>
        }
        <ListItemButton onClick={() => setEnglishNavOpen(!englishNavOpen)}>
          <ListItemIcon>
            <LocalLibraryIcon sx={{ color: `${selectedTheme.textColor}` }} />
          </ListItemIcon>
          <ListItemText primary="English" />
          {englishNavOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={englishNavOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={currentPage === 10 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(10)}>
              <ListItemIcon>
                <BookIcon sx={{ color: `${selectedTheme.textColor}` }} />
              </ListItemIcon>
              <ListItemText primary="English Word" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding sx={currentPage === 11 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleChangePage(11)}>
              <ListItemIcon>
                <BookmarkIcon sx={{ color: `${selectedTheme.textColor}` }} />
              </ListItemIcon>
              <ListItemText primary="Anh Viet Dictionary" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          onClick={() => handleChangePage(20)}
          sx={currentPage === 20 ? { bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
        >
          <ListItemIcon>
            <SettingsApplicationsIcon sx={{ color: `${selectedTheme.textColor}` }} />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItemButton>

        {/* <ListItemButton>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Admin setting" />
        </ListItemButton> */}

        <ListItemButton onClick={() => window.location.href = '/'}>
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
        <List>
          <ButtonGroup style={{ marginLeft: "52px", marginTop: "5px" }} variant="text" aria-label="text button group">
            <Button onClick={() => handleChangeTheme(-1)}><ArrowBackIosIcon /></Button>
            <Button onClick={handleClickOpenTheme}>Theme</Button>
            <Button onClick={() => handleChangeTheme(1)}><ArrowForwardIosIcon /></Button>
          </ButtonGroup>
        </List>
      </List>
    </div>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { xl: 'none' } }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { xl: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', xl: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', xl: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box style={{ padding: 0, margin: 0 }}
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >

        <div className='user-info-item'>
          {type === 'dashboard' || !type ? <Chart currentUser={currentUser} socket={socket} /> : <></>}
          {type === 'auction' ? <Auction currentUser={currentUser} socket={socket} /> : <></>}
          {type === 'user' ? <User currentUser={currentUser} socket={socket} /> : <></>}
          {type === 'action-log' ? <ActionLog currentUser={currentUser} socket={socket} /> : <></>}
          {type === 'chat' ? <Chat currentUser={currentUser} socket={socket} /> : <></>}
          {type === 'system-config' ? <SystemConfig currentUser={currentUser} socket={socket} /> : <></>}
        </div>
      </Box>
      <SimpleDialog
        selectedValue={selectedTheme}
        open={themeOpen}
        onClose={handleCloseTheme}
      />
    </Box>

  );
}

