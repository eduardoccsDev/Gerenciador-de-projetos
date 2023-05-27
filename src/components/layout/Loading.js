import styles from './Loading.module.css';
import LoadingSvg from '../../img/loading-svgrepo-com.svg'

function Loading(){
    return(
        <div className={styles.loaderContainer}>
            <img className={styles.loader} src={LoadingSvg} alt='Loading'/>
        </div>
    )

}
export default Loading