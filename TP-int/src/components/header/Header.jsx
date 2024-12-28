import { NavLink } from "react-router-dom";
import ROUTES from "../../constants/routes.js";
import './Header.css'


const { RECIPES, MY_RECIPES, LOGIN_REG, LOGOUT } = ROUTES;

const Header = () => {
    const links = [
        {to: RECIPES, label: "Recetas"},
        {to: MY_RECIPES, label: "Mis Recetas"},
        {to: AUTHORS, label: "Autores"},
        {to: LOGIN_REG, label: "Login/Registrarse"},
        {to: LOGOUT, label: "Cerrar Sesión"}
    ];
    return (
        <nav className="topnav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>        
    );
}

export default Header;

