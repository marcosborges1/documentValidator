import React from "react";
// import { Container, Row, Col, Card, CardHeader, CardBody,Form, FormInput, FormGroup, Button } from "shards-react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { Form, Field } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import { Component } from "react";


const UsuariosInserir = (props) => (

  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Inserir" subtitle="Usuário" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0"><i style={{color:"#007BFF"}} className="fas fa-exclamation-triangle"></i> Preencha os campos abaixo.</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">

          {/* <Form 
						onSubmit={onSubmit} 
						validate={initalValidate}
						render={({ handleSubmit}) => {
              return (
                <h1>adsfas</h1>
              )
            }} /> */}
          
            {/* <Form>
              <Row className="p-4 pb-3">
                <Col lg="6" md="6">
                    <FormGroup>
                      <label htmlFor="#nome">Nome</label>
                      <FormInput id="#nome" placeholder="Digite seu nome completo" />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="#identificacao">Identificação</label>
                      <FormInput id="#identificacao" placeholder="Digite sua identificação" />
                    </FormGroup>
                </Col>
                <Col lg="6" md="6">
                    <FormGroup>
                      <label htmlFor="#email">E-mail</label>
                      <FormInput id="#email" placeholder="Digite seu e-mail" />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="#senha">Senha</label>
                      <FormInput type="password" id="#senha" placeholder="Digite sua Senha" />
                    </FormGroup>
                </Col>
              <Col lg="12"className="p-3" md="12">
                <Button theme="success" style={{marginRight:"10px"}}>
                  Salvar
                </Button>
                <Button theme="warning" type="reset">
                  Limpar
                </Button>
              </Col>
              </Row>
            </Form> */}
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
); 

const onSubmit = (values) => {
  return "";
}

const initalValidate = (values) => {
  return "";
}

export default UsuariosInserir;
