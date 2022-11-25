import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './app.scss'
import { NotFound } from './components/notFound/NotFound';
import { Homepage } from './pages/client/home/Homepage';
import { Login } from './pages/client/login/Login';
import { Management } from './pages/client/management/Management';
import { Product } from './pages/client/product/Product';
import { Register } from './pages/client/register/Register';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Homepage/>}/>
          <Route path='/management' element = {<Management/>}/>
          <Route path='/product/:id' element = {<Product/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>
          <Route path='/*' element = {<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
