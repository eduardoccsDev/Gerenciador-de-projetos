import { Link } from "react-router-dom";
import styles from './NavBar.module.css'

function NavBar(){

    return(
        <div className={styles.navBar}>
        <p className={styles.logo}>LOGO</p>
        <ul className={styles.list}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/empresa">Empresa</Link></li>
          <li><Link to="/contato">Contato</Link></li>
        </ul>
        </div>
    )

}
export default NavBar