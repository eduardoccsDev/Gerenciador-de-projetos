import { useState } from "react"
import Input from "../form/Input"
import styles from "../project/ProjectForm.module.css"
import SubmitButton from "../form/SubmitButton"
function ServiceForm({handleSubmit, textBtb, projetoData}){

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projetoData.services.push(service)
        handleSubmit(projetoData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
        <form className={styles.form} onSubmit={submit}>
                <Input
                type="text"
                text="Nome do serviço"
                placeholder="Insira o nome do serviço"
                name="nameServico"
                required="required"
                handleOnChange={handleChange}
                />
                <Input
                type="number"
                text="Custo do serviço"
                placeholder="Insira o valor total"
                name="cost"
                required="required"
                handleOnChange={handleChange}
                />
                <Input
                type="text"
                text="Descrição do serviço"
                placeholder="Breve descrição do serviço"
                name="descricao"
                required="required"
                handleOnChange={handleChange}
                />
                <SubmitButton
                text={textBtb}
                />
        </form>
    )
}
export default ServiceForm