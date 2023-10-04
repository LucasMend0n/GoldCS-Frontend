import {AiFillHome, AiOutlineUser} from 'react-icons/ai'
import {BsFillBoxSeamFill, BsFillArchiveFill} from 'react-icons/bs'
import {BiNotepad} from 'react-icons/bi' 

export const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <AiFillHome/>,
      cName: 'nav-text'
    },
    {
      title: 'Produto',
      path: '/product',
      icon: <BsFillBoxSeamFill />,
      cName: 'nav-text'
    },
    {
      title: 'Pedido',
      path: '/order',
      icon: <BiNotepad/>,
      cName: 'nav-text'
    },
    {
      title: 'Estoque',
      path: '/amount',
      icon: <BsFillArchiveFill/>,
      cName: 'nav-text'
    },
    {
      title: 'Perfil',
      path: '/profile',
      icon: <AiOutlineUser/>,
      cName: 'nav-text'
    },
  ];