import styles from './Select.module.css'
function Select({name, value,text, handleOnChange, options}){

    return(
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value}>
                <option disabled value=''>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name || option.nomePrioridade}</option>
                ))}
            </select>
        </div>
    )
}

export default Select