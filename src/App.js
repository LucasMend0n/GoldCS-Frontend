import { Route, Routes } from 'react-router-dom';
import './Global.css'
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import Amount from './Components/Pages/Amount';
import Order from './Components/Pages/Order';
import NewOrder from './Components/Pages/newOrder';
import Layout from './Components/Layout/Layout';
import RequireAuth from './Components/RequireAuth';

function App() {

  return (

    <Routes>
      <Route path='/' element={<Layout />} >

        <Route exact path='/login' element={<Login />} />

        <Route element={<RequireAuth />} >
          <Route exact path='/' element={<Home />} />
          <Route exact path='/amount' element={<Amount />} />
          <Route exact path='/order' element={<Order />} />
          <Route path='/neworder' element={<NewOrder />} />
        </Route>
      </Route>


    </Routes>

  );
}

export default App;
