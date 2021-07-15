import { Link } from 'react-router-dom'

import s from './NavBar.module.css'

const NavBar = () => {

    return (
        <div className={s.navbar}>
            <ul className={s.list}>
                <Link to={'/home'} >
                    <li className=""> Home  </li>
                </Link>
                <Link to={'/registro'} >
                    <li className=""> Registro </li>
                </Link>
                <Link to={'/login'} >
                    <li className=""> Login </li>
                </Link>
                <Link to={'/clases'} >
                    <li className=""> Clases </li>
                </Link>
                <Link to={'/calendar'} >
                    <li className=""> Calendar </li>
                </Link>
                <Link to={'/perfil'} >
                    <li className=""> Perfil </li>
                </Link>
                <Link to={'/chat'} >
                    <li className=""> Chat  </li>
                </Link>
            </ul>
        </div>)
}

export default NavBar

