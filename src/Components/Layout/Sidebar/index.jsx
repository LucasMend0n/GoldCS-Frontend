import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import logoNav from '../../../Assets/logo1-variant-2-vector.svg'
import './sidebar.css'
import { FiLogOut } from 'react-icons/fi'
import useAuth from '../../../hooks/useAuth';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai'
import { BsFillBoxSeamFill, BsFillArchiveFill } from 'react-icons/bs'
import { BiNotepad } from 'react-icons/bi'

const Sidebar = () => {

  const auth = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <aside className='sidebar'>
        <NavLink to='#' className='menu-bars'>
          <FaBars onClick={showSidebar} />
        </NavLink>
        <ul className='sidebar-items'>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className='list-item'>
                <NavLink to={item.path} className='sidebar-items-icons'>
                  {item.icon}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <button onClick={auth.logout} className="btn-global sidebar-logout">
          <FiLogOut />
        </button>
      </aside>
      <aside className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <button id='btn-close' to='#' className='menu-bars btn-global' onClick={showSidebar}>
          <AiOutlineClose />
        </button>
        <img src={logoNav} alt="Logo gold" className='logo-active' />
        <ul className='nav-menu-items'>
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
        </ul>
            <button onClick={auth.logout} className="btn-global logout-btn">
              <FiLogOut />
            </button>
      </aside>
    </>
  );
}

export default Sidebar