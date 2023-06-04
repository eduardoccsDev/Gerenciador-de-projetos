import styles from "./ProjectCard.module.css"
import { Link } from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import UINumber from "../layout/UINumber";
import { motion } from "framer-motion";
function Projetos({id, nomeProjeto, orcamento, category, cor , handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(

            <motion.div 
            className={styles.projectCard} 
            key={id}
            initial={{scale: 0}}
            animate={{scale:1}}
            exit={{scale:0}}
            transition={{ duration: 0.1 }}
            >
                <h4 className={`${styles[category.toLowerCase()]}`}>
                    {nomeProjeto}
                </h4>
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
                    <Link to={`/projeto/${id}`}>
                        <BsPencil/> Editar
                    </Link>
                    <button onClick={remove}>
                        <BsFillTrashFill/> Excluir
                    </button>
                </div>
            </motion.div>

    )
}
export default Projetos