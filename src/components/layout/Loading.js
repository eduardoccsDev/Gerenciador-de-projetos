import styles from './Loading.module.css';
import Loading from '../../img/loading-svgrepo-com.svg'

function LinkButton({to, text}){
    return(
        <div className={styles.loaderContainer}>
            <img className={styles.loader} src={Loading} alt='Loading'/>
        </div>
    )

}
export default LinkButton