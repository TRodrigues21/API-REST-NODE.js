import express from "express";
import livros from "./livrosRoutes.js"; // Importação do que cada rota faz
import autores from "./autoresRoutes.js";

// Programação das rotas
const routes = (app) => {
  // Rota do home
  app.route("/").get((req, res) => {
    res.status(200).send({titulo: "Curso de Node.js"});
  });

  // Usando as outras rotas
  app.use(
    express.json(), // para trabalhar com arquivos json
    livros, // Rotas de livros
    autores // Rotas de autores
  );
};

export default routes; // exportação do arquivo