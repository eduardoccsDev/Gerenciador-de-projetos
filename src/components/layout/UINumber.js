import numeral from 'numeral'

function UINumber({format, children}){

    return(
        <>
        {numeral(children).format(format)}
        </>
    )

}
export default UINumber