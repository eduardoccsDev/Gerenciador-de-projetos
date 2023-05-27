import { useLocation } from "react-router-dom"
import Message from "../components/layout/Message"
import Container from "../components/layout/Container"
import LinkButton from "../components/layout/LinkButton"
import styles from "./Projetos.module.css"
import Loading from '../components/layout/Loading'
import ProjectCard from "../components/project/ProjectCard"
import { useState, useEffect } from "react"

function Projetos(){

    const [projetos, setProjetos] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projetoMessage, setProjetoMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projetos", {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProjetos(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err)) 
        }, 300)
    }, []);

    function removeProject(id){
        fetch(`http://localhost:5000/projetos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(() => {
            setProjetos(projetos.filter((projetos) => projetos.id !== id))
            setProjetoMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.projectContainer}>
            <div className={styles.tittleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton text="Novo Projeto" to="/novoprojeto" />  
            </div>      
            {message && <Message type='success' msg={message}/>}
            {projetoMessage && <Message type='success' msg={projetoMessage}/>}
            <Container customClass="start">
                {projetos.length > 0 &&
                    projetos.map((projeto) => (
                        <ProjectCard 
                        id={projeto.id}
                        nomeProjeto={projeto.nomeProjeto}
                        orcamento={projeto.orcamento}
                        category={projeto.category.name}
                        key={projeto.id}
                        handleRemove={removeProject}
                        />
                ))}
                {!removeLoading && <Loading/>}
                {removeLoading && projetos.length === 0 && (
                    <p className={styles.messageProjetos}>Não há projetos cadastrados </p>
                )}
            </Container>
        </div>
    )
}

export default Projetos