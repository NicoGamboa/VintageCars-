import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosRequest } from "../helpers/AxiosHelper";
import { SignedInOk } from "../components/signedInOk/SignedInOk";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

const UseFormLogin = () => {
  const [formValues, setFormValues] = useState([]);
  const [formErrors, setFormErros] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { isAuthenticated,setIsAuthenticated } = useContext(UserContext);
  // console.log(setIsAuthenticated);
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target; //destructuramos
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = (values) => {
      const errors = {};
      const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!values.email) {
        errors.email = "Introduzca su email!";
      } else if (!regex.test(values.email)) {
        errors.email = "Introduzca un email valido!";
      }
      if (!values.password) {
        errors.password = "Introduzca su contraseña!";
      } else if (values.password.length < 6) {
        errors.password = "La contraseña debe tener mas de 6 caracteres!";
      }
      return errors;
    };

    if (validate) {
      const credentials = {
        username: e.target.email.value.trim(),
        password: e.target.password.value.trim(),
      };
      // console.log(credentials);
      try {
      AxiosRequest.post("/authenticate", credentials)
        .then((reponse) => {
          setLoaded(true);
          if (reponse.status === 200) {
            localStorage.setItem("Token", reponse.data.jwt);
            const parseJwt = () => {
              try {
                return JSON.parse(atob(reponse.data.jwt.split(".")[1]));
              } catch (e) {
                return null;
              }
            };
            console.log(parseJwt().verificado);
            if(parseJwt().verificado===true){
            if (parseJwt().rol.id === 2) {
              setIsAuthenticated({
                nombre: parseJwt().name,
                apellido: parseJwt().last_name,
                email:parseJwt().sub,
                habilitado:parseJwt().verificado,
                
              });
            } else if (parseJwt().rol.id === 1) {
              setIsAuthenticated({
                nombre: parseJwt().name,
                apellido: parseJwt().last_name,
                email:parseJwt().sub,
                habilitado:parseJwt().verificado,
              });
            }

            SignedInOk.fire({
              title: "Carga Exitosa",
              icon: "success",
            });

            
            navigate("/");
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Por favor valide su cuenta'
            });
          }
          }}).catch(({ response }) => { if (response.status === 403) {
            
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Por favor inicie sesion o utilice otro correo'
            });
            navigate(`/login`);
          } else if (response.status >= 500) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salio mal ,Por favor intente nuevamente'
            });
            navigate(`/login`);
          }
        }).finally(()=>{setLoaded(false)})
        
    } catch (error) {
      console.warn(error)

  }} 
    setFormErros(validate(formValues));
  };
  return { handleSubmit, handleChange, formValues, formErrors, loaded };
};
export default UseFormLogin;