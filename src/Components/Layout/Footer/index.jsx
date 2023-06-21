import './Footer.model.css'
import { AiFillGithub } from 'react-icons/ai'

const index = () => {
  return (
    <footer className='footer'>

      <ul className="social_list">
        <li>
          <a target='blank' href="https://github.com/JoaopedroSassi"><AiFillGithub /></a>
        </li>
        <li>

          <a target='blank' href="https://github.com/FelipeFelixhub"><AiFillGithub /></a>
        </li>
        <li>
          <a target='blank' href="https://github.com/LucasMend0n"><AiFillGithub /></a>
        </li>
      </ul>
      <p><span>Gold Colchoes</span> &copy; 2023</p>
    </footer>
  )
}

export default index
