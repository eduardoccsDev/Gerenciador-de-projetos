import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./FormCat.module.css"

const Form = ({ getCategorias, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const categoria = ref.current;

      categoria.name.value = onEdit.name;
      categoria.descricao.value = onEdit.descricao;
      categoria.cor.value = onEdit.cor;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoria = ref.current;

    if (
      !categoria.name.value ||
      !categoria.descricao.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/categorias" + onEdit.id, {
          name: categoria.name.value,
          descricao: categoria.descricao.value,
          cor: categoria.cor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/categorias", {
            name: categoria.name.value,
            descricao: categoria.descricao.value,
            cor: categoria.cor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    categoria.name.value = "";
    categoria.descricao.value = "";
    categoria.cor.value = "";

    setOnEdit(null);
    getCategorias();
  };

  return (
    <form ref={ref} className={styles.formCat} onSubmit={handleSubmit}>
      <Input
      name="name"
      placeholder="Adicione o nome da categoria"
      text="Nome da categoria:"
      />
      <Input
      name="descricao"
      placeholder="Descrição"
      text="Breve descrição da categoria:"
      type="textarea"
      />
      <div className={styles.sectionColor}>
        <p>Cor personalizada:</p>
        <div className={styles.colorContainer}>
        <Input
        name="cor"
        type="color"
        />
        </div>
      </div>
      <SubmitButton
      text="Salvar"
      />
    </form>
  );
};

export default Form;
