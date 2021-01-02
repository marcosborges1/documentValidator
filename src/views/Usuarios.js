import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const dataUsuarios = [
    {
      id:1,
      firstName: 'Marcos',
      lastName:'Borges',
      email: 'borges.marcos1@gmail.com',
      password: '',
      phone: '(85) 3333-4444'
    },
    {
      id:2,
      firstName: 'Marcia',
      lastName:'Cristina',
      email: 'marcia.Cristina@gmail.com',
      password: '',
      phone: '(85) 3498-2244'
    },
    {
      id:3,
      firstName: 'Jesus',
      lastName:'Borges',
      email: 'jesus.maria@gmail.com',
      password: '',
      phone: '(85) 9871-3815'
    },
]

const Usuarios = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="List" subtitle="Usuarios" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            
            <a href="#">
              <i style={{fontSize:'22px'}} className="fas fa-plus-circle"></i>
            </a>  
          </CardHeader>
          <CardBody className="p-0 pb-3">
            
            <table className="table mb-0 table-hover">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Actions
                  </th>
                  <th scope="col" className="border-0">
                    First Name
                  </th>
                  <th scope="col" className="border-0">
                    Last Name
                  </th>
                  <th scope="col" className="border-0">
                    Email
                  </th>
                  <th scope="col" className="border-0">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataUsuarios && dataUsuarios.map((user)=>
                  (
                    <tr key={user.id}>
                      <td className="align-items-center">
                        <a href="#" className="col-1"><i className="fas fa-edit"></i></a>
                        <a href="#" style={{color:'red' }}><i className="fas fa-trash-alt"></i></a>
                      </td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
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
);

export default Usuarios;
