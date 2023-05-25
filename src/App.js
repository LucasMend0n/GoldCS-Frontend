import { Route, Routes } from 'react-router-dom';
import './Global.css'
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import Amount from './Components/Pages/Amount';
import Order from './Components/Pages/Order';
import NewOrder from './Components/Pages/newOrder';

function App() {

  return (
    <main className='App'>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/amount' element={<Amount />} />
          <Route exact path='/order' element={<Order />} />
          <Route  path='/neworder' element={<NewOrder/>}/>
        </Routes>
    </main>
  );
}

export default App;
