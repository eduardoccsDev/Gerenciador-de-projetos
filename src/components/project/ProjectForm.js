
import styles from "./ProjectForm.module.css"
import { useEffect, useState } from 'react'
import Input from "../form/Input";
import Select from "../form/Select";
import CheckBox from "../form/CheckBox";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({btnText}){

    function cadastrarUsuario(e){
        e.preventDefault()
        console.log('Projeto cadastrado')
        console.log(`Nome do projeto: ${nomeProjeto} | Orçamento: ${orcamento} | Categoria: ${categoria} | Tecnologia: ${checked}`)    
    }

    const [nomeProjeto, setNomeProjeto] = useState()
    const [orcamento, setOrcamento] = useState()
    const [categoria, setCategoria] = useState([])
    const [checked, setChecked] = useState([]);
    const boxesAsc = checked.sort();

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
        })
        .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/tecnologias", {
            method: "GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setChecked(data)
        })
        .catch((err) => console.log(err))
    }, [])
    
    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
        updatedList = [...checked, event.target.value];
        } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    // Generate string of checked items
    // const checkedItems = checked.length
    //  ? checked.reduce((total, item) => {
    //    return total + ", " + item;
    //    })
    //  : "";

    return(
        <form className={styles.form} onSubmit={cadastrarUsuario}>
            <Input
            type='text'
            name='nomeProjeto'            
            text='Nome do projeto'
            placeholder='Insira o nome do projeto'
            onChange={(e) => setNomeProjeto(e.target.value)}
            required='required'
            />
            <Input
            type='number'
            name='orcamento'            
            text='Orçamento do projeto'
            placeholder='Insira o orçamento total'
            onChange={(e) => setOrcamento(e.target.value)}
            required='required'
            min='0'
            />
            <Select
            name='categoria'
            onChange={(e) => setCategoria(e.target.value)}
            text='Categoria do projeto'
            options={categoria}
            />
            <h3 className={styles.indicacao}>Selecione as Tecnologias usadas:</h3>
            <div className={styles.checkboxContent}>   
                <CheckBox 
                boxes={boxesAsc} 
                cssClass={styles.bosItems} 
                onChange={handleCheck}
                />           
            </div>
            <div>                
                <SubmitButton 
                text={btnText}
                />
            </div>
        </form>
    )
}

export default ProjectForm 