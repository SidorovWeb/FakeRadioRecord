import { FC } from 'react'

const Login: FC = () => {
	return <div>Login</div>
}

export default Login

// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../store/authSlice'; // Пример для Redux

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || '/dashboard';

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ username, password })); // Авторизация
//     navigate(from, { replace: true }); // Возврат на запрошенный приватный маршрут
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default LoginPage;
