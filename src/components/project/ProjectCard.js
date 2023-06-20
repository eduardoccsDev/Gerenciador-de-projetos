import styles from "./ProjectCard.module.css"
import { BsPencil, BsFillTrashFill} from "react-icons/bs";
import { AiFillAlert } from "react-icons/ai"
import UINumber from "../layout/UINumber";
import { motion } from "framer-motion";
function Projetos({id, prioridade, corPrioridade ,nomeProjeto,orcamento, category, cor , handleEdit , handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    function edit(){
        handleEdit()
    }

    return(

            <motion.div 
            id={id}
            className={styles.projectCard} 
            initial={{scale: 0}}
            animate={{scale:1}}
            exit={{scale:0}}
            transition={{ duration: 0.1 }}
            >
                <div className={styles.titleContainer}>
                    <h4>
                        {nomeProjeto}
                    </h4>
                    <button onClick={remove}>
                        <BsFillTrashFill/>
                    </button>
                </div>
                <p style={{color:corPrioridade}}><AiFillAlert/>{prioridade}</p>
                <p className={styles.orcamento}>
                    <span>Orçamento: </span> R$ 
                    <UINumber format="0,0.00">
                        {orcamento}
                    </UINumber>
                </p>
                <p className={styles.categoryText}>
                    <span style={{backgroundColor:cor}}></span> {category}
                </p>
                <div className={styles.projectCardActions}>
                    <button className={styles.editBtn} onClick={edit}>
                        <BsPencil/> Editar
                    </button>
                </div>
            </motion.div>

    )
}
export default Projetos