import { useLocation } from "react-router-dom"
import Message from "../components/layout/Message"
import Container from "../components/layout/Container"
import LinkButton from "../components/layout/LinkButton"
import styles from "./Projetos.module.css"
import Loading from '../components/layout/Loading'
import ProjectCard from "../components/project/ProjectCard"
import { useState, useEffect } from "react"
import React from 'react';
import {BiSearch} from 'react-icons/bi'
import { motion } from 'framer-motion';

function Projetos(){

    const [projetos, setProjetos] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projetoMessage, setProjetoMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
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
    }, []);

    const excludeColumns = ['id'];
    const [search, setSearch] = useState("");
    const [data, setData] = useState(projetos);
    const handleChange = value => {
        setSearch(value);
        filterData(value);
      };
    const filterData = value =>{
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            setData(projetos);
        }
        else{
            const filteredData = projetos.filter(item => {
                return Object.keys(item).some(key =>{
                    return excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setData(filteredData);
        }
    }
    let message = ''
    if(location.state){
        message = location.state.message
    }
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
        <motion.div 
        className={styles.projectContainer}
        key='projetos'
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{ duration: 1 }}
        >
            <div className={styles.tittleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton text="Novo Projeto" to="/novoprojeto" />  
            </div>  
            {message && <Message type='success' msg={message}/>}
            {projetoMessage && <Message type='success' msg={projetoMessage}/>}
            <div className={styles.searchContainer}>
                <BiSearch/>
                <input 
                type="text" 
                className={styles.search}
                value={search} 
                placeholder="Buscar projeto..."
                onChange={e => handleChange(e.target.value)}
                />
            </div>
            <Container customClass="start" className={styles.teste}>
                {!search ? 
                    (
                        projetos.length > 0 &&
                            projetos.map((projeto) => (
                                <ProjectCard 
                                id={projeto.id}
                                nomeProjeto={projeto.nomeProjeto}
                                orcamento={projeto.orcamento}
                                category={projeto.category.name}
                                key={projeto.id}
                                nServicos = {projeto.services}
                                handleRemove={removeProject}
                                />
                        ))
                    ):
                    (
                        projetos.length > 0 &&
                            data.map((projeto) => (
                                <ProjectCard 
                                id={projeto.id}
                                nomeProjeto={projeto.nomeProjeto}
                                orcamento={projeto.orcamento}
                                category={projeto.category.name}
                                key={projeto.id}
                                nServicos = {projeto.services}
                                handleRemove={removeProject}
                                />
                        ))
                    )
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projetos.length === 0 && (
                    <p className={styles.messageProjetos}>Não há projetos cadastrados </p>
                )}
            </Container>
        </motion.div>
    )
}

export default Projetos