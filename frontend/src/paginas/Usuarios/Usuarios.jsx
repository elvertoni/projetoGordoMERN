import "./Usuarios.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Usuarios() {
  // EXIBINDO USUARIOS NA TELA

  //BLOCO DE useStates ->
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [newTela, setNewTela] = useState(false);

  const [userPedidos, setUserPedidos] = useState([]);
  const [userIdPed, setUserIdPed] = useState(null);

  // VERIFICANDO PEDIDO DE USUARIOS

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/user");
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserRemove = (id) => {
    axios
      .delete(`http://localhost:3005/user/${id}`)
      .then((response) => {
        console.log(response.data);
        alert("Usuário removido com sucesso");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Usuário não encontrado / não removido");
      });
  };

  //TELA PARA EDITAR AS INFORMAÇÔES

  const handleTelaEdit = (user_id) => {
    const user = userData.find((user) => user._id === user_id);
    setSelectedUser(user);
    setEditedUser({ ...user });
    setEditMode(true);
  };

  const handleVoltar = () => {
    setEditMode(false);
    setSelectedUser(null);
    setEditedUser(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3005/user/${selectedUser._id}`, editedUser)
      .then((response) => {
        console.log("Informações do usuário atualizadas:", response.data);
        alert("Usuário atualizado com sucesso");
        setEditMode(false);
        setSelectedUser(null);
        setEditedUser(null);
        fetchUserData(); // Recarrega os dados após a atualização do usuário
      })
      .catch((error) => {
        console.error(error);
        console.log("Começa aqui essa baixaria");
        console.log(error.response.data);

        // Verifica se o erro é de chave duplicada
        if (
          error.response &&
          error.response.data.code === 11000 &&
          error.response.data.codeName === "DuplicateKey"
        ) {
          console.log("Chave duplicada encontrada");
          alert(
            "Não é possível atualizar o usuário. A informação já existe no banco de dados."
          );
        } else {
          alert("Erro ao atualizar usuário");
        }
      });
  };

  if (editMode) {
    return (
      <div>
        <div className="ContainerEditMode">
          <h1>Tela de edição</h1>
          {selectedUser && (
            <div className="cardEditMode">
              <form onSubmit={handleFormSubmit}>
                <div className="CardComponenteEditMode">
                  <label>
                    Nome:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="CardComponenteEditMode">
                  <label>
                    Apelido:
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    value={editedUser.nickname}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="CardComponenteEditMode">
                  <label>
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="CardComponenteEditMode">
                  <label>
                    Senha:
                  </label>
                  <input
                    type="password"
                    name="senha"
                    value={editedUser.senha}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="EditModeButtonComp">
                  <button type="submit">Salvar</button>
                  <button onClick={handleVoltar}>Cancelar</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  //TELA PARA ALOCAR OS PEDIDOS

  const handleNewTela = (userId) => {
    setUserIdPed(userId);
    setNewTela(true); // Abre a tela NewTela
  };

  const handleVoltando = () => {
    setUserPedidos([]);
    setNewTela(false); // Adicione esta linha para definir newTela como false ao voltar para a tela principal
  };

  const resultPedido = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3005/pedidos/lista/${userIdPed}`
      );
      const data = response.data;
      setUserPedidos(data); // Atualiza o estado userPedidos com os resultados da consulta
    } catch (error) {
      console.log(error);
    }
  };

  if (newTela) {

    function formatarData(data) {

      const partesDataHora = data.split('T');
      const dataPartes = partesDataHora[0].split('-');
      const horaPartes = partesDataHora[1].split(':');

      const dia = dataPartes[2];
      const mes = dataPartes[1];
      const ano = dataPartes[0];

      const hora = horaPartes[0];
      const minutos = horaPartes[1];
      const segundos = horaPartes[2].split('.')[0];

      return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
    }

    return (

      <div className="ContainerExibirLista">
        <div className="componente_superior">
          <h1>Exibir pedidos</h1>
          <button className="btnUser2" onClick={handleVoltando}>
            Voltar
          </button>
          <button className="btnUser2" onClick={resultPedido}>
            Exibir Resultados
          </button>
        </div>

        <div className="ContExibirLista">
          {userPedidos.length > 0 ? (
            userPedidos.map((resultado, index) => (
              <div className="CardExibirLista" key={resultado._id}>
                <div className="CardPedidoList">
                  <p>Pedido {index + 1}</p>
                  <div className="ListaCompraPedidoUser">
                    <p>Produtos:</p>
                    <ul>
                      {resultado.produtos.map((produto) => (
                        <li key={produto._id}>
                          Foram adicionados {produto.qtd} - {produto.name} + {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="infosProdPedidosUser">
                    <p>Situação atual: {resultado.situacao_atual}</p>
                    <p>Valor total: {resultado.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <p>Data do pedido: {formatarData(resultado.data_pedido)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>

    );
  }


  //TELA PRINCIPAL QUE é CARREGADA NO INICIO DO CODIGO
  return (
    <div className="containerUser">
      {userData &&
        userData.map((user) => (
          <div className="cardUser" key={user._id}>
            <div className="imgUser">
              <img className="imag-iconUser" src={user.avatar} alt="Avatar" />
            </div>
            <div className="textoUser">
              <div className="itemNomeUser">
                <h3>{user.name}</h3>
              </div>
              <div className="testItensUser">
                <p>{user.nickname}</p>
              </div>
              <div className="testItensUser">
                <p>{user.email}</p>
              </div>
            </div>
            <div className="buttonInUser">
              <div>
                <button
                  type="button"
                  className="btnUser1"
                  onClick={() => handleTelaEdit(user._id)}
                >
                  Editar
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btnUser2"
                  onClick={() => handleUserRemove(user._id)}
                >
                  Excluir
                </button>
              </div>
              <div>
                <button
                  className="btnUser2"
                  onClick={() => handleNewTela(user._id)}
                >
                  Pedidos Usuario
                </button>
              </div>
            </div>
          </div>
        ))}
      <div className="cardUser">
        <div className="divCadaUser">
          <h1>Cadastrar um usuário</h1>
          <button className="btnUser2">
            <NavLink to="/Cadastro">Cadastrar Usuário</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
