import ProjectForm from "../components/project/ProjectForm"
import styles from "./NovoProjeto.module.css"
import { IoCreateOutline } from 'react-icons/io5';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion';
function NovoProjeto(){
    return(
        <motion.div 
        className={styles.PageContainerNovoProjeto} 
        initial={{scale: 0}}
        animate={{scale:1}}
        exit={{scale:0}}
        transition={{ duration: 0.1 }}
        >
            <div className={styles.Box}>
                <div className={styles.boxForm}>
                    <h1>Criar Projeto <IoCreateOutline/></h1>
                    <p>Crie seu projeto para depois adicionar os serviços.</p>
                    <ProjectForm btnText='Criar Projeto'/>
                    <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
                </div>
            </div>
        </motion.div>
    )
}
export default NovoProjeto