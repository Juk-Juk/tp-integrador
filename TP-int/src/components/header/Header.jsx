import { NavLink } from "react-router-dom";
import ROUTES from "../../constants/routes.js";
import { useAuth } from "../../hooks/auth/useAuth.js";
import './Header.css'


const { RECIPES, MY_RECIPES, AUTHORS, LOGIN_REG, LOGOUT } = ROUTES;

const Header = () => {
  const {token} = useAuth();
  const isLogged = Boolean(token);
  const {role} = useAuth();
  const isAdmin = Boolean(role == "admin");

    return (
    <div className="nav-container">
      <nav className="topnav">
        <div className="left">
          <NavLink
          key={RECIPES}
          to={RECIPES}
          >
          Recetas
          </NavLink>
         {isAdmin && <NavLink
          key={AUTHORS}
          to={AUTHORS}
          >
          Autores
         </NavLink>}
        </div>
        <div className="right">
          {!isLogged && <NavLink
          key={LOGIN_REG}
          to={LOGIN_REG}
          >
          Login/Registrarse
          </NavLink>}
          {isLogged && <NavLink
          key={LOGOUT}
          to={LOGOUT}
         >
          Cerrar sesión
         </NavLink>}
        </div>
      </nav>
    </div>  
    );
}

export default Header;

