import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormSesion from 'components/Form/FormSesion';
import request from 'services/request';

export default function SignUp() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const navigate = useNavigate();

  const formTitle = "REGISTRO";
  const buttonText = "Registrarse";

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

  async function SignUp() {
    const body = {userName, password};
    const result = validate(body);

    setErrors(result);
    if (Object.keys(result).length) {
      return;
    }

    const userId = await request({ method: 'POST', path: 'users', body });
    if (userId) {
      navigate('/login');
    } else {
      setOpenSnackBar(true);
    }
  }

  return (
    <FormSesion
      formData={{formTitle, buttonText}}
      inputStates={{userName, setUserName, password, setPassword}}
      errors={errors}
      handleClick={SignUp}
      handleSnackBar={{
        openSnackBar,
        setOpenSnackBar,
        message: "Usuario ya existe"
      }}
    />
  );
}
