import autores from "../models/Autor.js";

class AutorController {

  // Metodo para listar autores
  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  };

  // Metodo para listar um livro por id
  static listarAutorPorId = (req, res) => {
    const id = req.params.id;

    autores.findById(id, (err, autores) => { // findById so pra buscar por id
      if(err) {
        res.status(400).send({message: `${err.message} - Id do autor não localizado`});
      }
      else {
        res.status(200).send(autores);
      }
    });
  };

  // Metodo para cadastrar livro
  static cadastrarAutor = (req, res) => {
    let autor  = new autores(req.body); // Cadastrar um novo livro conforme o que veio no copo da requisição

    autor.save((err) => { // Persiste ele no banco e verifica se foi cadatsrado ou não

      if(err) { // Caso de erro ao cadastrar livro
        // Respota de erro
        res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`});
      }
      else { // Em caso de sucesso
        // Resposta de sucesso
        res.status(201).send(autor.toJSON()); //toJSON converte em json e enviat ao isuario
      }
    });
  };

  // Metodo para atualizar um livro por id
  static atualizarAutor = (req, res) => {

    const id = req.params.id; // passa por parametro o id do livro a ser cadastrado

    autores.findByIdAndUpdate(id, {$set: req.body}, (err) =>{ // Busca o livro por id e altera ele pelos dados no corpo da requisição
      if(!err) { // Caso de sucesso
        res.status(200).send({message: "Autor atualizado com sucesso!"});
      }
      else { // Caso de erro
        res.status(500).send({message: err.message});
      }
    });
  };

  // Metodo para escluir um livro por id
  static excluirAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndDelete(id, (err) => {
      if(!err) {
        res.status(200).send({message: "Autor removido com sucesso!"});
      }
      else {
        res.status(500).send({message: `${err.message} - Id do autor não localizado`});
      }
    });

  };


}

export default AutorController;