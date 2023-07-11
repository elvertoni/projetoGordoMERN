const express = require("express");
const cors = require("cors");
const userRoute = require("./src/routes/user.routes");
const produtosRoute = require("./src/routes/produtos.routes");
const pedidosRoute = require("./src/routes/pedidos.routes");
const app = express();
const dataConnect = require("./src/database/db");

/*
methodo http: forma com que a internet se comunica

GET: PEGA INFORMAÇÂO
POST: INSERE INFORMAÇÂO
PUT: ALTERA TODA A INFORMAÇÂO
PATCH:  ALTERA UMA PARTE DA INFORMAÇÂO
DELETE: EXCLUI uma info 

nome da rota:
Função de retorno (callback) 
*/

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/produtos", produtosRoute);
app.use("/pedidos", pedidosRoute);

app.listen(3005, () => {
  console.log("INICIADO COM SUCESSO NA PORTA 3005");
});
