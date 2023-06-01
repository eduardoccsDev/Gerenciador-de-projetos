import Form from "../components/project/FormCat";
import Grid from "../components/project/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Container from "../components/layout/Container";
import styles from "./Empresa.module.css"
import ReturnBtn from "../components/layout/ReturnBtn";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:8800/categorias");
      setCategorias(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCategorias();
  }, [setCategorias]);

  return (
      <Container customClass='column'>
        <div className={styles.container}>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getCategorias={getCategorias} />
          <Grid setOnEdit={setOnEdit} categorias={categorias} setCategorias={setCategorias} />
          <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
        </div>
        <ReturnBtn
         texto = "Voltar"
        />
      </Container>
  );
}

export default Categorias;