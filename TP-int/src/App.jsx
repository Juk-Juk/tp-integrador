import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header.jsx'; //Missing css
import Footer from "./components/footer/Footer.jsx"; //Missing css
import NotFoundPage from './pages/NotFoundPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import RoleRoute from './routes/RoleRoute.jsx';


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
