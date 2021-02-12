

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
// import BlogOverview from "./views/BlogOverview";
// import UserProfileLite from "./views/UserProfileLite";
// import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
// import ComponentsOverview from "./views/ComponentsOverview";
// import Tables from "./views/Tables";
// import BlogPosts from "./views/BlogPosts";

import Users from "./views/Users";
import UserInsert from "./views/UserInsert";
import Files from "./views/Files";
import FileInsert from "./views/FileInsert";
import Login from "./views/Login"
import Logout from "./views/Logout"
import FilesValidator from "./views/FilesValidator"
import Register from "./views/Register";
import Index from "./views/Index";
import Home from "./views/Home";

export default [
  {
    path: "/",
    exact: true,
    layout: Index
  },
  {
    path: "/errors",
    exact: true,
    layout: Errors
  },
  {
    path: "/usuarios",
    exact: true,
    layout: DefaultLayout,
    component: Users
  },
  {
    path: "/usuarios/inserir",
    exact: true,
    layout: DefaultLayout,
    component: UserInsert
  },
  {
    path: "/usuarios/editar/:codigoUsuario",
    exact: true,
    layout: DefaultLayout,
    component: UserInsert
  },
  {
    path: "/arquivos",
    exact: true,
    layout: DefaultLayout,
    component: Files
  },
  {
    path: "/arquivos/inserir",
    exact: true,
    layout: DefaultLayout,
    component: FileInsert
  },
  {
    path: "/arquivos/editar/:codigoArquivo",
    exact: true,
    layout: DefaultLayout,
    component: FileInsert
  },
  {
    path: "/login",
    exact: true,
    layout: Login
  },
  {
    path: "/logout",
    exact: true,
    layout: Logout
  },
  {
    path: "/validacao",
    exact: true,
    layout: FilesValidator
  },
  {
    path: "/cadastrar-se",
    exact: true,
    layout: Register
  },
  {
    path: "/inicio",
    exact: true,
    layout: DefaultLayout,
    component: Home
  },


];
