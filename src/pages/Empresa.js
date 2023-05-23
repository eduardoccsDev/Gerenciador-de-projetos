import styles from './Pages.module.css';
function Empresa(){
    return(
        <div>
        <div className={styles.tittle}>
             <h1>Empresa</h1>
        </div>
        
         <p className={styles.content}>Conteúdo da empresa</p>
     </div>
    )
}

export default Empresa