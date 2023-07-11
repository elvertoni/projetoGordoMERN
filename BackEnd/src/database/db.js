const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017/Usuario";

const db = mongoose.connect(URL);

mongoose.connection.on("connected", () => console.log("Conectado!"));
mongoose.connection.on("error", (erro) => console.log("Erro: " + erro));

module.exports = db;
