import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {

  // Metodo para listar livros
  static listarLivros = async (req, res, next) => {
    try {

      const livrosResultados = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultados);
    }
    catch (erro) {
      next(erro);
    }
  };

  // Metodo para listar um livro por id
  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livrosResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if(livrosResultados !== null) {
        res.status(200).send(livrosResultados);
      }
      else {
        next(new NaoEncontrado("Id do Livro não localizado!"));
      }
    }
    catch (erro) {
      next(erro);
    }
  };

  // Metodo para cadastrar livro
  static cadastrarLivro = async (req, res, next) => {
    try {
      let livros = new livros(req.body);

      const livroResultado = await livros(req.body);

      res.status(201).send(livroResultado.toJSON());
    }
    catch (erro) {
      next(erro);
    }
  };

  // Metodo para atualizar um livro por id
  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if(livroResultado !== null) {
        res.atatus(200).send({message: "Livro atualizado com sucesso!"});
      }
      else {
        next(new NaoEncontrado("Id do Livro não localizado!"));
      }

    }
    catch (erro) {
      next(erro);
    }
  };

  // Metodo para escluir um livro por id
  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if(livroResultado !== null){
        res.status(200).send({message: "Livro removido com sucesso!"});
      }
      else {
        next(new NaoEncontrado("Id do Livro não localizado!"));
      }
    }
    catch (erro) {
      next(erro);
    }
  };

  // Metodo de busca por editora usando req.query
  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.params.editora;

      const livroResultado = await livros.find({"editora": editora});

      res.status(200).send(livroResultado);
    }
    catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;