import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  // Metodo para listar livros
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find(); // guarda a query do monggose busca livros

      req.resultado = buscaLivros; // Guarda e envia um requisição para outro middlewares

      next();
    }
    catch (erro) {
      next(erro);
    }
  };

  // Metodo para listar um livro por id
  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livrosResultados = await livros.findById(id);

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
  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        // Busca usando a sintaxe do proprio mongoDB para fazer o filtro
        const livrosResultado =  livros
          .find(busca);

        req.resultado = livrosResultado;

        next();
      }
      else {
        res.status(200).send([]);
      }
     
    }
    catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  
  const { editora, titulo, minPagina, maxPagina, nomeAutor } = parametros;
  /*
  // regex para busca dinamica nativa do JS o RegExp
  const regex = new RegExp(titulo, "i");
  */

  // Ojeto vazio
  let busca = {};

  // Condicionais ´para prencher o objeto a cima vazio caso ele exista
  if (editora ) busca.editora = editora;
  if (titulo) busca.titulo = {$regex: titulo, $options: "i"}; // Usando a sintaxe do mongoDb para buscas com regex

  // Inicia o numPaginas como um objeto vazio deixando dinamico 
  if(minPagina || maxPagina) busca.numeroPaginas = {};

  // Operadores de busca do mongoDB
  // Mior ou igual que 
  if (minPagina) busca.numeroPaginas.$gte = minPagina;
  // Menor ou igual que
  if (maxPagina) busca.numeroPaginas.$lte = maxPagina;

  if (nomeAutor) {
    // Busca o objeto de busca
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null){
      // busca recebe o id do autor
      busca.autor = autor._id;
    }
    else {
      busca = null;
    }

  }

  return busca;
}


export default LivroController;