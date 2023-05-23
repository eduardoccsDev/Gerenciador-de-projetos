import styles from './Pages.module.css';
function NovoProjeto(){
    return(
        <div>
        <div className={styles.tittle}>
             <h1>Novo Projeto</h1>
        </div>
        
         <p className={styles.content}>Conteúdo da página</p>
     </div>
    )
}

export default NovoProjeto