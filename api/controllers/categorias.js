import { db } from "../db.js";

export const getCategorias = (_, res) => {
    const q = "SELECT * FROM categorias ORDER BY name ASC";
  
    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      return res.status(200).json(data);
    });
  };
  
  export const addCategoria = (req, res) => {
    const q =
      "INSERT INTO categorias (`name`, `descricao`) VALUES(?)";
  
    const values = [
      req.body.name,
      req.body.descricao,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Categoria criada com sucesso.");
    });
  };
  
  export const updateCategoria = (req, res) => {
    const q =
      "UPDATE categorias SET `name` = ?, `descricao` = ? WHERE `id` = ?";
  
    const values = [
      req.body.name,
      req.body.descricao,
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Categoria atualizada com sucesso.");
    });
  };
  
  export const deleteCategoria = (req, res) => {
    const q = "DELETE FROM categorias WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Categoria deletada com sucesso.");
    });
  };
  