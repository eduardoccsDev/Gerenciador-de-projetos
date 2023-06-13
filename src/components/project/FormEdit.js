import { useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import InputRadio from "../form/InputRadio";
import SubmitButton from "../form/SubmitButton";
import styles from "./FormEdit.module.css"

function FormEdit({nome, id,orcamento, categorias, valorSelected, prioridades, referencia, handleSubmit, handleOnChangeRadio, handleOnChange}){
    

    return(
        <form ref={referencia} className={styles.form} onSubmit={handleSubmit}>
            <input id="ID" type="text" name="id" value={id} style={{display:"none"}}/>
            <Input
                type='text'
                name='nome'
                text='Nome do projeto'
                placeholder='Insira o nome do projeto'
                value={nome} />
            <Input
                type='number'
                name='orcamento'
                text='Orçamento do projeto'
                placeholder='Insira o orçamento total'
                min='0'
                value={orcamento} />
            <Select
                name='categoria'
                handleOnChange={handleOnChange}
                text='Categoria do projeto'
                options={categorias}
                value={valorSelected} />
            <InputRadio
                options={prioridades}
                handleOnChange={handleOnChangeRadio}
                />
            <div className={styles.btnSubmit}>
                <SubmitButton
                    text="Salvar" />
            </div>
        </form>
    )
}
export default FormEdit