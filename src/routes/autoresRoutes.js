import  express  from "express"; // Impporta o express
import AutorController from "../controllers/autoresController.js"; // Importa o arquivo autorsCOntroller.js

const router = express.Router(); // Instancia o Router do express

// Rotas
router
  .get("/autores", AutorController.listarAutores) // Rota para listar autors
  .get("/autores/:id", AutorController.listarAutorPorId) // Rota para listar autor por id
  .post("/autores", AutorController.cadastrarAutor) // Rota para cadastrar autors
  .put("/autores/:id", AutorController.atualizarAutor) // Rota par atualizar autor por id
  .delete("/autores/:id", AutorController.excluirAutor);

export default router; // Exporta