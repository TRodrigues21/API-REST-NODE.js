import "dotenv/config";// Permite que o dotenv faça a configuação de suas variaveis de ambiente 
import app from "./src/app.js"; // Importa o app do arquivo app.js

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});