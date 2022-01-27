// эта конструкция не работает из за версии react-router-dom=6 и отключена

import About from "../pages/About";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Error from "../pages/Error";
// import { Navigate } from "react-router-dom";


export const privateRoutes = [
  { path: '/about', element: <About />, exact: true },
  // { path: '/login', element: <Login />, exact: true },
  { path: '/posts', element: <Posts />, exact: true },
  { path: '/posts/:id', element: <PostIdPage />, exact: true },
  { path: '/error', element: <Error />, exact: true },
];

export const pablicRoutes = [
  // { path: '/about', element: <About />, exact: true },
  { path: '/login', element: <Login />, exact: true },
  // { path: '/posts', element: <Posts />, exact: true },
  // { path: '/posts/:id', element: <PostIdPage />, exact: true },
  { path: '/error', element: <Error />, exact: true },
];

