import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
//import { AddRecipe, AuthorsPage } from './pages';
import Header from './components/header/Header.jsx'; //Missing css
import Footer from "./components/footer/Footer.jsx"; //Missing css
import NotFoundPage from './pages/deadend/NotFoundPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import RoleRoute from './routes/RoleRoute.jsx';
import Login from './pages/login/Login.jsx'; //Missing css
import { useLocation } from 'react-router-dom';
import { useAuth } from './hooks/auth/useAuth.js';
import Unauthorized from './pages/deadend/UnauthorizedPage.jsx';
import RecipesPage from './pages/recipes/RecipesPage.jsx'; //Missing css
import ROUTES from './constants/routes.js';
import LogoutPage from './pages/logout/LogoutPage.jsx';
import AuthContext from './context/AuthContext.jsx';
//import { ToastContainer } from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css';
//import "./App.css";

function App() {
  return (
    <>
      <div className='Header'>
          <span>Recetas</span>
          <span>Mis Recetas</span>
          <span>Login/Reg</span>
      </div>
      <p className="body">
        Aquí va el cuerpo
      </p>
    </>
  )
}

function AppContent() {

}

export default App
