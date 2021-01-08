import React, {Component} from "react";
import { render } from "react-dom";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import * as UserAPI from "../utils/UserAPI"

import PageTitle from "../components/common/PageTitle";

class Users extends Component {

  state = {
    dataUsers: []
  }

  componentDidMount() {
    UserAPI.getAll().then((dataUsers)=> this.setState({dataUsers}))
  }
  render() {

    const {dataUsers} = this.state;

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
                
                <a href={`/usuarios/inserir`} title="Adicionar Usuários">
                  <i style={{fontSize:'22px'}} className="fas fa-plus-circle"></i>
                </a>  
              </CardHeader>
              <CardBody className="p-0 pb-3">
                
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
                        Identificação
                      </th>
                      <th scope="col" className="border-0">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUsers && dataUsers.map((user)=>
                      (
                        <tr key={user.codigoUsuario}>
                          <td className="align-items-center">
                            <a href="javascript:void(0);" title="Editar Usuário" className="col-1"><i className="fas fa-edit"></i></a>
                            <a href="javascript:void(0);" title="Excluir Usuário" style={{color:'red' }}><i className="fas fa-trash-alt"></i></a>
                          </td>
                          <td>{user.nome}</td>
                          <td>{user.identificacao}</td>
                          <td>{user.email}</td>
                        </tr>
                      )
                    )}
                    
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Users;
