import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./FormCat.module.css"

const Form = ({ getServicos, onEdit, setOnEdit, projetoIdValue }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const servicos = ref.current;

      servicos.nomeServico.value = onEdit.nomeServico;
      servicos.cost.value = onEdit.cost;
      servicos.descricaoServico.value = onEdit.descricaoServico;
      servicos.projetoID.value = onEdit.projetoId;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const servicos = ref.current;

    if (
      !servicos.nomeServico.value ||
      !servicos.cost.value ||
      !servicos.descricaoServico.value ||
      !servicos.projetoID.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/servicos" + onEdit.id, {
          nomeServico: servicos.nomeServico.value,
          cost: servicos.cost.value,
          descricaoServico: servicos.descricaoServico.value,
          projetoID: servicos.projetoID.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/servicos", {
            nomeServico: servicos.nomeServico.value,
            cost: servicos.cost.value,
            descricaoServico: servicos.descricaoServico.value,
            projetoID: servicos.projetoID.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    servicos.nomeServico.value = "";
    servicos.cost.value = "";
    servicos.descricaoServico.value = "";
    servicos.projetoID.value = "";

    setOnEdit(null);
    getServicos();
  };

  return (
    <form ref={ref} className={styles.formCat} onSubmit={handleSubmit}>
      <input type="text" style={{display:"none"}} name="projetoID" value={projetoIdValue}/>
      <Input
      name="nomeServico"
      placeholder="Adicione o nome do serviço"
      text="Nome do serviço:"
      type="text"
      />
      <Input
      name="cost"
      placeholder="Adicione o custo do serviço"
      text="Custo do serviço:"
      type="number"
      />
      <Input
      name="descricaoServico"
      placeholder="Descrição"
      text="Breve descrição do serviço:"
      type="text"
      />
      <SubmitButton
      text="Salvar"
      />
    </form>
  );
};

export default Form;
