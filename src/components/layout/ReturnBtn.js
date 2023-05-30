import { TbArrowBackUp } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import styles from "./ReturnBtn.module.css"
function ReturnBtn({texto}){
    
    const navigate = useNavigate();

    const handleGoBack = () =>{
        navigate(-1);
    }
    
    return(
        <>
            <button className={styles.btn} onClick={handleGoBack}><TbArrowBackUp/>{texto}</button>
        </>
    )
}
export default ReturnBtn