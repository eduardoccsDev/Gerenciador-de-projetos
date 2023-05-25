import styles from "./CheckBox.module.css"
function CheckBox({handleOnChange, cssClass, boxes }){

   return(
        <>
        {boxes.map((boxes) => (
            <div key={boxes.id} className={cssClass}>         
                    <input 
                    value={boxes.id}
                    id={boxes.id} 
                    key={boxes.id} 
                    type='checkbox' 
                    onChange={handleOnChange} />
                    <label className={styles.nameTec} htmlFor={boxes.id}>{boxes.name}</label>            
            </div>
                ))}
        </>
    )
}

export default CheckBox