const mongoose = require("mongoose");

const userServices = require("../services/user.services");
const produtoServices = require("../services/produtos.services");
const Pedido = require("../models/pedidos.models");

const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).send({ message: "ID do usuário inválido" });
  } else {
    next();
  }
};

const validUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await userServices.buscarPorIdServices(id);

  if (!user) {
    res
      .status(404)
      .send({ message: "Usuário com o ID especificado não foi encontrado" });
  } else {
    next();
  }
};

const validProduto = async (req, res, next) => {
  const id = req.params.id;
  const produto = await produtoServices.buscarPorIdServices(id);

  if (!produto) {
    res
      .status(404)
      .send({ message: "Produto com o ID especificado não foi encontrado" });
  } else {
    next();
  }
};

const validIdPedido = async (req, res, next) => {
  let pedido;
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ message: "ID do pedido inválido" });
  }

  try {
    const recebe = await Pedido.findById(id);

    if (!recebe) {
      return res
        .status(404)
        .json({ message: "Pedido com o ID especificado não foi encontrado" });
    }

    pedido = recebe;
    req.pedido = pedido;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { validId, validUser, validProduto, validIdPedido };
