import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
    return (
      <Router>
        <NavBar/>
          <AnimatedRoutes/>
        <Footer/>
      </Router>
  )
}

export default App;