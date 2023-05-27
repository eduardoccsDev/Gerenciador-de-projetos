import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from './pages/Home';
import Empresa from './pages/Empresa';
import Contato from './pages/Contato';
import Projetos from "./pages/Projetos";
import NovoProjeto from "./pages/NovoProjeto";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Projeto from './pages/projeto'



function App() {  
    return (
      <Router>
        <NavBar/>
          <Container customClass='minHeight'>
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route path='/empresa' element={<Empresa />}/>
                <Route path='/projetos' element={<Projetos />}/>
                <Route path='/contato' element={<Contato />}/>
                <Route path='/novoprojeto' element={<NovoProjeto />}/>
                <Route path='/projeto/:id' element={<Projeto />}/>
              </Routes>
          </Container>
        <Footer/>
      </Router>
  )
}

export default App;
