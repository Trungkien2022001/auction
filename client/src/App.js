import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import './app.scss'
import { NotFound } from './components/notFound/NotFound';
import { Homepage } from './pages/client/home/Homepage';
import { Login } from './pages/client/login/Login';
import { Management } from './pages/client/management/Management';
import { NewProduct } from './pages/client/newProduct/NewProduct';
import { Product } from './pages/client/product/Product';
import { Register } from './pages/client/register/Register';
import { Test } from './pages/client/test/Test';
import { User } from './pages/client/user/User';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { socketServer} from './context/socket';
import { Products } from './pages/client/products/Products';

function App() {
  const CustomToastWithLink = (metaData) => (
    <div onClick={()=>{window.location.href=`/auction/${metaData.auction.product.id}`}}>
      {`${metaData.bet.auctioneer_name} đã bình luận về một phiên đấu giá mà bạn theo dõi`}
    </div>
  );
  const socket = useRef();
  const currentUser = useSelector(state => state.user)
  socket.current = socketServer
  useEffect(() => {
    socket.current.on("connect", () => {
      socket.current.emit('authenticate', currentUser)
    });
    socket.current.on('raise-reply', (metaData)=>{
      if(metaData.bet.auctioneer_id !== currentUser.id){
        toast.info(CustomToastWithLink(metaData), {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      }
    })
    socket.current.on('finishedAuctionAuctioneer', ({auctionId})=>{
        toast.info('chúc mừng bạn đã đấu giá thành công một sản phẩm', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
    })
    socket.current.on('finishedAuctionSeller', ({auctionId})=>{
        toast.info('Sản phẩm của bạn đã đấu giá thành công, vui lòng vào trang cá nhân xác nhận', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
    })
    socket.current.on('notif-to-seller', ({auctionId})=>{
        toast.info('sản phẩm của bạn có một đấu giá mới', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
    })
    socket.current.on('startingAuctionSeller', ({auctionId})=>{
        toast.info('Sản phẩm của bạn bắt đầu được đấu giá', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
    })
    return () => {
      socket.current.disconnect();
    }
  }, [currentUser]);
  
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Homepage socket = {socket}/>}/>
          <Route path='/test' element = {<Test/>}/>
          <Route path='/product/:sort' element = {<Products socket = {socket}/>}/>
          <Route path='/product' element = {<Products socket = {socket}/>}/>
          <Route path='/management' element = {<Management/>}/>
          <Route path='/user/:id' element = {<User socket = {socket}/>}/>
          <Route path='/auction/:id' element = {<Product socket = {socket}/>}/>
          <Route path='/new-auction' element = {<NewProduct/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>
          <Route path='/*' element = {<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export let socket
