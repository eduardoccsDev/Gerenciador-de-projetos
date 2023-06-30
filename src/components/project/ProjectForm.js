import styles from "./ProjectForm.module.css"
import { useEffect, useState, useRef } from 'react'
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputRadio from "../form/InputRadio";
import { useNavigate   } from 'react-router-dom';

function ProjectForm({btnText}){

    const projeto = {}
    const history = useNavigate();

    const [check, setCheck] = useState("");

    const onOptionChange = e => {
        setCheck(e.target.value)
        console.log(check)
    }


    const [categorias, setCategorias] = useState([]);

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



    // envio do form

    const ref = useRef();
    const [valorSelecionado, setValorSelecionado] = useState();
  
    const handleSubmitProjetos = async (e) => {
        e.preventDefault();

        const projeto = ref.current;

        if (
        !projeto.nome.value ||
        !projeto.orcamento.value ||
        !projeto.categoria.value ||
        !projeto.prioridades.value
       
        ) {
        return toast.warn("Preencha todos os campos!");
        }
        
        await axios
            .post("http://localhost:8800/projetos", {
                nome: projeto.nome.value,
                orcamento: projeto.orcamento.value,
                categoria: projeto.categoria.value,
                prioridade: projeto.prioridades.value,
                
            })
            .then(({ data }) => {
                toast.success(data)
                setTimeout(()=>{
                    history('/projetos')
                }, 3000)
            })
            .catch(({ data }) => toast.error(data));

        projeto.nome.value = "";
        projeto.orcamento.value = "";
        projeto.categoria.value = "";
        projeto.prioridades.value = "";
        

    };

    return(
        <>
        <form ref={ref} className={styles.form} onSubmit={handleSubmitProjetos}>
            <Input
                type='text'
                name='nome'
                text='Nome do projeto:'
                placeholder='Insira o nome do projeto'
                value={projeto.nome} />
            <Input
                type='number'
                name='orcamento'
                text='Orçamento do projeto:'
                placeholder='Insira o orçamento total'
                min='0'
                value={projeto.orcamento} />
            <Select
                name='categoria'
                handleOnChange={(e) => setValorSelecionado(e.target.value)}
                text='Categoria do projeto'
                options={categorias}
                value={valorSelecionado} />
            <InputRadio
                options={prioridades}
                handleOnChange={onOptionChange} />
            <div>
                <SubmitButton
                    text={btnText} />
            </div>
        </form></>
    )
}

export default ProjectForm 