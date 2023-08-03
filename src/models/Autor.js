import mongoose from "mongoose";


const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    Nome: {type: String, require: true},
    nacionlaidade: {type: String, require: true}
  },
  {
    versionKey: false
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;