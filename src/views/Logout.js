import React, {Component} from "react";
import * as UserAPI from "../utils/UserAPI"

const  Logout = (props) => {
  UserAPI.logout();
  props.history.push("/login");
  return (<h1>&nbsp;</h1>)
}

export default Logout;
