import styles from './Input.module.css'
function Input({type,max, min, name, value, text, placeholder, handleOnChange, required}){

    return(
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}</label>
            <input 
            type={type}
            id={name}
            name={name}            
            value={value} 
            placeholder={placeholder} 
            onChange={handleOnChange}
            required={required}
            max={max}
            min={min}
             />
        </div>
    )
}

export default Input