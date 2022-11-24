import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputIcon from '@mui/icons-material/Input';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookIcon from '@mui/icons-material/Book';
import QuizIcon from '@mui/icons-material/Quiz';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AbcIcon from '@mui/icons-material/Abc';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonGroup from '@mui/material/ButtonGroup';

import './Management.scss'
import { useState } from 'react';

const drawerWidth = 250;


export const Management = ({ page = 4 }) => {
  const themes = [
    {
      id: 0,
      name: 'Magenta',
      backgroundColor: '#fad2e3',
      textColor: 'black',
      subItemColor: '#f37fb7',
      selectedItemColor:'#cb2b83'
    },
    {
      id: 1,
      name: 'Golden Purple',
      backgroundColor: '#ebd7fa',
      textColor: 'black',
      subItemColor: '#ab7ae0',
      selectedItemColor:'#642ab5'
    },
    {
      id: 2,
      name: 'Dust Red',
      backgroundColor: '#fac8c3',
      textColor: 'black',
      subItemColor: '#f37370',
      selectedItemColor:'#d32029'
    },
    {
      id: 3,
      name: 'Vocano',
      backgroundColor: '#fad4bc',
      textColor: 'black',
      subItemColor: '#f3956a',
      selectedItemColor:'#d84a1b'
    },
    {
      id: 4,
      name: 'Orange',
      backgroundColor: '#fae3b7',
      textColor: 'black',
      subItemColor: '#f3b765',
      selectedItemColor:'#d87a16'
    },
    {
      id: 5,
      name: 'Calendula Gold',
      backgroundColor: '#faedb5',
      textColor: 'black',
      subItemColor: '#f3cc62',
      selectedItemColor:'#d89614'
    },
    {
      id: 6,
      name: 'Sunrise Yellow',
      backgroundColor: '#fafab5',
      textColor: 'black',
      subItemColor: '#f3ea62',
      selectedItemColor:'#d8bd14'
    },
    {
      id: 7,
      name: 'Lime',
      backgroundColor: '#f0fab5',
      textColor: 'black',
      subItemColor: '#c9e75d',
      selectedItemColor:'#8bbb11'
    },
    {
      id: 8,
      name: 'Polar Green',
      backgroundColor: '#d5f2bb',
      textColor: 'black',
      subItemColor: '#8fd460',
      selectedItemColor:'#49aa19'
    },
    {
      id: 9,
      name: 'Cyan',
      backgroundColor: '#b2f1e8',
      textColor: 'black',
      subItemColor: '#58d1c9',
      selectedItemColor:'#13a8a8'
    },
    {
      id: 10,
      name: 'Daybreak Blue',
      backgroundColor: '#b7e3fa',
      textColor: 'black',
      subItemColor: '#65b7f3',
      selectedItemColor:'#177ddc'
    },
    {
      id: 11,
      name: 'Geek Blue',
      backgroundColor: '#d2e0fa',
      textColor: 'black',
      subItemColor: '#7f9ef3',
      selectedItemColor:'#2b4acb'
    },
    {
      id: 12,
      name: 'Light Theme',
      backgroundColor: '#fff',
      textColor: 'black',
      subItemColor: '#dadada',
      selectedItemColor:'#ababab'
    },
    {
      id: 13,
      name: 'Default Theme',
      backgroundColor: '#DADADA',
      textColor: 'black',
      subItemColor: '#F1F1F1',
      selectedItemColor:'#484848'
    },
    {
      id: 14,
      name: 'Dark Theme',
      backgroundColor: '#161d40',
      textColor: 'rgb(255, 255, 255)',
      subItemColor: '#203175',
      selectedItemColor:'#2b4acb'
    },
    {
      id: 15,
      name: 'Dust Red',
      backgroundColor: '#2a1215',
      textColor: 'rgb(255, 255, 255)',
      subItemColor: '#58181c',
      selectedItemColor:'#a61d24'
    },
    {
      id: 16,
      name: 'Vocalno',
      backgroundColor: '#2b1611',
      textColor: 'rgb(255, 255, 255)',
      subItemColor: '#592716',
      selectedItemColor:'#aa3e19'
    }, 
    {
      id: 17,
      name: 'Sunset',
      backgroundColor: '#2b1d11',
      textColor: 'white',
      subItemColor: '#593815',
      selectedItemColor:'#aa6215'
    },
    {
      id: 18,
      name: 'Calendula Gold',
      backgroundColor: '#2b2111',
      textColor: 'rgb(255, 255, 255)',
      subItemColor: '#594214',
      selectedItemColor:'#aa7714'
    },
    {
      id: 19,
      name: 'Sunrise Yellow',
      backgroundColor: '#2b2611',
      textColor: 'white',
      subItemColor: '#595014',
      selectedItemColor:'#aa9514'
    },
    {
      id: 20,
      name: 'Lime',
      backgroundColor: '#1f2611',
      textColor: 'white',
      subItemColor: '#3e4f13',
      selectedItemColor:'#6f9412'
    },
    {
      id: 21,
      name: 'Plar Green',
      backgroundColor: '#162312',
      textColor: 'white',
      subItemColor: '#274916',
      selectedItemColor:'#3c8618'
    },
    {
      id: 22,
      name: 'Cyan',
      backgroundColor: '#112123',
      textColor: 'rgb(255, 255, 255)',
      subItemColor: '#144848',
      selectedItemColor:'#138585'
    },
    {
      id: 23,
      name: 'Daybreak Blue',
      backgroundColor: '#291321',
      textColor: 'rgb(255, 255, 255)',
      subItemColor: '#551c3b',
      selectedItemColor:'#a02669'
    }, 
    {
      id: 24,
      name: 'Geek Blue',
      backgroundColor: '#161d40',
      textColor: 'rgb(255, 255, 255)',
      subItemColor: '#203175',
      selectedItemColor:'#2b4acb'
    },
    {
      id: 25,
      name: 'Golden Blue',
      backgroundColor: '#1a1325',
      textColor: 'rgb(255, 255, 255)',
      subItemColor: '#301c4d',
      selectedItemColor:'#51258f'
    },
    {
      id: 26,
      name: 'Magenta',
      backgroundColor: '#291321',
      textColor: 'rgb(255, 255, 255)',
      subItemColor: '#551c3b',
      selectedItemColor:'#a02669'
    },
  ];
  
  const [selectedTheme, setSelectedTheme] = useState(themes[14]);
  const [currentPage, setCurrentPage] = useState(page)
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [imageNavOpen, setImageNavOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [englishNavOpen, setEnglishNavOpen] = useState(false);
  const [entertainmenttNavOpen, setEntertainmenttNavOpen] = useState(false);

  const handleClickOpenTheme = () => {
    setThemeOpen(true);
  };

  const handleCloseTheme = (value) => {
    setThemeOpen(false);
    setSelectedTheme(value);
  };

  const handleChangeTheme = (type) => {
    if(type === 1){
      if(selectedTheme.id < themes.length - 1){
          setSelectedTheme(themes[selectedTheme.id + 1])
      }
    } else {
      if(selectedTheme.id){
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
        <DialogTitle style={{textAlign: 'center', fontWeight: '700'}}>Select Theme</DialogTitle>
        <List sx={{ pt: 0 }}>
            
          {themes.map((theme) => (
            <ListItem button onClick={() => handleListItemClick(theme)} key={theme.id} style={{textAlign: 'center', backgroundColor: `${theme.backgroundColor}`}}>
              <ListItemText primary={theme.name} sx={{color: `${theme.textColor}`, width: 300}}/>
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
        sx={{ width: drawerWidth, bgcolor: `${selectedTheme.backgroundColor}`, color : `${selectedTheme.textColor}`} }
        component="nav"
      >
        <div className='profile-dashboard'>
          <Avatar className='avatar-dashboard'
            alt="Remy Sharp"
            // src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1667133652/upload/mfyfdkfy6e3279cpqyfu.png"
            // src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/avatar-trang-cuc-doc.jpg"
            src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/280227226_1576724812722345_6309128935566769866_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OgKQ28zqDFoAX-4mJ3r&_nc_ht=scontent.fhan14-3.fna&oh=00_AfD75H44rW0TjQ2SY8lOYUKKY39bSF6lvL5kVdukLLzAJQ&oe=6369CD16"
            sx={{ width: 150, height: 150 }}
          />
          <div className='username-dashboard'>Trung Kiên</div>
          <div className='username-dashboard-role'>Administrator</div>
        </div>
        <Divider />
        <ListItemButton 
          onClick={() => setCurrentPage(1)} 
          sx={ currentPage === 1 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
          <ListItemIcon>
            <DashboardIcon sx={{ color: `${selectedTheme.textColor}` }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => setEnglishNavOpen(!englishNavOpen)}>
          <ListItemIcon>
            <LocalLibraryIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="English" />
          {englishNavOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={englishNavOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={ currentPage === 10 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(10)}>
              <ListItemIcon>
                <BookIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="English Word" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding sx={ currentPage === 11 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(11)}>
              <ListItemIcon>
                <BookmarkIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Anh Viet Dictionary" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding sx={ currentPage === 12 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(12)}>
              <ListItemIcon>
                <BookmarkIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Viet Anh Dictionary" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding sx={ currentPage === 13 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(13)}>
              <ListItemIcon>
                <BookmarkIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Viet Anh Bonus" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding sx={ currentPage === 21 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }}  onClick={() => setCurrentPage(21)}>
              <ListItemIcon>
                <QuizIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              {/* <ListItemText primary="Test" onClick={() => window.location.href = './english'} /> */}
              <ListItemText primary="Test" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding sx={ currentPage === 22 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }}  onClick={() => setCurrentPage(22)}>
              <ListItemIcon>
                <QuizIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Dictionary Test" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding sx={ currentPage === 23 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }}  onClick={() => setCurrentPage(23)}>
              <ListItemIcon>
                <QuizIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Fill Test" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton 
          onClick={() => setCurrentPage(2)} 
          sx={ currentPage === 2 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
          <ListItemIcon>
            <SchoolOutlinedIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Study" />
        </ListItemButton>

        <ListItemButton 
          onClick={() => setCurrentPage(3)} 
          sx={ currentPage === 3 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
          <ListItemIcon>
            <WorkOutlineOutlinedIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Work" />
        </ListItemButton>

        <ListItemButton 
          onClick={() => setCurrentPage(4)} 
          sx={ currentPage === 4 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
          <ListItemIcon>
            <ShoppingCartIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Money" />
        </ListItemButton>

        <ListItemButton 
          onClick={() => setCurrentPage(5)} 
          sx={ currentPage === 5 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
          <ListItemIcon>
            <EmojiEventsOutlinedIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Event" />
        </ListItemButton>

        <ListItemButton 
          onClick={() => setCurrentPage(6)} 
          sx={ currentPage === 6 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
          <ListItemIcon>
            <CrisisAlertIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Target" />
        </ListItemButton>

        <ListItemButton 
          onClick={() => setCurrentPage(7)} 
          sx={ currentPage === 7 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
          <ListItemIcon>
            <EventNoteOutlinedIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Note" />
        </ListItemButton>

        <ListItemButton onClick={() => setImageNavOpen(!imageNavOpen)}>
          <ListItemIcon>
            <CameraAltIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Image" />
          {imageNavOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={imageNavOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={ currentPage === 8 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(8)}>
              <ListItemIcon>
                <ImageOutlinedIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Picture" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding sx={ currentPage === 9 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(9)}>
              <ListItemIcon>
                <AlbumOutlinedIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Album" />
            </ListItemButton>
          </List>
        </Collapse>



        {/* entertainment */}
        <ListItemButton onClick={() => setEntertainmenttNavOpen(!entertainmenttNavOpen)}>
          <ListItemIcon>
            <SportsEsportsIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Entertainment" />
          {entertainmenttNavOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={entertainmenttNavOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={ currentPage === 15 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(15)}>
              <ListItemIcon>
                <YouTubeIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Youtube" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding sx={ currentPage === 16 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(16)}>
              <ListItemIcon>
                <PlayCircleFilledIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Tiktok" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding sx={ currentPage === 17 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(17)}>
              <ListItemIcon>
                <LibraryMusicIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Song" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding sx={ currentPage === 18 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(18)}>
              <ListItemIcon>
                <BookIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Book" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding sx={ currentPage === 19 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : { bgcolor: `${selectedTheme.subItemColor}` }}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setCurrentPage(19)}>
              <ListItemIcon>
                <AbcIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
              </ListItemIcon>
              <ListItemText primary="Idioms" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton 
          onClick={() => setCurrentPage(20)} 
          sx={ currentPage === 20 ? {bgcolor: `${selectedTheme.selectedItemColor}` } : {}}
          >
          <ListItemIcon>
            <SettingsApplicationsIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItemButton>

        {/* <ListItemButton>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Admin setting" />
        </ListItemButton> */}

        <ListItemButton onClick={() => window.location.href = './'}>
          <ListItemIcon>
            <HomeIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Back to homepage" />
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <InputIcon  sx={{ color: `${selectedTheme.textColor}` }}/>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
        <Divider />
        <List>
          <ButtonGroup style={{ marginLeft: "52px", marginTop: "5px" }} variant="text" aria-label="text button group">
            <Button onClick={()=>handleChangeTheme(-1)}><ArrowBackIosIcon/></Button>
            <Button onClick={handleClickOpenTheme}>Theme</Button>
            <Button onClick={()=>handleChangeTheme(1)}><ArrowForwardIosIcon/></Button>
          </ButtonGroup>
        </List>
      </List>
    </div>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    
    <Box sx={{ display: 'flex'}}>

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
       
      </Box>
      <SimpleDialog
        selectedValue={selectedTheme}
        open={themeOpen}
        onClose={handleCloseTheme}
      />
    </Box>

  );
}

