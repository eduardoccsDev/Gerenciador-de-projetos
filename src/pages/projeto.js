import { parse, v4 as uuidv4 } from "uuid"
import styles from './Projeto.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'
import UINumber from "../components/layout/UINumber";
import ProjectForm from "../components/project/ProjectForm"
import Message from '../components/layout/Message'
import ServiceForm from '../components/service/ServiceForm'
import ServiceCard from "../components/service/ServiceCard"
import { AiOutlinePlusCircle, AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai'
function Projeto(){

    const { id } = useParams()
    const [projeto, setProjeto] = useState([])
    const [services, setServices] = useState([])
    const [showProjetoForm, setShowProjetoForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projetos/${id}`, {
            method:'GET',
            headers: {
                'Content-Type': 'appliaction/json',
            }
        })
        .then(resp => resp.json())
        .then((data) => {
            setProjeto(data)
            setServices(data.services)
        })
        .catch(err => console.log(err))
        }, 300)
    }, [id])
    function editPost(projeto){
        setMessage("")
        //validacao de orcamento
        if(projeto.orcamento < projeto.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProjeto(data)
            setShowProjetoForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }
    function createService(projeto){
        setMessage("")
        //ultimo serviço
        const lastService = projeto.services[projeto.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(projeto.cost) + parseFloat(lastServiceCost)

        //validação de valor máximo
        if(newCost > parseFloat(projeto.orcamento)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            projeto.services.pop()
            return false
        }
        // adicionar custo do servico ao custo utilizado
        projeto.cost = newCost

        //update no projeto
        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto),
        })
        .then(resp => resp.json())
        .then((data) => {
            setShowServiceForm(false)
            setMessage("Serviço adicionado com sucesso!")
            setType("success")
        })
        .catch(err => console.log(err))

    }
    function removeService(id, cost){
        const servicesUpdated = projeto.services.filter(
            (service) => service.id !== id
        )
        const projectUpdated = projeto
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
        fetch(`http://localhost:5000/projetos/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProjeto(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
            setType("success")
        })
        .catch(err => console.log(err))
    }
    function toggleProjetoForm(){
        setShowProjetoForm(!showProjetoForm)
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }
    return(
        <>
        {projeto.nomeProjeto ? (
            <div className={styles.projetoDetails}>
                <Container customClass='column'>
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.detailsContainer}>
                        <h1>Projeto: <span>{projeto.nomeProjeto}</span></h1>
                        <button className={styles.btn} onClick={toggleProjetoForm}>
                            {!showProjetoForm ? (
                                <span className={styles.spanService}><AiOutlineEdit/>Editar projeto</span>
                                ):(
                                    <span className={styles.spanService}><AiOutlineCloseCircle/>Fechar</span>
                                    )}
                        </button>
                        {!showProjetoForm ? (
                            <div className={styles.projetoInfo}>
                                <p>
                                    <span>Categoria:</span> {projeto.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento: </span> R$ 
                                    <UINumber format="0,0.00">
                                        {projeto.orcamento}
                                    </UINumber>
                                </p>
                                <p>
                                    <span>Orçamento Utilizado: </span> R$ 
                                    <UINumber format="0,0.00">
                                        {projeto.cost}
                                    </UINumber>
                                </p>
                            </div>
                        ):(
                            <div className={styles.projetoInfo}>
                                <ProjectForm 
                                handleSubmit={editPost} 
                                btnText="Concluir edição"
                                projetosData={projeto}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.serviceFormContainer}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? (
                                <span className={styles.spanService}><AiOutlinePlusCircle/>Adicionar serviço</span>
                                ):(
                                    <span className={styles.spanService}><AiOutlineCloseCircle/>Fechar</span>
                                    )}
                        </button>
                        <div className={styles.projetoInfo}>
                            {showServiceForm && (
                                <ServiceForm
                                textBtb="Adicionar serviço"
                                handleSubmit={createService}
                                projetoData={projeto}
                                />
                            )

                            }    
                        </div>
                    </div>
                    <h2>Serviços:</h2>
                    <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                    id={service.id}
                                    name={service.nameServico}
                                    cost={service.cost}
                                    descricao={service.descricao}
                                    key={service.id}
                                    handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados</p>}
                    </Container>
                </Container>
            </div>
        ):(
            <Loading />
        )}
        </>
    )
}
export default Projeto