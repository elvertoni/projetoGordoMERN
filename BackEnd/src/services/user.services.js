const User = require("../models/user.model");

const createService = (body) => {
  return User.create(body);
};

const buscarServices = () => {
  return User.find();
};

const srcNomeEmailService = async (nickname, email) => {
  return await User.find({ nickname: nickname, email: email, status: "ativo" });
};

const buscarPorIdServices = (id) => User.findById(id);

const updateService = (id, name, nickname, email, senha, avatar) =>
  User.findOneAndUpdate({ _id: id }, { name, nickname, email, senha, avatar });

const deleteService = (id) => {
  return User.findOneAndDelete({ _id: id });
};

module.exports = {
  createService,
  buscarServices,
  buscarPorIdServices,
  updateService,
  deleteService,
  srcNomeEmailService,
};
