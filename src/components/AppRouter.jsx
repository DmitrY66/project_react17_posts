import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
// import About from '../pages/About';
// import Posts from "../pages/Posts";
// import Error from "../pages/Error";
// import PostIdPage from '../pages/PostIdPage';
import { privateRoutes, pablicRoutes } from '../router/routes';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {

  const { isAuth, isLoading } = useContext(AuthContext);
  console.log('isAuth: ', isAuth);

  if (isLoading) {
    return <Loader />
  }


  return (

    isAuth
      ?
      <Routes>
        {privateRoutes.map(route =>
          <Route
            element={route.element}
            path={route.path}
            exact={route.exact}
            key={route.path}
          />
        )}
        <Route path="*" element={<Navigate replace to="/posts" />} />
      </Routes>
      :
      <Routes>
        {pablicRoutes.map(route =>
          <Route
            element={route.element}
            path={route.path}
            exact={route.exact}
            key={route.path}
          />
        )}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>

  );
};

export default AppRouter;