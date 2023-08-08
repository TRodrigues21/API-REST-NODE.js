import mongoose from "mongoose";
import autoPopulate from "mongoose-autopopulate";

// Schema Livros com alguns tratamentos de erros nativos do mongoose
const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      require: [true, "O título do livro é obrigatório!"]},
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:"autores", 
      require: [true, "O(a) autor(a) é obrigatório"],
      autoPopulate: {
        select: "nome"
      }
    },
    editora: {
      type: String, 
      require: [true, "A editora é obrigatória!"]
    },
    numeroPaginas: {
      type: Number,
      validate: { // Validação personalizada com mongoose validate e validator
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de página deve estar entre 10 e 5000. O valor fornecido: {VALUE}"
      },
    }
  }
);

livroSchema.plugin(autoPopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;