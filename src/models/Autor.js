import mongoose from "mongoose";


const autorSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    Nome: {
      type: String, 
      require: [true, "O nome do(a) da autor(a) é obrigatório!"]
    },
    nacionlaidade: {
      type: String, 
    }
  },
  {
    versionKey: false
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;