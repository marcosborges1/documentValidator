import React from "react";
import { Redirect } from "react-router-dom";

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

import Usuarios from "./views/Usuarios";
import UsuariosInserir from "./views/UsuariosInserir";
import Arquivos from "./views/Arquivos";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/usuarios" />
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/usuarios",
    exact: true,
    layout: DefaultLayout,
    component: Usuarios
  },
  {
    path: "/usuarios/inserir",
    exact: true,
    layout: DefaultLayout,
    component: UsuariosInserir
  },
  {
    path: "/arquivos",
    layout: DefaultLayout,
    component: Arquivos
  },


];
