import styles from './Pages.module.css';

function Contato(){
    return(
        <div>
           <div className={styles.tittle}>
                <h1>Contato</h1>
           </div>
           
            <p className={styles.content}>Conteúdo de contato</p>
        </div>
    )
}

export default Contato