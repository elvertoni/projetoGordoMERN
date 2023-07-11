import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import animeGirlImage from "../../img/young-girl-anime-style-character-vector-illustration-design-manga-anime-girl_147933-146.avif";
import "./Cadastro.css";
import "./Estilo.css";




function Cadastro() {
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [nickName, setnickName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarAvatar, setMostrarAvatar] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const formRef = useRef(null);


  const handleMostrarAvatar = () => {
    setMostrarAvatar(!mostrarAvatar);
  };

  const imageUrls = {
    image1:
      "https://i.pinimg.com/474x/ba/4a/b4/ba4ab4b1e8f280e11a6a231b6c3bfca5.jpg",
    image2:
      "https://i.pinimg.com/474x/f8/61/f7/f861f7811770690969cab9771a2ce1f8.jpg",
    image3:
      "https://i.pinimg.com/170x/fc/1d/14/fc1d145dadb5209835ccfea553ae6349.jpg",
    image4:
      "https://i.pinimg.com/236x/4f/47/38/4f473836f7ae6ca95d5892edca66e2c9.jpg",
    image5:
      "https://i.pinimg.com/474x/41/f8/08/41f8083ac4f49a6a6ceaa346add9c9f3.jpg",
    image6:
      "https://styles.redditmedia.com/t5_3sk6jh/styles/profileIcon_zgy7mwwo07f81.jpg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=3e22c61eaad4b546615a85731862c32e4e2cfe6f",
  };

  const handleImageSelect = (imageId) => {
    setSelectedImage(imageId);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = formRef.current;

    if (!form.checkValidity()) {
      return alert("Algum campo está faltando");
    }

    const salvarLista = {
      primeiroNome,
      nickName,
      email,
      senha,
      selectedImage,
    };

    const data = {
      name: salvarLista.primeiroNome,
      nickname: salvarLista.nickName,
      email: salvarLista.email,
      senha: salvarLista.senha,
      avatar: imageUrls[salvarLista.selectedImage],
    };

    const checkExistingUsers = async (nickname, email) => {

      try {
        const response = await axios.get("http://localhost:3005/user");
        const existingUsers = response.data;

        const matchingUsers = existingUsers.filter(
          (user) => user.nickname === nickname || user.email === email
        );

        if (matchingUsers.length > 0) {
          let errorMessage = "";

          if (matchingUsers.some((user) => user.nickname === nickname)) {
            errorMessage += `Outro Nickname '${nickname}' já cadastrado. `;
          }

          if (matchingUsers.some((user) => user.email === email)) {
            errorMessage += `Outro Email '${email}' já cadastrado. `;
          }

          alert(
            `Usuário já existe. Por favor escolha ${errorMessage}`
          ); //Usei o mesmo sistema da aula de JS do fascina


          return true; // Usuário já existe

        } else {

          // Usuário não existe, fazer o post das informações
          axios
            .post("http://localhost:3005/user", data)
            .then((response) => {
              console.log(response.data);
              alert("Cadastrado com sucesso");
              window.location.href = '/usuarios';
            })
            .catch((error) => {
              console.error(error);
            });

          return false;
        }
      } catch (error) {
        console.error(error);
        return true; // Tratamento de erro, considerar como usuário existente para evitar cadastro duplicado
      }
    };


    checkExistingUsers(salvarLista.nickName, salvarLista.email)
      .then((userExists) => {
        if (!userExists) {
        }
      })
      .catch((error) => {
        console.error(error);
      });

  };


  if (mostrarAvatar) {
    return (
      <div className="container-ImgCadastro">
        <div className="image-container">
          <div className="image-rowCadastro">
            <div>
              <input
                type="checkbox"
                className="image-checkbox"
                id="image1"
                checked={selectedImage === "image1"}
                onChange={() => handleImageSelect("image1")}
              />
              <label htmlFor="image1">
                <img
                  src="https://i.pinimg.com/474x/ba/4a/b4/ba4ab4b1e8f280e11a6a231b6c3bfca5.jpg"
                  alt="Imagem 1"
                />
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                className="image-checkbox"
                id="image2"
                checked={selectedImage === "image2"}
                onChange={() => handleImageSelect("image2")}
              />
              <label htmlFor="image2">
                <img
                  src="https://i.pinimg.com/474x/f8/61/f7/f861f7811770690969cab9771a2ce1f8.jpg"
                  alt="Imagem 2"
                />
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                className="image-checkbox"
                id="image3"
                checked={selectedImage === "image3"}
                onChange={() => handleImageSelect("image3")}
              />
              <label htmlFor="image3">
                <img
                  src="https://i.pinimg.com/474x/c2/00/aa/c200aa030f6bb1e8577396de396e8d77.jpg"
                  alt="Imagem 3"
                />
              </label>
            </div>
          </div>
          <div className="image-rowCadastro">
            <div>
              <input
                type="checkbox"
                className="image-checkbox"
                id="image4"
                checked={selectedImage === "image4"}
                onChange={() => handleImageSelect("image4")}
              />
              <label htmlFor="image4">
                <img
                  src="https://i.pinimg.com/736x/e5/99/34/e59934d1f99cb14a90d4fbf89a3d0355.jpg"
                  alt="Imagem 4"
                />
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                className="image-checkbox"
                id="image5"
                checked={selectedImage === "image5"}
                onChange={() => handleImageSelect("image5")}
              />
              <label htmlFor="image5">
                <img
                  src="https://i.pinimg.com/736x/9b/0d/76/9b0d76947410ab46edb1d80c2aa7052e.jpg"
                  alt="Imagem 5"
                />
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                className="image-checkbox"
                id="image6"
                checked={selectedImage === "image6"}
                onChange={() => handleImageSelect("image6")}
              />
              <label htmlFor="image6">
                <img
                  src="https://i.pinimg.com/564x/dd/75/c1/dd75c14d77cde56ae8bd588c2d4ddcbd.jpg"
                  alt="Imagem 6"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="Avatar-button">
          <button onClick={handleMostrarAvatar}>
            Voltar para a tela principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="comeco">
        <div className="container">
          <div className="form-image">
            <img src={animeGirlImage} alt="anime Girl" className="image" />
          </div>
          <div className="form">
            <form ref={formRef}>
              <div className="form-header">
                <div className="title">
                  <h1>Cadastre-se</h1>
                </div>
                <div className="login-button">
                  <button>
                    <NavLink to="/">Produtos</NavLink>
                  </button>
                </div>
              </div>

              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="firstname">Primeiro Nome</label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder="Digite seu primeiro nome"
                    value={primeiroNome}
                    onChange={(e) => setPrimeiroNome(e.target.value)}
                    required
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="nickName">Nickname</label>
                  <input
                    id="nickName"
                    type="text"
                    name="nickName"
                    placeholder="Digite o seu Nick"
                    value={nickName}
                    onChange={(e) => {
                      setnickName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="password">Senha</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="confirmPassword">Confirme sua Senha</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Digite sua senha novamente"
                    value={confirmarSenha}
                    onChange={(e) => {
                      setConfirmarSenha(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="Avatar-button">
                  <button onClick={handleMostrarAvatar}>
                    Selecione o avatar
                  </button>
                </div>
              </div>

              <div className="continue-button">
                <button type="submit" onClick={handleFormSubmit}>Continuar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
