import { Route, Routes } from 'react-router-dom';
import './Global.css'
import Login from './Components/Routes/Login';
import Home from './Components/Routes/Home';
import Amount from './Components/Routes/Amount';
import Order from './Components/Routes/Order';
import NewOrder from './Components/Routes/newOrder';

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
