import { useState } from 'react';

import FormSesion from 'components/Form/FormSesion';
import request from 'services/request';
import { useAuthContext } from 'contexts/authContext';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const {login} = useAuthContext();

  const formTitle = "INICIAR SESION";
  const buttonText = "Iniciar sesión";

  function validate(inputs) {
    const errorsList = {};

    if (inputs.userName === '') {
      errorsList.userName = "Ingrese nombre de usuario";
    }
    if (inputs.password === '') {
      errorsList.password = "Ingrese contraseña";
    }
    return errorsList;
  }

  async function handleLogin() {
    const body = {userName, password};
    const result = validate(body);

    setErrors(result);
    if (Object.keys(result).length) {
      return;
    }

    const user_data = await request({ method: 'post', path: 'login', body });
    if (user_data) {
      login(user_data);
    } else {
      console.log("User or passwrod is wrong");
      setOpenSnackBar(true)
    }
  }

  return (
    <FormSesion
      signUpLink={true}
      formData={{formTitle, buttonText}}
      inputStates={{userName, setUserName, password, setPassword}}
      errors={errors}
      handleClick={handleLogin}
      handleSnackBar={{
        openSnackBar,
        setOpenSnackBar,
        message: "Nombre de usuario o contraseña incorrecto"
      }}
    />
  );
}
