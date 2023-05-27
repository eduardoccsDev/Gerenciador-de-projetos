import styles from './Projeto.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../components/layout/Loading'
import Container from '../components/layout/Container'
import UINumber from "../components/layout/UINumber";
function Projeto(){

    const { id } = useParams()
    const [projeto, setProjeto] = useState([])
    const [showProjetoForm, setShowProjetoForm] = useState(false)

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
        })
        .catch(err => console.log(err))
        }, 300)
    }, [id])

    function toggleProjetoForm(){
        setShowProjetoForm(!showProjetoForm)
    }
    return(
        <>
        {projeto.nomeProjeto ? (
            <div className={styles.projetoDetails}>
                <Container customClass='column'>
                    <div className={styles.detailsContainer}>
                        <h1>Projeto: <span>{projeto.nomeProjeto}</span></h1>
                        <button className={styles.btn} onClick={toggleProjetoForm}>
                            {!showProjetoForm ? 'Editar projeto' : 'Fechar'}
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
                                <p>Form</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ):(
            <Loading />
        )}
        </>
    )
}

export default Projeto