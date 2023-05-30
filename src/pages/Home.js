import styles from './Home.module.css';
import Savings from '../img/logo.png'
import LinkButton from '../components/layout/LinkButton';
import { motion } from 'framer-motion';

function Home(){
    return(
        <motion.section 
        className={styles.PageContainerHome}
        key='home'
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{ duration: 1 }}
        
        >            
            <h1>Bem-vindo ao <span className={styles.destaque}>Gerenciador de projetos</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/novoprojeto' text="Criar projeto"/>
            <img src={Savings} alt="Gerenciador de projetos"/>        
        </motion.section>
    )
}

export default Home