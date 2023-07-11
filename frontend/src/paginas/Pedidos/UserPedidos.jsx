import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPedidos.css";

function UserPedidos() {
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [pedido, setPedido] = useState({
    id_cliente: "",
    produtos: [{ produto: "", qtd: 0, preco: 0, descricao: "", name: "" }],
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3005/user");
        setUsuarios(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3005/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProdutos();
  }, []);

  const handleUserSelect = (event) => {
    const { value } = event.target;
    setPedido((prevState) => ({
      ...prevState,
      id_cliente: value,
    }));
  };

  const handleProdutoSelect = (event, index) => {
    const selectedProductId = event.target.value;
    const selectedProduct = produtos.find(
      (produtoItem) => produtoItem._id === selectedProductId
    );

    const updatedPedido = { ...pedido };
    const updatedProduto = selectedProduct
      ? {
        produto: selectedProductId,
        qtd: pedido.produtos[index].qtd,
        preco: selectedProduct.preco,
        descricao: selectedProduct.descricao,
        name: selectedProduct.name,
      }
      : {
        produto: "",
        qtd: 0,
        preco: 0,
        descricao: "",
        name: "",
      };

    updatedPedido.produtos[index] = updatedProduto;

    setPedido(updatedPedido);
  };

  const handleQuantidadeChange = (event, index) => {
    const { value } = event.target;

    setPedido((prevState) => ({
      ...prevState,
      produtos: prevState.produtos.map((produto, i) =>
        i === index ? { ...produto, qtd: parseInt(value) } : produto
      ),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pedido.id_cliente) {
      // Exiba uma mensagem de erro ou realize outra ação apropriada
      alert("Por favor, selecione um usuário antes de cadastrar o pedido.");
      return;
    }

    try {
      await axios.post("http://localhost:3005/pedidos", pedido);

      setPedido({
        id_cliente: "",
        produtos: [{ produto: "", qtd: 0, preco: 0, descricao: "", name: "" }],
      });
      console.log("Pedido cadastrado com sucesso!");
      alert("Pedido cadastrado com sucesso!");
    } catch (error) {
      console.log("Erro ao cadastrar o pedido:", error);
      alert("Erro ao cadastrar o pedido. Por favor, tente novamente.");
    }
  };

  const handleAddProduto = () => {
    setPedido((prevState) => ({
      ...prevState,
      produtos: [
        ...prevState.produtos,
        { produto: "", qtd: 0, preco: 0, descricao: "", name: "" },
      ],
    }));
  };

  const handleRemoveProduto = (index) => {
    setPedido((prevState) => ({
      ...prevState,
      produtos: prevState.produtos.filter((_, i) => i !== index),
    }));
  };

  // Filtrar os produtos disponíveis, removendo os produtos já selecionados
  const produtosDisponiveis = produtos.filter(
    (produtoItem) =>
      !pedido.produtos.some((produto) => produto.produto === produtoItem._id)
  );

  return (
    <div className="ContainerUserPedidos">
      <h1>Cadastro de Pedido</h1>
      <div className="CardSelecioneUsuario">
        <h2>Usuários</h2>


        <div className="CardUserPedido">
          {usuarios.map((usuario) => (
            <div key={usuario._id}>
              <div
                className={`ImageContentCardPedidos ${pedido.id_cliente === usuario._id ? "Checked" : ""
                  }`}
                onClick={() =>
                  handleUserSelect({ target: { value: usuario._id } })
                }
              >
                <input
                  type="checkbox"
                  id={`user-${usuario._id}`}
                  checked={pedido.id_cliente === usuario._id}
                  required
                  onChange={() =>
                    handleUserSelect({ target: { value: usuario._id } })
                  }
                />
                <div className="UserImage">
                  <img src={usuario.avatar} alt={usuario.name} />
                </div>
              </div>
              <div className="UserName">
                <label htmlFor={`user-${usuario._id}`}>{usuario.name}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ContentCardProdutoPedido">
        {pedido.produtos.map((produto, index) => (
          <div key={index}>
            <div className="AlinhandoProdPedido">
              <h2>Produto {index + 1}</h2>
              <div className="InputContainer">
                <label htmlFor={`produto-${index}`}>Produto:</label>
                <select
                  id={`produto-${index}`}
                  name="id_produto"
                  value={produto.produto}
                  onChange={(event) => handleProdutoSelect(event, index)}
                >
                  <option value={"Selecione um produto"}>{produto.name}</option>
                  {produtosDisponiveis
                    .filter((produtoItem) => produtoItem.qtd >= 1)
                    .map((produtoItem) => (
                      <option key={produtoItem._id} value={produtoItem._id}>
                        {produtoItem.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="InputContainer">
                <label htmlFor={`quantidade-${index}`}>Quantidade:</label>
                <input
                  type="number"
                  id={`quantidade-${index}`}
                  name="quantidade"
                  onChange={(event) => handleQuantidadeChange(event, index)}
                  value={produto.qtd}
                  min="0"
                  max={
                    produtos.find(
                      (produtoItem) => produtoItem._id === produto.produto
                    )?.qtd || 0
                  }
                />
              </div>
              {produto.produto && (
                <div className="InputContainer">
                  <label>
                    <div className="textColorInputProd">
                      Preço:{" "}
                      {produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                  </label>
                  <label>
                    <div className="textColorInputProd">
                      Descrição: {produto.descricao}
                    </div>
                  </label>
                </div>
              )}
              <button type="button" onClick={() => handleRemoveProduto(index)}>
                Remover Produto
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddProduto}>
          Adicionar Produto
        </button>
        <form onSubmit={handleSubmit}>
          <button type="submit">Cadastrar Pedido</button>
        </form>
      </div>
    </div>
  );
}

export default UserPedidos;