import styles from './Home.module.css';
import Savings from '../img/logo.png'
import LinkButton from '../components/layout/LinkButton';
function Home(){
    return(
        <section className={styles.PageContainerHome}>            
            <h1>Bem-vindo ao <span className={styles.destaque}>Gerenciador de projetos</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/novoprojeto' text="Criar projeto"/>
            <img src={Savings} alt="Gerenciador de projetos"/>        
        </section>
    )
}

export default Home