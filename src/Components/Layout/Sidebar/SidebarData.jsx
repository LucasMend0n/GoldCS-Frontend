import {AiFillHome, AiOutlineUser} from 'react-icons/ai'
import {BsFillBoxSeamFill, BsFillArchiveFill, BsFillFileTextFill} from 'react-icons/bs'


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
      icon: <BsFillFileTextFill/>,
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