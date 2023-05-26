import styles from "./ProjectCard.module.css"
import { Link } from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
function Projetos({id, nomeProjeto, orcamento, category, handleRemove}){
    return(
        <div className={styles.projectCard}>
            <h4>{nomeProjeto}</h4>
            <p className={styles.orcamento}>
                <span>Orçamento: </span> R$ {orcamento}
            </p>
            <p className={styles.categoryText}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.projectCardActions}>
                <Link to='/'>
                    <BsPencil/> Editar
                </Link>
                <button>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default Projetos