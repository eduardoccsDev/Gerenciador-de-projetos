import ProjectForm from "../components/project/ProjectForm"
import styles from "./NovoProjeto.module.css"
import { IoCreateOutline } from 'react-icons/io5';
function NovoProjeto(){
    return(
        <div className={styles.PageContainerNovoProjeto} >
            <h1>Criar Projeto <IoCreateOutline/></h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>
            <ProjectForm/>
        </div>
    )
}

export default NovoProjeto