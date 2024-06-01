import { Route, Routes } from 'react-router-dom';
import './Global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import Amount from './Components/Pages/Amount';
import Order from './Components/Pages/Order';
import NewOrder from './Components/Pages/newOrder';
import Layout from './Components/Layout/Layout';
import RequireAuth from './Components/RequireAuth';
import Profile from './Components/Pages/Profile/Profile';
import SearchOrder from './Components/Pages/Order/SearchOrder/SearchOrder';
import Product from './Components/Pages/Product/Product';
import NewProduct from './Components/Pages/Product/NewProduct'
import ListProducts from './Components/Pages/Product/ListProducts';

function App() {

  return (

    <Routes>
      <Route path='/' element={<Layout />} >

        <Route exact path='/login' element={<Login />} />

        <Route element={< RequireAuth />} >
          <Route exact path='/' element={<Home />} />
          <Route exact path='/amount' element={<Amount />} />
          <Route path='/order/' element={<Order />}>
          </Route>
          <Route path='/neworder' element={<NewOrder />} />
          <Route path='/searchorder' element={<SearchOrder />} />
          <Route path='/product' element={<Product />} />
          <Route path='/newproduct' element={<NewProduct/>} />
          <Route path='/listproducts' element={<ListProducts />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Route>


    </Routes>

  );
}

export default App;
