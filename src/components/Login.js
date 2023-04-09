import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogInMenu = ({error, setNickname, setPassword, setIsLogIn, handleLogIn}) => {
  return (
    <div className="login">
      <h2>Вхід</h2>
      <form onSubmit={handleLogIn}>
        {false && <p class="error">Неправильне ім'я користувача або пароль</p>}
        <input type="text" placeholder="Ім'я користувача" required onChange={(e) => setNickname(e.target.value)} />
        <input type="password" placeholder="Пароль" required onChange={(e) => setPassword(e.target.value)} />
        <button>Увійти</button>
      </form>
      <p>Не маєте акаунту?</p>
      <button onClick={() => setIsLogIn(false)}>Зареєструватися</button>
    </div>
  );
}

const SignUpMenu = ({error, setNickname, setEmail, setPassword, setIsLogIn, handleSignUp}) => {
  return(
    <div className="signup">
      <h2>Реєстрація</h2>
      <form onSubmit={handleSignUp}>
        {true && <p class="error">Користувач з таким ім'ям вже існує</p>}
        <input type="text" placeholder="Ім'я користувача" required onChange={(e) => setNickname(e.target.value)} />
        <input type="text" placeholder="Електронна адреса" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" required onChange={(e) => setPassword(e.target.value)} />
        <button>Зареєструватися</button>
      </form>
      <p>Вже маєте акаунт?</p>
      <button onClick={() => setIsLogIn(true)}>Увійти</button>
    </div>
  );
}

const LoginPage = ({setIsAdmin, setToken}) => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('password', password);

    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      body: formData
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.success) {
        localStorage.setItem('isAdmin', data.result.isAdmin);
        setIsAdmin(data.result.isAdmin)
        localStorage.setItem('token', data.result.token);
        setToken(data.result.token)

        if (data.result.isAdmin) {
          navigate("/regions")
        }
        else {
          navigate("/dwellings")
        }
      }
    })
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://127.0.0.1:5000/register_user', {
      method: 'POST',
      body: formData
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.success) {
        setIsLogIn(true)
      }
    })
  }

  return (
    <div>
      {isLogIn && <LogInMenu setNickname={setNickname} setPassword = {setPassword} setIsLogIn = {setIsLogIn} handleLogIn = {handleLogIn} />}
      {!isLogIn && <SignUpMenu setNickname={setNickname} setEmail = {setEmail} setPassword = {setPassword} setIsLogIn = {setIsLogIn} handleSignUp = {handleSignUp} />}
    </div>
  )
}

export default LoginPage;