const route = require("express").Router();

const userControler = require("../controller/user.controller");
const { validId, validUser } = require("../middlewares/global.Middleware");

route.post("/", userControler.create);
route.get("/", userControler.buscar);
route.get("/:id", validId, validUser, userControler.buscarUsuarioPorId);
route.get("/:nickname/:email", userControler.buscarPedidoNaEm);
route.put("/:id", validId, validUser, userControler.update);
route.delete("/:id", validId, userControler.deleteUsuario);

module.exports = route;
