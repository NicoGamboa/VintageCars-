import { useState } from "react";
import { AxiosRequest } from "../helpers/AxiosHelper";
import { SignedInOk } from "../components/signedInOk/SignedInOk";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UseFormSignup = (objetoInicial = {}) => {
  const [formValues, setFormValues] = useState(objetoInicial);
  const [formErrors, setFormErros] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validar = (values) => {
      const errors = {};
      let regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      if (!values.nombre) {
        errors.nombre = "Introduzca su nombre!";
      }
      if (!values.apellido) {
        errors.apellido = "Introduzca su apellido!";
      }
      if (!values.email) {
        errors.email = "Introduzca un email!";
      } else if (!regex.test(values.email)) {
        errors.email = "Introduzca un email valido!";
      }
      if (!values.password) {
        errors.password = "Introduzca una contraseña!";
      } else if (values.password.length < 6) {
        errors.password = "La contraseña debe tener mas de 6 caracteres!";
      }
      if (values.repeatPassword !== values.password) {
        errors.repeatPassword = "Introduzca la misma contraseña!";
      }
      return errors;
    };

    if (validar) {
      const newUsuario = {
        nombre: e.target.nombre.value.trim(),
        apellido: e.target.apellido.value.trim(),
        email: e.target.email.value.trim(),
        password: e.target.password.value.trim(),
        rol: { id: 2 },
      };
      // console.log(newUsuario);
      try {
      AxiosRequest.post("/usuario", newUsuario)
        .then((reponse) => {
          setLoaded(true);
          //console.log(reponse.data);
          //console.log(reponse.status);
          if (reponse.status === 201) {
            Swal.fire({
              icon: "success",
              title: "¡Se ha creado su cuenta con exito!",
              text: `Vaya a su mail a confirmar su cuenta `,
            });
            navigate("/login");
          }}).catch(({ response }) => { if (response.status === 400){ 
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Por favor inicie sesion o utilice otro correo o verifique datos ingresados",
            });
            navigate(`/signup`);
          }else if (response.status >= 500) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Algo salio mal ,Por favor intente nuevamente",
            });
            navigate(`/signup`);
          }
        }).finally(()=>{setLoaded(false)})
    }catch (error) {
      console.warn(error)
  }}
    setFormErros(validar(formValues));
  };

  return { formValues, handleChange, handleSubmit, formErrors, loaded };
};

export default UseFormSignup;
