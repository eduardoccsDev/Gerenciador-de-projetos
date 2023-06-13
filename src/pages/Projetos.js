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
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReturnBtn from "../components/layout/ReturnBtn";
import FormEdit from "../components/project/FormEdit"

function Projetos(){

    const ref = useRef();
    const [projetos, setProjetos] = useState([]);
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

    const [check, setCheck] = useState("");

    const onOptionChange = e => {
        setCheck(e.target.value)
    }


    // axio

     const [prioridades, setPrioridades] = useState([]);

    const getPrioridades = async () => {
        try {
        const res = await axios.get("http://localhost:8800/prioridades");
        setPrioridades(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error) {
        toast.error(error);
        }
    };

    useEffect(() => {
        getPrioridades();
    }, [setPrioridades]);

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
    setIsActive(true);
    };

    function closeForm(){
        setIsActive(false);
        setOnEdit("");
    }

      useEffect(() => {
        if (onEdit) {
        const projeto = ref.current;

        projeto.id.value = onEdit.id;
        projeto.nome.value = onEdit.nome;
        projeto.orcamento.value = onEdit.orcamento;
        projeto.categoria.value = onEdit.categoria;
        projeto.prioridades.value = onEdit.prioridade;
        projeto.descricaoProjeto.value = onEdit.descricaoProjeto;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projeto = ref.current;

        if (
        !projeto.id.value ||    
        !projeto.nome.value ||
        !projeto.orcamento.value ||
        !projeto.categoria.value ||
        !projeto.prioridades.value
        ) {
        return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
        await axios
            .put("http://localhost:8800/projetos" + onEdit.id, {
            id: projeto.id.value,    
            nome: projeto.nome.value,
            orcamento: projeto.orcamento.value,
            categoria: projeto.categoria.value,
            prioridade: projeto.prioridades.value,
            descricaoProjeto: projeto.descricaoProjeto.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
        await axios
            .post("http://localhost:8800/projetos", {
                id: projeto.id.value,
                nome: projeto.nome.value,
                orcamento: projeto.orcamento.value,
                categoria: projeto.categoria.value,
                prioridade: projeto.prioridades.value,
                descricaoProjeto: projeto.descricaoProjeto.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        projeto.id.value = "";
        projeto.nome.value = "";
        projeto.orcamento.value = "";
        projeto.categoria.value = "";
        projeto.prioridades.value ="";
        projeto.descricaoProjeto.value="";

        // setOnEdit(null);
        setIsActive(false);
        getProjetos();
    };
   

    return(
        //editar servico
        <>{isActive ?
            (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.popup}
                >
                    <div className={styles.popupContainer}>
                        <div className={styles.titlePopupContainer}>
                            <h2 className={styles.editTitle}>Editar Projeto</h2>
                            <button className={styles.closeBtn} onClick={closeForm}>
                                <AiOutlineCloseCircle/>Fechar
                            </button>
                        </div>
                            <FormEdit
                            id={projeto.id}
                            nome={projeto.nome}
                            orcamento={projeto.orcamento}
                            categorias={categorias}
                            valorSelected={valorSelecionado}
                            prioridades={prioridades}
                            handleOnChangeRadio={onOptionChange}
                            handleOnChange={(e) => setValorSelecionado(e.target.value)}
                            referencia={ref}
                            descricao={projeto.descricaoProjeto}
                            handleSubmit={handleSubmit}
                            />
                    </div>
                </motion.div>
            )
            :
            (<></>)}
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
                                        key={i}
                                        prioridade={item.prioridade}
                                        corPrioridade={item.corPrioridade}
                                        handleRemove={handleDelete}
                                        cor={item.cor}
                                        handleEdit={() => handleEdit(item)}
                                    />
                                    {/* <button onClick={() => handleEdit(item)}>Editar</button> */}
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
                                    prioridade={item.prioridade}
                                    corPrioridade={item.corPrioridade}
                                    handleRemove={handleDelete}
                                    cor={item.cor}
                                    handleEdit={() => handleEdit(item)} 
                                />
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
                <div className={styles.center}>
                <ReturnBtn
                texto = "Voltar"
                />
                </div>
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
            </motion.div></>
    )
}

export default Projetos