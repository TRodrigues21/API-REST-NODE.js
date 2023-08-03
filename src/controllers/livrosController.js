import livros from "../models/Livro.js";

class LivroController {

  // Metodo para listar livros
  static listarLivros = (req, res) => {
    livros.find()
      .populate("autor") // Pelo id do autor ele integra o objeto autor
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  // Metodo para listar um livro por id
  static listarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros.findById(id)
      .populate("autor", "nome") // Busca o autor e exebi apenas o id e nome do autor 
      .exec((err, livros) => { // findById so pra buscar por id
        if(err) {
          res.status(400).send({message: `${err.message} - Id do livro não localizado`});
        }
        else {
          res.status(200).send(livros);
        }
      });
  };

  // Metodo para cadastrar livro
  static cadastrarLivro = (req, res) => {
    let livro  = new livros(req.body); // Cadastrar um novo livro conforme o que veio no copo da requisição

    livro.save((err) => { // Persiste ele no banco e verifica se foi cadatsrado ou não

      if(err) { // Caso de erro ao cadastrar livro
        // Respota de erro
        res.status(500).send({message: `${err.message} - falha ao cadastrar o livro.`});
      }
      else { // Em caso de sucesso
        // Resposta de sucesso
        res.status(201).send(livros.toJSON()); //toJSON converte em json e enviat ao isuario
      }
    });
  };

  // Metodo para atualizar um livro por id
  static atualizarLivro = (req, res) => {

    const id = req.params.id; // Busca pelo id e atualiza

    livros.findByIdAndUpdate(id, {$set: req.body}, (err) =>{ // Busca o livro por id e altera ele pelos dados no corpo da requisição
      if(!err) { // Caso de sucesso
        res.status(200).send({message: "Livro atualizado com sucesso!"});
      }
      else { // Caso de erro
        res.status(500).send({message: err.message});
      }
    });
  };

  // Metodo para escluir um livro por id
  static excluirLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err) => { // Busca pelo id e deleta
      if(!err) {
        res.status(200).send({message: "Livro removido com sucesso!"});
      }
      else {
        res.status(500).send({message: `${err.message} - Id do livro não localizado`});
      }
    });

  };

  // Metodo de busca por editora usando req.query
  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora;

    livros.find({"editora": editora}, {}, (err, livros) => { // Busca o livro pelo parametro query passado na url
      res.status(200).send(livros);
    });
  };


}

export default LivroController;