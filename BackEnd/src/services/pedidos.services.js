const Pedido = require("../models/pedidos.models");
const Produto = require("../models/produtos.models");

const criarPedido = async (pedido) => {
  try {
    // Cria o pedido no banco de dados
    const novoPedido = await Pedido.create(pedido);

    return novoPedido;
  } catch (err) {
    console.error(err);
    throw new Error("Ocorreu um erro ao criar o pedido");
  }
};

const buscarPedidos = () => {
  return Pedido.find();
};

const buscarPedidoPorId = (id) => {
  return Pedido.findById(id).populate("produtos.produto");
};

const buscarPedidosPorCliente = (idCliente) => {
  return Pedido.find({ id_cliente: idCliente });
};

const updatePedido = (id, situacao_atual, valor_total) => {
  return Pedido.findOneAndUpdate({ _id: id }, { situacao_atual, valor_total });
};

const excluirPedido = (id) => {
  return Pedido.findByIdAndDelete(id);
};

async function validarProdutos(produtos) {
  const produtosEncontrados = await Produto.find({
    _id: { $in: produtos.map((produto) => produto.produto) },
  });
  const idsProdutosValidos = produtosEncontrados
    .filter((produto) => {
      const quantidade = produtos.find(
        (p) => p.produto.toString() === produto._id.toString()
      ).quantidade;
      return quantidade <= produto.qtd;
    })
    .map((produto) => produto._id);
  return idsProdutosValidos;
}

module.exports = {
  criarPedido,
  validarProdutos,
  buscarPedidos,
  buscarPedidoPorId,
  buscarPedidosPorCliente,
  updatePedido,
  excluirPedido,
};
