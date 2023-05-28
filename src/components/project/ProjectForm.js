
import styles from "./ProjectForm.module.css"
import { useEffect, useState } from 'react'
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({handleSubmit,btnText, projetosData}){

    const [projeto, setProjeto] = useState(projetosData || {})
    // const [nomeProjeto, setNomeProjeto] = useState()
    // const [orcamento, setOrcamento] = useState()
    const [categoria, setCategoria] = useState([])

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
        }).catch((err) => console.log(err))
    }, []);

    const submit = (e) => {
        e.preventDefault()
        //console.log(projeto)
        handleSubmit(projeto)
    }

    function handleChange(e){
        setProjeto({...projeto, [e.target.name]: e.target.value })
        //console.log(projeto)
    }

    function handleCategory(e){
        setProjeto({...projeto, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
    }
  
    return(
        <form className={styles.form} onSubmit={submit}>
            <Input
            type='text'
            name='nomeProjeto'            
            text='Nome do projeto'
            placeholder='Insira o nome do projeto'
            handleOnChange={handleChange}
            required='required'
            value={projeto.nomeProjeto}
            />
            <Input
            type='number'
            name='orcamento'            
            text='Orçamento do projeto'
            placeholder='Insira o orçamento total'
            handleOnChange={handleChange}
            required='required'
            min='0'
            value={projeto.orcamento}
            />
            <Select
            name='categoria'
            handleOnChange={handleCategory}
            text='Categoria do projeto'
            options={categoria}
            value={projeto.category ? projeto.category.id : ''}
            />
            <div>                
                <SubmitButton 
                text={btnText}
                />
            </div>
        </form>
    )
}

export default ProjectForm 