import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

import * as UserAPI from "../../../../utils/UserAPI"

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      data: []
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  async componentDidMount() {

    try {
      UserAPI.isAutenticate()
    } catch (error) {
      console.log("asd")
    }
    // if(result.data) {
    //   UserAPI.get(result.data[0].codigoUsuario).then(data=>this.setState({data:data[0]}));
    // }
    // else {
    //   console.log("Não logado.")
    // }

  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const {data} = this.state;
    
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{data && (data.nome)}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Perfil
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Editar Perfil
          </DropdownItem>
          <DropdownItem tag={Link} to="/arquivos">
            <i className="material-icons">&#xE2C7;</i> Arquivos
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/logout" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem> 
        </Collapse>
      </NavItem>
    );
  }
}
