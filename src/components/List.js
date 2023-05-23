import Item from './Item'
import styles from './List.module.css'
function List(){

    return(
        <>
            <h1>Minha lista</h1>
            <ul className={styles.listLista}>
                <Item marca='Ferrari' ano_lancamento={1999}/>
                <Item marca='BMW' ano_lancamento={2015}/>
                <Item marca='Ford' ano_lancamento={2000}/>
                <Item/>
            </ul>
        </>
    )

}
export default List