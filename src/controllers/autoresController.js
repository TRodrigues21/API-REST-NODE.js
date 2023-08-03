import mongoose from "mongoose";
import autores from "../models/Autor.js";


class AutorController {

  // Metodos
  // Ultilizando metodo assicronos com async/await
  // Usando try/catch para tratamento de erros

  // Metodo para listar autores
  static listarAutores = async (req, res) => {
    try { // caso de sucesso
      const autoresResultado = await autores.find(); 
  
      res.status(200).jason(autoresResultado);
    }
    catch (erro) { // caso de erro
      res.status(500).json({message: "Erro interno no servido!"});
    }
  };

  // Metodo para listar um livro por id
  static listarAutorPorId = async (req, res) => { 
    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);

      if (autorResultado != null) {
        res.status(200).send(autorResultado);
      }
      else {
        res.status(404).send({message: " - Id do autor não localizado"});
      }
    }
    catch (erro) {
      if (erro instanceof mongoose.Error.CastError) {
        res.atatus(400).send({message: "Dados incorretos"});
      }
      else {
        res.status(500).send({message: "Erro intero de servidor!"});
      }
    }
  };

  // Metodo para cadastrar livro
  static cadastrarAutor = async (req, res) => {
    try {
      let autor  = new autores(req.body); // Cadastrar um novo livro conforme o que veio no copo da requisição

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON()); //toJSON converte em json e enviat ao isuario
    }
    catch (erro) {
      res.status(500).send({message: `${erro.message} - falha ao cadastrar autor.`});
    }
  };

  // Metodo para atualizar um livro por id
  static atualizarAutor = async (req, res) => {
    try{
      const id = req.params.id; // passa por parametro o id do livro a ser cadastrado
      
      await autores.findByIdAndUpdate(id, {$set: req.body});
    }
    catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  // Metodo para escluir um livro por id
  static excluirAutor = async (req, res) => {
    try{
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor removido com sucesso!"});
    }
    catch (erro) {
      res.status(500).send({message: `${erro.message} - Id do autor não localizado`});

    }
  };
}

export default AutorController;