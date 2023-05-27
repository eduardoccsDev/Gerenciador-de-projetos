import styles from "./ProjectCard.module.css"
import { Link } from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import UINumber from "../layout/UINumber";
function Projetos({id, nomeProjeto, orcamento, category, handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.projectCard} key={id}>
            <h4 className={`${styles[category.split(" ").join("").toLowerCase()]}`}><div className={styles.imgProjeto}></div>{nomeProjeto}</h4>
            <p className={styles.orcamento}>
                <span>Orçamento: </span> R$ 
                <UINumber format="0,0.00">
                    {orcamento}
                </UINumber>
            </p>
            <p className={styles.categoryText}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.projectCardActions}>
                <Link to={`/projeto/${id}`}>
                    <BsPencil/> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}
export default Projetos