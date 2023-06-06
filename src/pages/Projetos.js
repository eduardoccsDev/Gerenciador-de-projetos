import Container from "../components/layout/Container"
import LinkButton from "../components/layout/LinkButton"
import styles from "./Projetos.module.css"
import ProjectCard from "../components/project/ProjectCard"
import { useState, useEffect, useRef } from "react"
import React from 'react';
import {BiSearch} from 'react-icons/bi'
import { motion } from 'framer-motion';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import SubmitButton from "../components/form/SubmitButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';

function Projetos(){

    const ref = useRef();
    const [projetos, setProjetos] = useState([]);
    // const location = useLocation();
    const excludeColumns = ['id'];
    const [search, setSearch] = useState("");
    const [data, setData] = useState(" ");
    const [isActive, setIsActive] = useState(false);
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

    const projeto = {}
    const [categorias, setCategorias] = useState([]);
    const [valorSelecionado, setValorSelecionado] = useState();

    const getCategorias = async () => {
        try {
        const res = await axios.get("http://localhost:8800/categorias");
        setCategorias(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error) {
        toast.error(error);
        }
    };

    useEffect(() => {
        getCategorias();
    }, [setCategorias]);

    const [onEdit, setOnEdit] = useState(null);    
    const handleEdit = (item) => {
    setOnEdit(item);
    // setIsActive(current => !current);
    setIsActive(true);
    };
    function closeForm(){
        setIsActive(false);
    }

      useEffect(() => {
        if (onEdit) {
        const projeto = ref.current;

        projeto.nome.value = onEdit.nome;
        projeto.orcamento.value = onEdit.orcamento;
        projeto.categoria.value = onEdit.categoria;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projeto = ref.current;

        if (
        !projeto.nome.value ||
        !projeto.orcamento.value ||
        !projeto.categoria.value
        ) {
        return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
        await axios
            .put("http://localhost:8800/projetos" + onEdit.id, {
            nome: projeto.nome.value,
            orcamento: projeto.orcamento.value,
            categoria: projeto.categoria.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
        await axios
            .post("http://localhost:8800/projetos", {
                nome: projeto.nome.value,
                orcamento: projeto.orcamento.value,
                categoria: projeto.categoria.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        projeto.nome.value = "";
        projeto.orcamento.value = "";
        projeto.categoria.value = "";

        setOnEdit(null);
        getProjetos();
    };    
    
    return(
        <><>{isActive ?
            (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.popup}
                >
                    <div className={styles.popupContainer}>
                        <div style={{textAlign:"right"}}><button className={styles.closeBtn} onClick={closeForm}><AiOutlineCloseCircle/>Fechar</button></div>
                        <form ref={ref} className={styles.form} onSubmit={handleSubmit}>
                            <Input
                                type='text'
                                name='nome'
                                text='Nome do projeto'
                                placeholder='Insira o nome do projeto'
                                value={projeto.nome} />
                            <Input
                                type='number'
                                name='orcamento'
                                text='Orçamento do projeto'
                                placeholder='Insira o orçamento total'
                                min='0'
                                value={projeto.orcamento} />
                            <Select
                                name='categoria'
                                handleOnChange={(e) => setValorSelecionado(e.target.value)}
                                text='Categoria do projeto'
                                options={categorias}
                                value={valorSelecionado} />
                            <div>
                                <SubmitButton
                                    text="Salvar" />
                            </div>
                        </form>
                    </div>
                </motion.div>
            )
            :
            (<></>)}</>
            <motion.div
                className={styles.projectContainer}
                key='projetos'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className={styles.tittleContainer}>
                    <h1>Meus Projetos</h1>
                    <LinkButton text="Novo Projeto" to="/novoprojeto" />
                </div>
                <div className={styles.searchContainer}>
                    <BiSearch />
                    <input
                        type="text"
                        className={styles.search}
                        value={search}
                        placeholder="Buscar projeto..."
                        onChange={e => handleChange(e.target.value)} />
                </div>
                <Container customClass="start" className={styles.teste}>
                    {!search ?
                        (
                            projetos.length > 0 &&
                            projetos.map((item, i) => (
                                <>
                                    <ProjectCard
                                        id={item.id}
                                        nomeProjeto={item.nome}
                                        orcamento={item.orcamento}
                                        category={item.name}
                                        key={item.id}
                                        handleRemove={handleDelete}
                                        cor={item.cor} 
                                    />
                                    <button onClick={() => handleEdit(item)}>Editar</button>
                                </>
                            ))
                        ) :
                        (
                            projetos.length > 0 &&
                            data.map((item, i) => (
                                <ProjectCard
                                    id={item.id}
                                    nomeProjeto={item.nome}
                                    orcamento={item.orcamento}
                                    category={item.name}
                                    key={i}
                                    handleRemove={handleDelete} />
                            ))
                        )}
                    {data.length === 0 ?
                        (<motion.p className={styles.semRes}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.1 }}
                        >Não há resultados para o que procura!</motion.p>)
                        :
                        (<></>)}
                </Container>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
            </motion.div></>
    )
}

export default Projetos