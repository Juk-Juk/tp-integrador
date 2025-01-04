import './App.css'; //Missing css
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AddRecipe from './pages/addRecipe/addRecipe.jsx'; //Missing css
import AuthorsPage from './pages/authors/AuthorsPage.jsx'; //Missing css
import Header from './components/header/Header.jsx'; //Missing css
import Footer from "./components/footer/Footer.jsx"; //Missing css
import NotFoundPage from './pages/deadend/NotFoundPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import RoleRoute from './routes/RoleRoute.jsx';
import Login from './pages/login/Login.jsx'; //Missing css
// import { useLocation } from 'react-router-dom';
import { useAuth } from './hooks/auth/useAuth.js';
import Unauthorized from './pages/deadend/UnauthorizedPage.jsx';
import RecipesPage from './pages/recipes/RecipesPage.jsx'; //Missing css
import ROUTES from './constants/routes.js';
import LogoutPage from './pages/logout/LogoutPage.jsx';
import AuthProvider from './context/AuthContext.jsx';
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
//import "./App.css";

const { RECIPES, MY_RECIPES, ADD_RECIPE, AUTHORS, LOGIN_REG, NOT_FOUND, UNAUTHORIZED, LOGOUT } = ROUTES

function App() {
  return (        //Decomment this once back is up
    <BrowserRouter>
     {/* <AuthProvider> */}
        <AppContent />
        <ToastContainer position="top-center" />
     {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

function AppContent() {
  const { token } = useAuth();
  const isLogged = Boolean(token);

  return (
    <div className="container">
      <Header />
      <div className="content">
        <Routes>

          <Route element={<PublicRoute />}>
            <Route path={LOGIN_REG} element={<Login />} />
            <Route path={RECIPES} element={<RecipesPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path={ADD_RECIPE} element={<AddRecipe />} />
            <Route path={LOGOUT} element={<LogoutPage />} />
          </Route>

          <Route element={<RoleRoute requiredRole="admin" />}>
            <Route path={AUTHORS} element={<AuthorsPage />} />
          </Route>

          <Route path={UNAUTHORIZED} element={<Unauthorized />} />
          <Route path={NOT_FOUND} element={<NotFoundPage />} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App
