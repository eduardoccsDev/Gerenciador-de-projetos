import styles from "./CheckBox.module.css"
function CheckBox({handleOnChange, cssClass, boxes }){

   return(
        <>
        {boxes.map((boxes) => (
            <div className={cssClass}>         
                    <input 
                    value={boxes.nameTec} 
                    type='checkbox'
                    key={boxes.id} 
                    onChange={handleOnChange} />
                    <label className={styles.nameTec}>{boxes.name}</label>            
            </div>
                ))}
        </>
    )
}

export default CheckBox