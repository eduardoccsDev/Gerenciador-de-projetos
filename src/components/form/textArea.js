import styles from "./textArea.module.css"
function TextArea({nome, placeholder, text, value}){
    return(
        <div className={styles.textareaContainer}>
            <label>{text}</label>
            <textarea 
            className={styles.textarea} 
            name={nome} 
            placeholder={placeholder}
            >
                {value}
            </textarea>
        </div>
    )
}
export default TextArea