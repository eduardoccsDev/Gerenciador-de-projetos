import { useLocation } from "react-router-dom"
import Message from "../components/layout/Message"
import Container from "../components/layout/Container"
import LinkButton from "../components/layout/LinkButton"
import styles from "./Projetos.module.css"

function Projetos(){

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    return(
        <div className={styles.projectContainer}>
            <div className={styles.tittleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton text="Novo Projeto" to="/novoprojeto" />  
            </div>      
            {message && <Message type='success' msg={message}/>}
            <Container customClass="start">
                <p>Projetos...</p>
            </Container>
        </div>
    )
}

export default Projetos