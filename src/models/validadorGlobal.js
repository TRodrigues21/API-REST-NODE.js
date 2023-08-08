import mongoose from "mongosse";

// Validador global nativo do mongoose
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor.trim() !== "",
  message: ({ path }) => `O campo ${path} foi fornecido!`
});