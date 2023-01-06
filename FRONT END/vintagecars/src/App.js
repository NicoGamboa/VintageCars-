import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/home/index";
import Signup from "./components/SignUp/Signup";
import Login from "./components/login/Login";
import "react-datepicker/dist/react-datepicker.css";
import ItemProductDetailContainer from "./components/detallesProducto/ItemProductDetailContainer";
import "./App.css";
import Header from "./pages/header/Header";
import Footer from "./pages/footer/Footer";
import ReservaContainer from "./components/Reserva/reservacontainer";
import { UserContext } from "./context/UserContext";
import { FechaContext } from "./context/UseContext";
import { useState } from "react";
import ReservaUsuarioContainer from "./UsuarioReserva/UsuarioReservaContainer";
import VerificarCodigo from "./components/verificador/VerificarCodigo";
import NotFound from "./noEncontrado/NotFound";
import AdminProducto from "./Administrador/AdminProducto";


function App() {
  
    const [desabilitar,setDesabilitar]=useState()
    //const [dateRange,setDateRange]=useState([null,null]);
    const [isAuthenticated, setIsAuthenticated] = useState();
    const[startDate1,setStartDate1]=useState();
    const[endDate1,setEndDate1]=useState();
    const[selectedDates,setSelectedDates] =useState([null,null]);
  return (
    <>
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <FechaContext.Provider value={{desabilitar,setDesabilitar,startDate1,setEndDate1,endDate1,setStartDate1,selectedDates,setSelectedDates}}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:id" element={<Home />} />
        <Route path="/producto/:id" element={<ItemProductDetailContainer />} />
        <Route path="/producto/:id/reserva" element={<ReservaContainer />} />
        <Route path="/reserva/usuario_id/:id" element={<ReservaUsuarioContainer />} />
        <Route path="/verify" element={<VerificarCodigo />} />
        <Route path="/admin" element={<AdminProducto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      </FechaContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;

