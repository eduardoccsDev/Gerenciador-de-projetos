import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./Grid.module.css"
import { TbPoint } from "react-icons/tb"

const Grid = ({ categorias, setCategorias, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/categorias" + id)
      .then(({ data }) => {
        const newArray = categorias.filter((categoria) => categoria.id !== id);

        setCategorias(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th className={styles.seletores}>Editar</th>
          <th className={styles.seletores}>Deletar</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((item, i) => (
          <tr key={i}>
            <td className={styles.metadeLargura}><TbPoint/>{item.name}</td>
            <td className={styles.metadeLargura}>{item.descricao}</td>
            <td className={styles.editar}>
              <FaEdit onClick={() => handleEdit(item)} />
            </td>
            <td className={styles.deletar}>
              <FaTrash onClick={() => handleDelete(item.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
