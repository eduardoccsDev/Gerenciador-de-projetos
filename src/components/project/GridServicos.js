import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./Grid.module.css"
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { motion } from "framer-motion";

const Grid = ({ servicos, setServicos, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/servicos" + id)
      .then(({ data }) => {
        const newArray = servicos.filter((servico) => servico.id !== id);

        setServicos(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };
  
  const [data, setData] = useState(" ");
  const excludeColumns = ['id', 'projetoId'];
  const [search, setSearch] = useState("");
  const handleChange = value => {
        setSearch(value);
        filterData(value);
  };

  const filterData = value =>{
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            setData(servicos);
        }
        else{
            const filteredData = servicos.filter(item => {
                return Object.keys(item).some(key =>{
                    return excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setData(filteredData);
        }
    }

  return (
    <div>
       <div className={styles.searchContainer}>
          <BiSearch/>
          <input 
          type="text" 
          className={styles.search}
          value={search} 
          placeholder="Buscar serviços..."
          onChange={e => handleChange(e.target.value)}
          />
      </div>
    <motion.table className={styles.table}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Custo</th>
          <th>Descrição</th>
          <th className={styles.seletores}>Editar</th>
          <th className={styles.seletores}>Deletar</th>
        </tr>
      </thead>
      <tbody>
      {!search ? 
        (
            servicos.length > 0 &&
            servicos.map((item, i) => (
              <tr key={i}>
                <td className={styles.metadeLargura}>{item.nomeServico}</td>
                <td className={styles.metadeLargura}>{item.cost}</td>
                <td className={styles.metadeLargura}>{item.descricaoServico}</td>
                <td className={styles.editar}>
                  <FaEdit onClick={() => handleEdit(item)} />
                </td>
                <td className={styles.deletar}>
                  <FaTrash onClick={() => handleDelete(item.id)} />
                </td>
              </tr>
            ))
        ):
        (
            servicos.length > 0 &&
                data.map((item, i) => (
                  <motion.tr key={i}>
                  <td className={styles.metadeLargura}>{item.nomeServico}</td>
                  <td className={styles.metadeLargura}>{item.cost}</td>
                  <td className={styles.metadeLargura}>{item.descricaoServico}</td>
                  <td className={styles.editar}>
                    <FaEdit onClick={() => handleEdit(item)} />
                  </td>
                  <td className={styles.deletar}>
                    <FaTrash onClick={() => handleDelete(item.id)} />
                  </td>
                </motion.tr>
            ))
            )
        }
        {data.length === 0 ? 
          (<motion.p className={styles.semRes}
            initial={{scale: 0}}
            animate={{scale:1}}
            exit={{scale:0}}
            transition={{ duration: 0.1 }}
          >Não há resultados para o que procura!</motion.p>)
          :
          (<></>)}
      </tbody>
    </motion.table>
    </div>
  );
};

export default Grid;