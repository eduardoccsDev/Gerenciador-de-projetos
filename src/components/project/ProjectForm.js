import styles from "./ProjectForm.module.css"
import { useState } from 'react'
function ProjectForm(){

    function cadastrarUsuario(e){
        e.preventDefault()
        console.log('Projeto cadastrado')
        console.log(`Nome do projeto: ${nomeProjeto} | Orçamento: ${orcamento} | Categoria: ${categoria} | Tecnologia: ${checkedItems}`)
        
    }

    const [nomeProjeto, setNomeProjeto] = useState()
    const [orcamento, setOrcamento] = useState()
    const [categoria, setCategoria] = useState()

    const [checked, setChecked] = useState([]);
    const checkList = ["React", "Angular", "PHP", "HTML", "CSS", "Vue.js", "Docker"];

    const strAscending = checkList.sort();

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
    const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
        })
    : "";

    return(
        <form className={styles.form} onSubmit={cadastrarUsuario}>
            <div>
                <input id='nomeProjeto' required onChange={(e) => setNomeProjeto(e.target.value)} className={styles.myInput} type="text" placeholder="Insira o nome do projeto"/>
            </div>
            <div>
                <input id="orcamento" required onChange={(e) => setOrcamento(e.target.value)} className={styles.myInput} type="number" min="0" placeholder="Insira o orçamento total"/>
            </div>
            <div>
                <select required onChange={(e) => setCategoria(e.target.value)}>
                    <option disabled selected value=''>Selecione a categoria</option>
                    <option value='desenvolvimento'>Desenvolvimento</option>
                    <option value='redes_sociais'>Redes sociais</option>
                </select>
            </div>
            <p className={styles.indicacao}>Selecione as Tecnologias usadas:</p>
            <div className={styles.checkboxContent}>
                {strAscending.map((item, index) => (
                    <div key={index} className={styles.boxItems}>
                        <input value={item} type='checkbox' onChange={handleCheck} />
                        <span className={styles.meuSpan}>{item}</span>            
                    </div>
                ))}
            </div>
            <div>
                <input type="submit" value="Criar projeto"/>
            </div>
        </form>
    )
}

export default ProjectForm