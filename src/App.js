import { Route, Routes } from 'react-router-dom';
import './App.css';
import './Global.css'
import Login from './Components/Routes/Login';
import Home from './Components/Routes/Home';
import Amount from './Components/Routes/Amount';
import Product from './Components/Routes/Product';
import Order from './Components/Routes/Order';
import Navbar from './Components/Layout/Navbar';

import Container from './Components/Layout/Container';
import Footer from './Components/Layout/Footer';

function App() {

  return (
    <>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/amount' element={<Amount />} />
          <Route path='/product' element={<Product />} />
          <Route path='/order' element={<Order />} />
        </Routes>
      </Container>
      <Footer/>
    </>
  );
}

export default App;
