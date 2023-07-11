const { default: mongoose } = require("mongoose");
const userServices = require("../services/user.services");
const e = require("cors");

const create = async (req, res) => {
  try {
    const { name, nickname, email, senha, avatar } = req.body;

    if (!name || !nickname || !email || !senha || !avatar) {
      res.status(400).send({ message: "Envie todos os campos" });
      return; // adicionado um return para sair da função aqui
    }

    const user = await userServices.createService(req.body);

    res.status(201).send({
      message: "Usuario criado com sucesso",
      user: {
        id: user._id,
        name,
        nickname,
        email,
        avatar,
      },
    });
  } catch (err) {
    // adicionado um bloco catch para capturar a exceção
    console.error(err); // imprime o erro no console para debug
    res.status(500).send({ message: "Ocorreu um erro ao criar o usuário" });
    alert("Erro ao cadastrar usuario");
  }
};

const buscar = async (req, res) => {
  const users = await userServices.buscarServices();

  if (users.length === 0) {
    return res
      .status(400)
      .send({ message: "não existe nenhum usuario cadastrado" });
  }

  res.send(users);
};

const buscarUsuarioPorId = async (req, res) => {
  const id = req.params.id;
  const user = await userServices.buscarPorIdServices(id);
  res.send(user);
};

const buscarPedidoNaEm = async (req, res) => {
  const nickname = req.params.nickname;
  const email = req.params.email;

  const user = await userServices.srcNomeEmailService(nickname, email);
  res.send(user);
};

const update = async (req, res) => {
  const { name, nickname, email, senha, avatar } = req.body;
  const id = req.params.id;

  if (!name && !nickname && !email && !senha && !avatar) {
    res.status(400).send({ message: "Envie um campo para ser atualizado" });
  } else {
    try {
      const updatedUser = await userServices.updateService(
        id,
        name,
        nickname,
        email,
        senha,
        avatar
      );
      res.send({ message: "Usuário alterado com sucesso", user: updatedUser });
    } catch (error) {
      console.error(error);

      if (error.code === 11000 && error.codeName === "DuplicateKey") {
        res.status(400).send({
          message:
            "Não é possível atualizar o usuário. A informação já existe no banco de dados.",
          code: error.code,
          codeName: error.codeName,
        });
      } else {
        res.status(500).send({ message: "Erro ao atualizar usuário" });
      }
    }
  }
};

const deleteUsuario = async (req, res) => {
  const id = req.params.id;
  const user = await userServices.deleteService(id);
  res.send({ message: "Deletado com sucesso" });
};

module.exports = {
  create,
  buscar,
  buscarUsuarioPorId,
  buscarPedidoNaEm,
  update,
  deleteUsuario,
};
