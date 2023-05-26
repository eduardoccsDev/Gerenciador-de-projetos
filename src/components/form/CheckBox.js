import styles from "./CheckBox.module.css"
function CheckBox({handleOnChange, cssClass, boxes }){

   return(
        <>
        {boxes.map((box) => (
            <div key={box.id} className={cssClass}>         
                    <input 
                    value={box.name}
                    id={box.id} 
                    key={box.id} 
                    type='checkbox' 
                    onChange={handleOnChange} />
                    <label className={styles.nameTec} htmlFor={box.id}>{box.name}</label>            
            </div>
                ))}
        </>
    )
}

export default CheckBox