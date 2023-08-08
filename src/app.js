import express from "express"; // Importanto o express
import db from "./config/dbConnect.js"; // Importa a conexão do arquivo dbConnec.js e testar ela
import routes from "./routes/index.js"; // Importa o arqquivo index.js
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.logg.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Concexão com o banco feita com sucesso!");
});

const app = express(); // Importanto uma instancia do express
app.use(express.json()); // Transforma o objeto para manipualção
routes(app); // Instância as rotas para direcionalas

app.use(manipulador404); // Middlewares para tratar do erro 404

// Função para tratamento de erro
// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;