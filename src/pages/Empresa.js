import { motion } from 'framer-motion';
function Empresa(){
    return(
        <motion.div
        key='empresa'
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{ duration: 1 }}
        >
            <div>
                <h1>Empresa</h1>
            </div>
            
            <p >Conteúdo da empresa</p>
        </motion.div>
    )
}

export default Empresa