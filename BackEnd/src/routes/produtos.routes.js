const route = require("express").Router();

const produtoController = require("../controller/produtos.controller");
const { validId, validProduto } = require("../middlewares/global.Middleware");

route.post("/", produtoController.create);
route.get("/", produtoController.buscar);
route.get("/:id", validId, validProduto, produtoController.buscarProdutoPorID);
route.put("/:id", validId, validProduto, produtoController.updateProduto);
route.delete("/:id", validId, validProduto, produtoController.deleteProduduto);

module.exports = route;
