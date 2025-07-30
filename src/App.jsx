import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from './Pages/Home';
import Base from './Layouts/Base';
import Aos from 'aos';
import "aos/dist/aos.css";
import Account from './Pages/Account';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Admin from './Pages/Admin';
import Contact from './Pages/Contact';

function App() {
  useEffect(() => {
    Aos.init({
      duration : 2000
    });
    Aos.refresh();
  }, []);

  return (
    <>
      <div className="App">
       <BrowserRouter>
      <Base>
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/product/:title" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/admin" element={<Admin/>} />
          {/* <Route path="/*" element={<PageNotFound />}/> */}
        </Routes>
      </Base>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
