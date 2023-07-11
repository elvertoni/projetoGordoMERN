import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Produtos.css";

function Produtos() {
  const [produtoData, setProdutoData] = useState(null);
  const [editModeProd, setEditModeProd] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [editedProd, setEditedProd] = useState({
    name: "",
    descricao: "",
    preco: 0,
    quant: 0,
  });

  useEffect(() => {
    fetchProdutoData();
  }, []);

  const fetchProdutoData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/produtos");
      console.log(response.data);
      setProdutoData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProdRemove = (id) => {
    axios
      .delete(`http://localhost:3005/produtos/${id}`)
      .then((response) => {
        console.log(response.data);
        alert("Produto removido com sucesso");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Produto não encontrado / não removido");
      });
  };

  const handleTelaEditProd = (prod_id) => {
    const prod = produtoData.find((produto) => produto._id === prod_id);
    setSelectedProd(prod);
    setEditedProd({ ...prod });
    setEditModeProd(true);
  };

  const handleVoltar = () => {
    setEditModeProd(false);
    setSelectedProd(null);
    setEditedProd({ name: "", descricao: "", preco: 0, quant: 0 });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3005/produtos/${selectedProd._id}`, editedProd)
      .then((response) => {
        console.log("Informações do produto atualizadas:", response.data);
        alert("Produto atualizado com sucesso");
        setEditModeProd(false);
        setSelectedProd(null);
        setEditedProd({ name: "", descricao: "", preco: 0, quant: 0 });
        fetchProdutoData();
      })
      .catch((error) => {
        console.error(error);
        console.log("Começa aqui essa baixaria");
        console.log(error.response.data);

        if (
          error.response &&
          error.response.data.code === 11000 &&
          error.response.data.codeName === "DuplicateKey"
        ) {
          console.log("Chave duplicada encontrada");
          alert(
            "Não é possível atualizar o Produto. A informação do produto já foi encontrada no banco."
          );
        } else {
          alert("Erro ao atualizar Produto");
        }
      });
  };

  if (editModeProd) {
    return (
      <div className="containerCadProd">
        <div className="cardCadProd">
          <div className="cabecalhoCadProd">
            <h1 className='iconCadProd'>Cadastro de Produtos</h1>
            <div className='centralizeButton'>
            </div>
          </div>
          {selectedProd && (
            <div className="input-groupCadProd">
              <div className="input-boxCadPro">
                <label>
                  Nome:</label>
                <input
                  type="text"
                  name="name"
                  value={editedProd.name}
                  onChange={handleInputChange}
                  required
                />
              </div>


              <div className="input-boxCadPro">
                <label>Descrição:</label>
                <textarea
                  name="descricao"
                  value={editedProd.descricao}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />

              </div>

              <div className="input-boxCadPro">
                <label>Preço:</label>
                <input
                  type="number"
                  name="preco"
                  value={editedProd.preco}
                  step={"0.01"}
                  min={1}
                  max={99999}
                  onChange={handleInputChange}
                  required
                />

              </div>
              <div className="input-boxCadPro">
                <label>Quantidade: </label>
                <input
                  type="number"
                  name="qtd"
                  value={editedProd.qtd}
                  min={1}
                  max={99999}
                  onChange={handleInputChange}
                  required
                />

              </div>

              <div className="continue-button">
                <button type="submit" onClick={handleFormSubmit}> Enviar</button>
              </div>
              <div className="continue-button">
                <button onClick={handleVoltar}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="containerProduto">
      {produtoData &&
        produtoData.map(
          (produto) =>
            produto.qtd >= 1 ? (
              <div className="cardProduto" key={produto._id}>
                <div className="imgProd">
                  <img
                    className="imag-iconProd"
                    src={produto.imgProduto}
                    alt="imgProduto"
                  />
                </div>
                <div className="textoProduto">
                  <div className="text-princProd">
                    <h3>{produto.name}</h3>
                  </div>
                  <div className="testItensProd">
                    <p>{produto.descricao}</p>
                  </div>
                  <div className="testItensProd">
                    <p>
                      <span>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </p>
                  </div>
                  <div className="testItensProd">
                    <p>Quantidade: {produto.qtd} Produtos disponiveis</p>
                  </div>
                </div>
                <div className="buttonInProd">
                  <div>
                    <button
                      type="button"
                      className="btnProd1"
                      onClick={() => handleTelaEditProd(produto._id)}
                    >
                      Editar
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btnProd2"
                      onClick={() => handleProdRemove(produto._id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cardProduto" key={produto._id}>
                <div className="imgProd">
                  <img
                    className="imag-iconProd"
                    src={produto.imgProduto}
                    alt="imgProduto"
                  />
                </div>
                <div className="textoProduto">
                  <div className="text-princProd">
                    <h3>{produto.name}</h3>
                  </div>
                  <div className="testItensProd">
                    <p>PRODUTO INDISPONÍVEL</p>
                  </div>
                </div>
                <div className="buttonInProd">
                  <div>
                    <button
                      type="button"
                      className="btnProd1"
                      onClick={() => handleTelaEditProd(produto._id)}
                    >
                      Editar
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btnProd2"
                      onClick={() => handleProdRemove(produto._id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      <div className="cardProduto">
        <div className="divCadaProd">
          <h1>Cadastrar novo Produto</h1>
          <button className="btnProd2">
            <NavLink to="/CadastroProd">Cadastrar produto</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Produtos;
