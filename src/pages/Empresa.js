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

function NewCat(){

    const [categoria, setCategoria] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projetoMessage, setProjetoMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
            fetch("http://localhost:5000/categorias", {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                setCategoria(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err)) 
    }, []);

    const excludeColumns = ['id'];
    const [search, setSearch] = useState("");
    const [data, setData] = useState(categoria);
    const handleChange = value => {
        setSearch(value);
        filterData(value);
      };
    const filterData = value =>{
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            setData(categoria);
        }
        else{
            const filteredData = categoria.filter(item => {
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
        fetch(`http://localhost:5000/categorias/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(() => {
            setCategoria(categoria.filter((categoria) => categoria.id !== id))
            setProjetoMessage('Categoria removida com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return(
        <motion.div 
        className={styles.projectContainer}
        key='categorias'
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{ duration: 1 }}
        >
            <div className={styles.tittleContainer}>
                <h1>Minhas categorias</h1>
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
                placeholder="Buscar categoria..."
                onChange={e => handleChange(e.target.value)}
                />
            </div>
            <Container customClass="start">
                {!search ? 
                    (
                        categoria.length > 0 &&
                            categoria.map((projeto) => (
                                <p key={projeto.id} id= {projeto.id}>
                                {projeto.name}
                                </p>
                        ))
                    ):
                    (
                        categoria.length > 0 &&
                            data.map((projeto) => (
                                <p key={projeto.id} id= {projeto.id}>
                                {projeto.name}
                                </p>
                        ))
                    )
                }
                {!removeLoading && <Loading/>}
                {removeLoading && categoria.length === 0 && (
                    <p className={styles.messageProjetos}>Não há projetos cadastrados </p>
                )}
            </Container>
        </motion.div>
    )
}

export default NewCat