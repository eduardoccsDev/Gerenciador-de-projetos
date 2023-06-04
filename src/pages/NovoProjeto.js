import { useNavigate } from 'react-router-dom'
import ProjectForm from "../components/project/ProjectForm"
import styles from "./NovoProjeto.module.css"
import { IoCreateOutline } from 'react-icons/io5';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            history('/projetos', {state: {message: 'Projeto criado com sucesso!'}})
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.PageContainerNovoProjeto} >
            <div className={styles.Box}>
                <div className={styles.boxForm}>
                    <h1>Criar Projeto <IoCreateOutline/></h1>
                    <p>Crie seu projeto para depois adicionar os serviços.</p>
                    <ProjectForm handleSubmit={createPost} btnText='Criar Projeto'/>
                    <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
                </div>
            </div>
        </div>
    )
}

export default NovoProjeto