const mongoose = require("mongoose");
const User = require("../models/user.model");
const Produto = require("../models/produtos.models");

// Conecte-se ao banco de dados MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Usuario", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida.");

    // Crie um array com os dados dos usuários
    const usersData = [
      {
        name: "João",
        nickname: "joao123",
        email: "joao@gmail.com",
        senha: "senha123",
        avatar:
          "https://i.pinimg.com/474x/7c/d8/35/7cd83556836aa0f34c9727f21719c777.jpg",
      },
      {
        name: "Maria",
        nickname: "maria456",
        email: "maria@gmail.com",
        senha: "senha456",
        avatar:
          "https://i.pinimg.com/474x/c2/00/aa/c200aa030f6bb1e8577396de396e8d77.jpg",
      },
      {
        name: "mathizin",
        nickname: "mathizin",
        email: "mathizin@gmail.com",
        senha: "senha123",
        avatar:
          "https://i.pinimg.com/originals/d6/b0/8d/d6b08da6e77b2bff46a6119cf01b6223.jpg",
      },
      {
        name: "julia",
        nickname: "juliazinha",
        email: "julinha@gmail.com",
        senha: "senha123",
        avatar:
          "https://i.pinimg.com/550x/b4/30/7e/b4307e9bf9287c2ac5bcc978e3ab6844.jpg",
      },
      {
        name: "Lucas",
        nickname: "Cere",
        email: "LucasCere@gmail.com",
        senha: "senha123",
        avatar:
          "https://i.pinimg.com/736x/ef/fa/43/effa43f115ec5c89fb57131767612a9f.jpg",
      },
    ];

    // Crie um array com os dados dos produtos
    const produtosData = [
      {
        name: "Teclado",
        descricao:
          "Teclado Mecânico Gamer Switch Blue Led Rgb 7 Cores Rainbow 12 Funções Anti Ghosting Abnt2 Usb para Pc Notebook Mac",
        preco: 159.99,
        qtd: 10,
        imgProduto:
          "https://m.media-amazon.com/images/I/61Tn5a431IL._AC_SX679_.jpg",
      },
      {
        name: "Mouse",
        descricao:
          "Mouse Razer Deathadder Essential, O MOUSE ESSENCIAL PARA JOGOS: O Razer Deathadder conquistou uma reputação de confiabilidade pela qual os gamers colocam a mão",
        preco: 127.99,
        qtd: 10,
        imgProduto:
          "https://images.kabum.com.br/produtos/fotos/49841/49841_1507735187_index_gg.jpg",
      },
      {
        name: "Headset",
        descricao:
          "Headset Gamer HyperX Cloud Stinger Core PC HX-HSCSC2-BK/WW, Preto, Pequeno",
        preco: 149.99,
        qtd: 10,
        imgProduto:
          "https://m.media-amazon.com/images/I/61E0BmJbyNL._AC_SL1500_.jpg",
      },
      {
        name: "Placa de Video",
        descricao:
          "GPU NV RTX3060 12GB 1-CLICK OC GDDR6 192BITS Galax 36NOL7MD1VOC",
        preco: 2399.9,
        qtd: 10,
        imgProduto:
          "https://m.media-amazon.com/images/I/71yqLfPyV1L._AC_SL1500_.jpg",
      },
      // Adicione mais objetos de produto conforme necessário
    ];

    // Crie um array para armazenar as promessas de salvamento
    const savePromises = [];

    // Função para salvar um documento verificando erros de chave duplicada
    const saveDocument = (document) => {
      return document.save().catch((error) => {
        if (error.code === 11000) {
          // Erro de chave duplicada
          console.warn(
            `Documento duplicado encontrado. Pulando a inserção do documento: ${document}`
          );
        } else {
          // Outro erro
          throw error;
        }
      });
    };

    // Itere sobre os dados dos usuários e crie e salve cada usuário
    usersData.forEach((userData) => {
      const user = new User(userData);
      savePromises.push(saveDocument(user));
    });

    // Itere sobre os dados dos produtos e crie e salve cada produto
    produtosData.forEach((produtoData) => {
      const produto = new Produto(produtoData);
      savePromises.push(saveDocument(produto));
    });

    // Aguarde a conclusão de todas as operações de salvamento
    Promise.all(savePromises)
      .then(() => {
        console.log("Dados inseridos com sucesso.");
        mongoose.disconnect(); // Desconecte-se do banco após a inserção
      })
      .catch((error) => {
        console.error("Erro ao inserir dados:", error);
        mongoose.disconnect(); // Desconecte-se do banco em caso de erro
      });
  })
  .catch((error) => {
    console.error("Erro ao conectar-se ao MongoDB:", error);
  });
