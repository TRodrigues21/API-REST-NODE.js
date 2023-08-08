import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  // Metodos
  // Ultilizando metodo assicronos com async/await
  // Usando try/catch para tratamento de erros

  // Metodo para listar autores
  static listarAutores = async (req, res, next) => {
    try { // caso de sucesso
      const autoresResultado = await autores.find(); 
  
      res.status(200).jason(autoresResultado);
    }
    catch (erro) { // caso de erro
      next(erro);
    }
  };

  // Metodo para listar um livro por id
  static listarAutorPorId = async (req, res, next) => { 
    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      }
      else {
        next(new NaoEncontrado("Id do autor não localizado!"));
      }
    }
    catch (erro) {
      next(erro);
    }
  };

  // Metodo para cadastrar livro
  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor  = new autores(req.body); // Cadastrar um novo livro conforme o que veio no copo da requisição

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON()); //toJSON converte em json e enviat ao isuario
    }
    catch (erro) {
      next(erro);
    }
  };

  // Metodo para atualizar um livro por id
  static atualizarAutor = async (req, res, next) => {
    try{
      const id = req.params.id; // passa por parametro o id do livro a ser cadastrado
      
      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if(autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso!"});
      }
      else {
        next(new NaoEncontrado("Id do Autor não localizado!"));
      }
    }
    catch (erro) {
      next(erro);
    }
  };

  // Metodo para escluir um livro por id
  static excluirAutor = async (req, res, next) => {
    try{

      const id = req.params.id;

      const autorResultado =  await autores.findByIdAndDelete(id);

      if(autorResultado !== null){
        res.status(200).send({message: "Autor removido com sucesso!"});
      }
      else {
        next(new NaoEncontrado("Id do Autor não localizado!"));
      }
    }
    catch (erro) {
      next(erro);

    }
  };
}

export default AutorController;