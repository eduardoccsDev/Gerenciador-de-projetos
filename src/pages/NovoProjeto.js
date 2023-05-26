import { useNavigate } from 'react-router-dom'
import ProjectForm from "../components/project/ProjectForm"
import styles from "./NovoProjeto.module.css"
import { IoCreateOutline } from 'react-icons/io5';
function NovoProjeto(){

    const history = useNavigate()

    function createPost(projetos){
        //initialize cost and services
        projetos.cost = 0
        projetos.services = []

        fetch("http://localhost:5000/projetos", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(projetos)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            history('/projetos', {message: 'Projeto criado com sucesso!'})
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.PageContainerNovoProjeto} >
            <h1>Criar Projeto <IoCreateOutline/></h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto'/>
        </div>
    )
}

export default NovoProjeto