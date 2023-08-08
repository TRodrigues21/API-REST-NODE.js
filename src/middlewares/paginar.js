import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar (req, res, next) {
  try {
        
    let {limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

    // Desistruturação do array ordenação
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado; // Pega o resultado da query

    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado.find()
      // metodo para paginação na busca
        .sot({ [campoOrdenacao]: ordem}) // Ordena os campos conforme os paremtros passados 
        .skip((pagina  -1) * limite ) // metodo .skip diz quantos livros vai se pulado
        .limit(limite) // metodo .limit para limitar os resultados
        .exec();

      res.status(200).json(resultadoPaginado);
    }
    else {
      next(new RequisicaoIncorreta());
    }
  }
  catch (erro) {
    next(erro);
  }
}

export default paginar;