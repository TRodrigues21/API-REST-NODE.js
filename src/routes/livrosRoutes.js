import  express  from "express"; // Impporta o express
import LivroController from "../controllers/livrosController.js"; // Importa o arquivo livrosCOntroller.js

const router = express.Router(); // Instancia o Router do express

// Rotas
router
// Manter em ordem da mais expecifica para menos especifica
  .get("/livros", LivroController.listarLivros) // Rota para listar livros
  .get("/livros/busca", LivroController.listarLivroPorEditora) // Rota para listar livro por editora
  .get("/livros/:id", LivroController.listarLivroPorId) // Rota para listar livro por id
  .post("/livros", LivroController.cadastrarLivro) // Rota para cadastrar livros
  .put("/livros/:id", LivroController.atualizarLivro) // Rota par atualizar livro por id
  .delete("/livros/:id", LivroController.excluirLivro);

export default router; // Exporta