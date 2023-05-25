import styles from './SubmitButton.module.css'
import { IoCreate } from 'react-icons/io5';
function SubmitButton({text}){

    return(
        <div >
            <button className={styles.btn} type="submit"><IoCreate/>{text}</button>
        </div>
    )
}

export default SubmitButton