const { default: mongoose } = require("mongoose");
const pedidosServices = require("../services/pedidos.services");
const userServices = require("../services/user.services");
const Pedido = require("../models/pedidos.models");

const create = async (req, res) => {
  try {
    const { id_cliente, produtos } = req.body;

    // Verifica se o usuário existe
    const user = await userServices.buscarPorIdServices(id_cliente);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica se todos os produtos têm o campo "produto" definido
    const produtosValidos = produtos.every((produto) => produto.produto);
    if (!produtosValidos) {
      return res.status(400).json({
        message: "Campo 'produto' é obrigatório para todos os produtos",
      });
    }

    // Cria o objeto do pedido com base nas informações recebidas
    const pedido = {
      id_cliente: user._id,
      produtos: produtos.map((produto) => ({
        produto: produto.produto,
        quantidade: produto.quantidade,
        preco: produto.preco,
        descricao: produto.descricao,
        name: produto.name,
      })),
      data_pedido: Date.now(),
      situacao_atual: "Pendente",
      valor_total: produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.preco,
        0
      ),
    };

    // Cria o pedido no banco de dados utilizando o serviço de pedidos
    const novoPedido = await pedidosServices.criarPedido(pedido);

    // Retorna o novo pedido criado
    res.status(201).json(novoPedido);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ocorreu um erro ao criar o pedido" });
  }
};

const buscarPedidos = async (req, res) => {
  try {
    const pedidos = await pedidosServices.buscarPedidos();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar um pedido pelo ID
const buscarPedidoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const pedido = await pedidosServices.buscarPedidoPorId(id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }
    res.status(200).json(pedido);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ocorreu um erro ao buscar o pedido" });
  }
};

//BUscar pedido por ID do cliente
const listarPedidosPorCliente = async (req, res) => {
  const idCliente = req.params.id_cliente;
  console.log(idCliente);

  try {
    const pedidos = await Pedido.find({ id_cliente: idCliente });

    console.log("cheguei aqui");

    if (pedidos.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum pedido encontrado para este cliente" });
    } else {
      console.log("cheguei aqui");
      res.status(200).json(pedidos);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao buscar os pedidos" });
  }
};

// Atualizar um pedido existente
const updatePedido = async (req, res) => {
  const id = req.params.id;
  const { id_cliente, id_produtos, situacao_atual, valor_total } = req.body;

  try {
    // Atualizar as informações do pedido
    const pedidoAtualizado = await pedidosServices.updatePedido({
      id,
      id_cliente,
      id_produtos,
      situacao_atual,
      valor_total,
    });

    if (!pedidoAtualizado) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    res.status(200).json({
      message: "Pedido atualizado com sucesso.",
      pedido: pedidoAtualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro ao atualizar pedido." });
  }
};

// Deletar um pedido existente
const deletePedido = async (req, res) => {
  const id = req.params.id;
  try {
    const pedido = await pedidosServices.buscarPedidoPorId(id);

    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    await pedidosServices.excluirPedido(id);

    return res.status(200).json({ message: "Pedido excluído com sucesso." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro ao excluir pedido." });
  }
};

module.exports = {
  create,
  buscarPedidos,
  buscarPedidoPorId,
  listarPedidosPorCliente,
  updatePedido,
  deletePedido,
};
