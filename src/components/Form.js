import { useState } from 'react'
function Form(){

    function cadastrarUsuario(e){
        e.preventDefault()
        console.log('Usuario cadastrado')
        console.log(`Usuario: ${name} | Senha: ${password}`)
        
    }

    const [name, setName] = useState()
    const [password, setPassword] = useState()


    return(
        <>
        <h1>Meu cadastro:</h1>
        <form onSubmit={cadastrarUsuario}>
            <div>
                <label htmlFor='name'>Nome: </label>
                <input type='text' onChange={(e) => setName(e.target.value)} id='name' required='required' placeholder='Digite seu nome'></input>
            </div>
            <div>
                <label htmlFor='senha'>Senha: </label>
                <input type='password' onChange={(e) => setPassword(e.target.value)} id='senha' required='required' placeholder='Digite sua senha'></input>
            </div>
            <div>
                <input type='submit' value='Cadastrar'></input>
            </div>
        </form>
        </>
    )

}
export default Form