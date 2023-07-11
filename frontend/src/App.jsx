import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Produtos from "./paginas/Produtos/Produtos"
import Cadastro from "./paginas/Cadastro/Cadastro";
import CadastroProd from "./paginas/CadastroProd/CadastroProd";
import Usuarios from "./paginas/Usuarios/Usuarios";
import UserPedidos from './paginas/Pedidos/UserPedidos'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><Produtos /></Layout>} />
        <Route path='/cadastro' element={<Layout><Cadastro /></Layout>} />
        <Route path='/usuarios' element={<Layout><Usuarios /></Layout>} />
        <Route path='/cadastroProd' element={<Layout><CadastroProd /></Layout>} />
        <Route path='/userPedidos' element={<Layout>< UserPedidos /></Layout>} />


      </Routes>
    </>
  );
}

export default App;
