const produtos = require("../models/produtos.models");

const createService = (body) => {
  return produtos.create(body);
};

const buscarServices = () => {
  return produtos.find();
};

const buscarPorIdServices = (id) => {
  return produtos.findById(id);
};

const updateService = (id, name, descricao, preco, qtd, imgProduto) => {
  return produtos.findOneAndUpdate(
    { _id: id },
    { name, descricao, preco, qtd, imgProduto }
  );
};

const deleteService = (id) => {
  return produtos.findByIdAndDelete(id);
};

module.exports = {
  createService,
  buscarServices,
  buscarPorIdServices,
  updateService,
  deleteService,
};
