// import { useLocation } from "react-router-dom"
import Container from "../components/layout/Container"
import LinkButton from "../components/layout/LinkButton"
import styles from "./Projetos.module.css"
import ProjectCard from "../components/project/ProjectCard"
import { useState, useEffect } from "react"
import React from 'react';
import {BiSearch} from 'react-icons/bi'
import { motion } from 'framer-motion';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Projetos(){

    const [projetos, setProjetos] = useState([]);
    // const location = useLocation();
    const excludeColumns = ['id'];
    const [search, setSearch] = useState("");
    const [data, setData] = useState(" ");
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
    // let message = ''
    // if(location.state){
    //     message = location.state.message
    // }

    // axio

    const getProjetos = async () => {
        try {
        const res = await axios.get("http://localhost:8800/projetos");
        setProjetos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error) {
        toast.error(error);
        }
    };

    useEffect(() => {
        getProjetos();
    }, [setProjetos]);

    
      const handleDelete = async (id) => {
        await axios
          .delete("http://localhost:8800/projetos" + id)
          .then(({ data }) => {
            const newArray = projetos.filter((projeto) => projeto.id !== id);
    
            setProjetos(newArray);
            toast.success(data);
          })
          .catch(({ data }) => toast.error(data));
    
      };

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
                            projetos.map((item, i) => (
                                <ProjectCard 
                                id={item.id}
                                nomeProjeto={item.nome}
                                orcamento={item.orcamento}
                                category={item.name}
                                key={item.id}
                                handleRemove={handleDelete}
                                cor = {item.cor}
                                />
                        ))
                    ):
                    (
                        projetos.length > 0 &&
                            data.map((item, i) => (
                                <ProjectCard 
                                id={item.id}
                                nomeProjeto={item.nome}
                                orcamento={item.orcamento}
                                category={item.name}
                                key={i}
                                handleRemove={handleDelete}
                                />
                        ))
                    )
                }
                {data.length === 0 ? 
                    (<motion.p className={styles.semRes}
                        initial={{scale: 0}}
                        animate={{scale:1}}
                        exit={{scale:0}}
                        transition={{ duration: 0.1 }}
                    >Não há resultados para o que procura!</motion.p>)
                    :
                    (<></>)}
            </Container>
            <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
        </motion.div>
    )
}

export default Projetos