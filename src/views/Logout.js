import React from "react";
import * as UserAPI from "../utils/UserAPI"

const  Logout = (props) => {

  UserAPI.logout();
  const {notification, history} = props;
  notification.success('Logout realizado com sucesso!', null, 2000);
  history.push("/login");
  return (<h1>&nbsp;</h1>)
}

export default Logout;
