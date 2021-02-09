import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

import * as UserAPI from "../../../utils/UserAPI"


class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navItems: null
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
        
    Store.addChangeListener(this.onChange);
  }
  async componentDidMount() {

    const result = await UserAPI.isAutenticate()
    if(result.status==200)  {
      if(result.data[0].tipo==1) {
        this.setState({navItems:[{
          title: "Usuários",
          to: "/usuarios",
          htmlBefore: '<i class="fas fa-file-alt"></i>',
          htmlAfter: ""
        },...Store.getSidebarItems()]});
      }
      else {
        this.setState({navItems:Store.getSidebarItems()})
      }
    }
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items && items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
