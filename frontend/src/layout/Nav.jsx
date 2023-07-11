import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav>
      <a className="logo" href="/">
        Ecommerce
      </a>
      <div className="mobile-menu">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul className="nav-list">
        <li>
          <NavLink to="/">Produtos</NavLink>
        </li>
        <li>
          <NavLink to="/usuarios">Usuarios</NavLink>
        </li>
        <li>
          <NavLink to="/userPedidos">Aba Pedidos</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
