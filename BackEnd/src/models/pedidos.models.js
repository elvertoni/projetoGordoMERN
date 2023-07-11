const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  produtos: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto",
        required: true,
      },
      qtd: {
        type: Number,
        required: true,
        min: 1,
      },
      preco: {
        type: Number,
        required: true,
        min: 1,
      },
      descricao: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
    },
  ],
  data_pedido: {
    type: Date,
    required: true,
    default: Date.now,
  },
  situacao_atual: {
    type: String,
    required: true,
    enum: ["Pendente", "Pago", "Entregue", "Cancelado"],
    default: "Pendente",
  },
  valor_total: {
    type: Number,
    min: 0,
    required: true,
  },
});

const Pedido = mongoose.model("Pedido", PedidoSchema);

module.exports = Pedido;
