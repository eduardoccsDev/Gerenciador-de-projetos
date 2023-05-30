import { motion } from 'framer-motion';

function Contato(){
    return(
        <motion.div
        key='contato'
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{ duration: 1 }}
        >
           <div >
                <h1>Contato</h1>
           </div>
           
            <p >Conteúdo de contato</p>
        </motion.div>
    )
}

export default Contato