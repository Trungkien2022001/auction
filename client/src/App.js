import {BrowserRouter, Routes, Route} from 'react-router-dom'
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
import socketIO from 'socket.io-client';

function App() {
  const socket = useRef();
  const currentUser = useSelector(state => state.user)
  useEffect(() => {
    socket.current = socketIO(process.env.REACT_APP_API_ENDPOINT);
    socket.current.on("connect", () => {
      socket.current.emit('authenticate', currentUser)
    });
    return () => {
      socket.current.disconnect();
    }
  }, [currentUser]);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Homepage socket = {socket}/>}/>
          <Route path='/test' element = {<Test/>}/>
          <Route path='/management' element = {<Management/>}/>
          <Route path='/user/:id' element = {<User/>}/>
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
