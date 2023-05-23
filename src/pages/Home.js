import styles from './Pages.module.css';
function Home(){
    return(
        <div>
        <div className={styles.tittle}>
             <h1>Home</h1>
        </div>
        
         <p className={styles.content}>Conteúdo da home</p>
     </div>
    )
}

export default Home