const pedidosServices = require("../services/pedidos.services");
const userServices = require("../services/user.services");
const Pedido = require("../models/pedidos.models");
const Produto = require("../models/produtos.models");

const create = async (req, res) => {
  try {
    const { id_cliente, produtos } = req.body;

    const user = await userServices.buscarPorIdServices(id_cliente);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const produtosValidos = produtos.every((produto) => produto.produto);
    if (!produtosValidos) {
      return res.status(400).json({
        message: "Campo 'produto' é obrigatório para todos os produtos",
      });
    }

    const pedido = {
      id_cliente: user._id,
      produtos: produtos.map((produto) => ({
        produto: produto.produto,
        qtd: produto.qtd,
        preco: produto.preco,
        descricao: produto.descricao,
        name: produto.name,
      })),
      data_pedido: Date.now(),
      situacao_atual: "Pendente",
      valor_total: produtos.reduce(
        (total, produto) => total + produto.qtd * produto.preco,
        0
      ),
    };

    const novoPedido = await pedidosServices.criarPedido(pedido);

    // Reduz a quantidade de produtos disponíveis
    for (const produto of produtos) {
      const idProduto = produto.produto;
      const qtd = produto.qtd;

      try {
        const produtoExistente = await Produto.findById(idProduto);
        if (!produtoExistente) {
          return res.status(404).json({ message: "Produto não encontrado" });
        }

        const qtdTotalAtual = produtoExistente.qtd;
        if (qtdTotalAtual < qtd) {
          return res
            .status(400)
            .json({ message: "Quantidade solicitada não disponível" });
        }

        const qtdAtualizada = qtdTotalAtual - qtd;
        produtoExistente.qtd = qtdAtualizada;

        await produtoExistente.save();
      } catch (error) {
        console.error("Erro ao atualizar a quantidade:", error);
        return res
          .status(500)
          .json({ message: "Erro ao atualizar a quantidade" });
      }
    }

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

const listarPedidosPorCliente = async (req, res) => {
  const idCliente = req.params.id_cliente;

  try {
    const pedidos = await Pedido.find({ id_cliente: idCliente });

    if (pedidos.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum pedido encontrado para este cliente" });
    } else {
      res.status(200).json(pedidos);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao buscar os pedidos" });
  }
};

const updatePedido = async (req, res) => {
  const id = req.params.id;
  const { id_cliente, id_produtos, situacao_atual, valor_total } = req.body;

  try {
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
