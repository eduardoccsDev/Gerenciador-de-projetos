import styles from "../project/ProjectCard.module.css"
import { BsFillTrashFill } from "react-icons/bs"
function ServiceCard({id, name, cost, descricao, handleRemove, key}){
    
    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id, cost)
    }
    
    return(
        <div className={styles.projectCard} key={key}>
            <h4>{name}</h4>
            <p>
                <span>Custo total: </span> {cost}
            </p>
            <p>{descricao}</p>
            <div className={styles.projectCardActions}>
                <button onClick={remove}>
                    <BsFillTrashFill/>
                    Excluir
                </button>
            </div>
        </div>
    )
}
export default ServiceCard