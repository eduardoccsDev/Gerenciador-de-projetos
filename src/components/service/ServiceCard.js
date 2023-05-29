import styles from "../project/ProjectCard.module.css"
import stylesService from './ServiceCard.module.css'
import { BsFillTrashFill } from "react-icons/bs"
import UINumber from "../layout/UINumber"
import serviceImg from '../../img/services.svg'
function ServiceCard({id, name, cost, descricao, handleRemove}){
    
    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id, cost)
    }
    
    return(
        <div className={styles.projectCard}>
            <div className={stylesService.tittle}><img src={serviceImg}/><h4>{name}</h4></div>
            <p>
                <span>Custo total: </span> R$
                <UINumber format="0,0.00">
                    {cost}
                </UINumber>
            </p>
            <p className={stylesService.descricaoP}><span>Descição:</span></p>
            <p className={stylesService.descricao}>{descricao}</p>
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