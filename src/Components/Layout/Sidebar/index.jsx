import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import logoNav from '../../../Assets/logo-navbar.svg'
import './sidebar.css'
import { FiLogOut } from 'react-icons/fi'
import useAuth from '../../../hooks/useAuth';

const Sidebar = () => {
  
  const auth = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className='sidebar'>
        <NavLink to='#' className='menu-bars'>
          <FaBars onClick={showSidebar} />
        </NavLink>
      </div>
      <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <button id='btn-close' to='#' className='menu-bars btn-global' onClick={showSidebar}>
              <AiOutlineClose />
            </button>
          </li>
          <NavLink to="/"><img src={logoNav} alt="Logo gold" className='logo-active' /></NavLink>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <NavLink to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
          <li>
            <button onClick={auth.logout} className="btn-global logout-btn">
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar