const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
    unique: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  qtd: {
    type: Number,
    required: true,
  },
  imgProduto: {
    type: String,
    required: true,
  },
});

const Produto = mongoose.model("Produto", ProdutoSchema);

module.exports = Produto;
