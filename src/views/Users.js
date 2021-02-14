import React, {Component} from "react";
import { Container, Alert, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import * as UserAPI from "../utils/UserAPI"
import {Link} from 'react-router-dom'


import PageTitle from "../components/common/PageTitle";

class Users extends Component {

  state = {
    data: []
  }

  async componentDidMount() {
     
    const result = await UserAPI.isAutenticate()
    
    if(result.status===200)  {
      // console.log(result.data[0].codigoUsuario)
      const user = await UserAPI.get(result.data[0].codigoUsuario);
      console.log(user);
      if(user[0].tipo==1) {
        UserAPI.listAll().then(data=> this.setState({data}))
      }
      else {
        this.props.history.push("/errors")
      }
    }
    else {
      this.props.history.push("/errors")
    }

      
  }
  removeUser = (user,e) => {

    e.preventDefault();
    
    const {notification, history} = this.props

    const resultConfirm = window.confirm("Quer realmente exluir o usuario");
    if(resultConfirm) {
      UserAPI.remove(user).then(data=> {
        notification.success('Usuário exluído com sucesso!', null, 2000);
        history.push("/usuarios");
      })
      this.setState(
        {data:this.state.data.filter(res=>res.codigoUsuario!=user.codigoUsuario)}
      )
    }
	}
  render() {

    const {data} = this.state;
    return (
      <Container  fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Lista" subtitle="Usuarios" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <Link to={`/usuarios/inserir`} title="Adicionar Usuários">
                  <i style={{fontSize:'22px'}} className="fas fa-plus-circle"></i>
                </Link>  
              </CardHeader>
              <CardBody className="p-0 pb-3">
              {data.length==0 && (<Alert theme="light" style={{textAlign:"center"}}><i className="fas fa-exclamation-triangle"></i> Não existem Usuários cadastrados!</Alert>)}
              {data.length>0 &&
                (
                <table className="table mb-0 table-hover">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Ações
                      </th>
                      <th scope="col" className="border-0">
                        Nome Completo
                      </th>
                      <th scope="col" className="border-0">
                        Apelido
                      </th>
                      <th scope="col" className="border-0">
                        Email
                      </th>
                      <th scope="col" className="border-0">
                        Usuário
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((user)=>
                      (
                        <tr key={user.codigoUsuario}>
                          <td className="align-items-center">
                            <Link to={`usuarios/editar/${user.codigoUsuario}`} title="Editar Usuário" className="col-1"><i className="fas fa-edit"></i>
                            </Link>
                            {user.tipo!=1 && (<a href="javascript:void(0);" onClick={(e)=>this.removeUser(user,e)} title="Excluir Usuário" style={{color:'red' }}><i className="fas fa-trash-alt"></i></a>)}
                          </td>
                          <td>{user.nome}</td>
                          <td>{user.apelido}</td>
                          <td>{user.email}</td>
                          <td>{user.tipo==1 && (<b>Administrador</b>)}{user.tipo==0 && (<b>Normal</b>)}</td>
                        </tr>
                      )
                    )}
                    
                  </tbody>
                </table>)}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Users;
