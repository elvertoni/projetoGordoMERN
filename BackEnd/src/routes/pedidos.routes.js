const route = require("express").Router();
const pedidoController = require("../controller/pedidos.controller");
const { validIdPedido } = require("../middlewares/global.Middleware");

route.post("/", pedidoController.create);
route.get("/", pedidoController.buscarPedidos);
route.get("/lista/:id_cliente", pedidoController.listarPedidosPorCliente);
route.patch("/:id", validIdPedido, pedidoController.updatePedido);
route.delete("/:id", validIdPedido, pedidoController.deletePedido);

module.exports = route;
