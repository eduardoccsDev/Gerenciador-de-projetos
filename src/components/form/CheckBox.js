function CheckBox({item,handleOnChange }){

    return(
        <>
            <input value={item} type='checkbox' onChange={handleOnChange} />
            <span>{item}</span>            
        </>
    )
}

export default CheckBox