import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/userSlice";
import { useHistory } from "react-router"

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const PASSWORD_MIN_LENGTH = 6;

    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= PASSWORD_MIN_LENGTH;

    (isEmailValid && isPasswordValid) ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [email, password])

  const handleUserLogin = (event: any) => {
    event.preventDefault();

    dispatch(userLogin(email))
    history.push('/carteira')
  }

  return (
    <form onSubmit={ handleUserLogin }>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            onChange={ ({ target: { value } }) => setEmail(value) }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            onChange={ ({ target: { value } }) => setPassword(value) }
            value={ password }
          />
        </label>
        <button
          type="submit"
          disabled={ buttonDisabled }
        >
          Entrar
        </button>
      </form>
  )
}
