import { Routes, Route, useLocation  } from "react-router-dom";
import Home from '../pages/Home';
import Categorias from '../pages/Categorias';
import Contato from '../pages/Contato';
import Projetos from "../pages/Projetos";
import NovoProjeto from "../pages/NovoProjeto";
import Container from "../components/layout/Container";

import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes(){
    const location = useLocation(); 
    return(
        <AnimatePresence>
            <Container customClass='minHeight'>
                <Routes location={location} key={location.pathname}>
                    <Route exact path='/' element={<Home />}/>
                    <Route path='/categorias' element={<Categorias />}/>
                    <Route path='/projetos' element={<Projetos />}/>
                    <Route path='/contato' element={<Contato />}/>
                    <Route path='/novoprojeto' element={<NovoProjeto />}/>
                </Routes>
            </Container>
        </AnimatePresence>
    )
}
export default AnimatedRoutes