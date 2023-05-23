import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer(){

    return(
        <footer>
            <ul className={styles.socialList}>
                <li><FaFacebook/></li>
                <li><FaInstagram/></li>
                <li><FaTwitter/></li>
                <li><FaYoutube/></li>
            </ul>
            <p>Nosso rodapé</p>            
        </footer>
    )

}
export default Footer