// import { useSelector } from 'react-redux'; // или контекст/другое хранилище
// import { Navigate, useLocation } from 'react-router-dom';

// function PrivateRoute({ children }) {
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const location = useLocation();

//   if (!isAuthenticated) {
//     // Редирект на /login с сохранением предыдущего пути
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }

// export default PrivateRoute;
