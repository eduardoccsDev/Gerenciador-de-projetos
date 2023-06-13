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
      "INSERT INTO categorias (`name`, `descricao`, `cor`) VALUES(?)";
  
    const values = [
      req.body.name,
      req.body.descricao,
      req.body.cor,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Categoria criada com sucesso.");
    });
  };
  
  export const updateCategoria = (req, res) => {
    const q =
      "UPDATE categorias SET `name` = ?, `descricao` = ? , `cor` = ? WHERE `id` = ?";
  
    const values = [
      req.body.name,
      req.body.descricao,
      req.body.cor,
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
// ---------------------------------PROJETOS------------------------------------
  export const getProjetos = (_, res) => {
    const q = "SELECT projetos.id, projetos.descricaoProjeto ,projetos.prioridade, prioridades.corPrioridade ,projetos.nome, projetos.orcamento, projetos.categoria, categorias.name , categorias.cor FROM gdpdb.projetos INNER JOIN gdpdb.categorias ON projetos.categoria = categorias.id INNER JOIN gdpdb.prioridades ON projetos.prioridade = prioridades.nomePrioridade";
  
    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      return res.status(200).json(data);
    });
  };

  export const getProjetosUnico = (req, res) => {
    const q = "SELECT projetos.id, projetos.nome, projetos.orcamento, projetos.categoria, categorias.name , categorias.cor FROM projetos INNER JOIN categorias ON projetos.categoria = categorias.id WHERE `projetos.id` = ?";
    const values = [
      req.body.id,
    ];

    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Projeto atualizado com sucesso");
    });
  };

   export const addProjetos = (req, res) => {
    const q =
      "INSERT INTO projetos (`nome`, `orcamento`, `categoria`, `prioridade`) VALUES(?)";
  
    const values = [
      req.body.nome,
      req.body.orcamento,
      req.body.categoria,
      req.body.prioridade,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Projeto criado com sucesso.");
    });
  };
  
  export const updateProjetos = (req, res) => {
    const q =
      "UPDATE projetos SET `nome` = ?, `orcamento` = ? , `categoria` = ? , `prioridade` = ?, `descricaoProjeto` = ? WHERE `id` = ?";
  
    const values = [
      req.body.nome,
      req.body.orcamento,
      req.body.categoria,
      req.body.prioridade,
      req.body.descricaoProjeto,
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Projeto atualizado com sucesso.");
    });
  };
  
  export const deleteProjetos = (req, res) => {
    const q = "DELETE FROM projetos WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Projeto deletado com sucesso.");
    });
  };
  // ---------------------------------PRIORIDADES------------------------------------
  export const getPrioridades = (_, res) => {
    const q = "SELECT * FROM prioridades ORDER BY id ASC";
  
    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      return res.status(200).json(data);
    });
  };