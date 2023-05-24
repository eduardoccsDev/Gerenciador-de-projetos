import ProjectForm from "../components/project/ProjectForm"
import styles from "./NovoProjeto.module.css"

function NovoProjeto(){
    return(
        <div className={styles.PageContainerNovoProjeto} >
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>
            <ProjectForm/>
        </div>
    )
}

export default NovoProjeto