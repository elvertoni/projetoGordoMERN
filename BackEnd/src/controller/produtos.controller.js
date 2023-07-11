const { default: mongoose } = require("mongoose");
const produtoServices = require("../services/produtos.services");

const create = async (req, res) => {
  try {
    const { name, descricao, preco, qtd, imgProduto } = req.body;

    if (!name || !descricao || !preco || !qtd || !imgProduto) {
      res.status(400).send({ message: "Envie todos os campos" });
      return; // adicionado um return para sair da função aqui
    }

    const produto = await produtoServices.createService(req.body);

    res.status(201).send({
      message: "Produto criado com sucesso",
      produto: {
        id: produto._id,
        name: produto.name,
        descricao: produto.descricao,
        preco: produto.preco,
        qtd: produto.qtd,
        imgProduto: produto.imgProduto,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao criar produto" });
  }
};

const buscar = async (req, res) => {
  try {
    const produtos = await produtoServices.buscarServices();

    res.send(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao buscar produtos" });
  }
};

const buscarProdutoPorID = async (req, res) => {
  try {
    const id = req.params.id;
    const produto = await produtoServices.buscarPorIdServices(id);

    if (!produto) {
      res.status(404).send({ message: "Produto não encontrado" });
    } else {
      res.send(produto);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao buscar produto" });
  }
};

const updateProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, descricao, preco, qtd, imgProduto } = req.body;

    const produtoAtualizado = await produtoServices.updateService(
      id,
      name,
      descricao,
      preco,
      qtd,
      imgProduto
    );

    if (!produtoAtualizado) {
      res.status(404).send({ message: "Produto não encontrado" });
    } else {
      res.send({
        message: "Produto atualizado com sucesso",
        produto: {
          id: produtoAtualizado._id,
          name: produtoAtualizado.name,
          descricao: produtoAtualizado.descricao,
          preco: produtoAtualizado.preco,
          qtd: produtoAtualizado.qtd,
          imgProduto: produtoAtualizado.imgProduto,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao atualizar produto" });
  }
};

const deleteProduduto = async (req, res) => {
  try {
    const id = req.params.id;
    const produtoDeletado = await produtoServices.deleteService(id);

    if (!produtoDeletado) {
      res.status(404).send({ message: "Produto não encontrado" });
    } else {
      res.send({
        message: "Produto deletado com sucesso",
        produto: {
          id: produtoDeletado._id,
          name: produtoDeletado.name,
          descricao: produtoDeletado.descricao,
          preco: produtoDeletado.preco,
          qtd: produtoDeletado.qtd,
          imgProduto: produtoDeletado.imgProduto,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao deletar produto" });
  }
};

module.exports = {
  create,
  buscar,
  buscarProdutoPorID,
  updateProduto,
  deleteProduduto,
};
