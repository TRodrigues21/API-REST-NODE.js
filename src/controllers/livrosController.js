import livros from "../models/Livro.js";

class LivroController {

  // Metodo para listar livros
  static listarLivros = async (req, res) => {
    try {
      const livrosResultados = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultados);
    }
    catch (erro) {
      res.status(500).json({message: "Erro intrno no servidor"});
    }
  };

  // Metodo para listar um livro por id
  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;

      const livrosResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      res.status(200).send(livrosResultados);

    }
    catch (erro) {
      res.status(400).send({message: `${erro.message} - Id do livro não localizado!`});
    }
  };

  // Metodo para cadastrar livro
  static cadastrarLivro = async (req, res) => {
    try {
      let livros = new livros(req.body);

      const livroResultado = await livros(req.body);

      res.status(201).send(livroResultado.toJSON());
    }
    catch (erro) {
      res.status(500).send({message: `${erro.message} - Falha ao cadastrar livro!`});
    }
  };

  // Metodo para atualizar um livro por id
  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, {$set: req.body});

      res.atatus(200).send({message: "Livro atualizado com sucesso!"});
    }
    catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  // Metodo para escluir um livro por id
  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndDelete(id);

      res.status(200).send({message: "Livro removido com sucesso!"});
    }
    catch (erro) {
      res.atatus(500).send({message: erro.message});
    }
  };

  // Metodo de busca por editora usando req.query
  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.params.editora;

      const livroResultado = await livros.find({"editora": editora});

      res.status(200).send(livroResultado);
    }
    catch (erro) {
      res.atatus(500).json({message: "Erro interno no servidor!"});
    }
  };
}

export default LivroController;