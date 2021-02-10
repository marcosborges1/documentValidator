import React, {Component} from "react";
// import { Container, Row, Col, Card, CardHeader, CardBody,Form, FormInput, FormGroup, Button } from "shards-react";
import { Container, Row, Alert, Button, Col, Card, CardHeader, FormGroup, FormInput, CardBody } from "shards-react";
import { Form, Field } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import * as UserAPI from "../utils/UserAPI"
import * as Validator from "../utils/Validator"
import {Link} from 'react-router-dom'

import "../assets/mycss.css";
import MainFooter from "../components/layout/MainFooter"

class Register extends Component {

  state = {
    dataUsers: {
      nome: "",
      identificacao: "",
      email: "",
      senha: ""
    },
    informationSuccess:false,
    errorMessage:false
  }

  onSubmit = async (values) => {
    
    await UserAPI.verifyEmail({email:values.email}).then(result=> {
      if(result.data.exist) {
        this.setState({errorMessage:true});
      }
      else {
        this.setState({errorMessage:false});
        const defaultValues = {tipo:0}
        UserAPI.insert({...values, ...defaultValues}).then(result => {
            this.setState({informationSuccess:true})
        });
      }
    });
  }

  render() {

    const {informationSuccess, errorMessage} = this.state;
    
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Cadastrar-se" subtitle="Usuário" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row className="justify-content-center">
        <Col lg="8" md="8" xs="8">
          {informationSuccess && (
            
            <div className="justify-content-center" >
                <Alert className="mb-4" theme="success">Usuário cadastrado com sucesso! </Alert>
                <Link className="align-items-center" to="/login"><Button pill>&larr; Fazer Login</Button></Link>
            </div>
            )}
            {!informationSuccess && ( <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0"><i style={{color:"#007BFF"}} className="fas fa-exclamation-triangle"></i> Preencha os campos abaixo. Campos Obrigatórios(*)</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
              
              <Form 
                onSubmit={this.onSubmit} 
                validate={initalValidate}
                initialValues={this.state.dataUsers} 
                render={({ handleSubmit, pristine, reset, submitting, values }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Row className="p-4 pb-3">
                        <Col lg="6" md="6">  
                          <Field name="nome" validate={Validator.composeValidators(Validator.required, Validator.minCharNormal)}>
                            {({ input, meta }) => (
                              <FormGroup>
                                <label htmlFor="#nome">Nome*</label>
                                <FormInput {...input} id="#nome" placeholder="Digite seu nome completo" />     
                                {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                              </FormGroup>
                            )}
                          </Field>
                          <Field name="identificacao" validate={Validator.composeValidators(Validator.required, Validator.minCharNormal)}>
                            {({ input, meta }) => (
                              <FormGroup>
                                <label htmlFor="#identificacao">Identificação*</label>
                                <FormInput {...input} id="#identificacao" placeholder="Digite sua identificação" />     
                                {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                              </FormGroup>
                            )}
                          </Field>
                        </Col>
                        <Col lg="6" md="6">  
                          <Field name="email" validate={Validator.composeValidators(Validator.required, Validator.minCharNormal, Validator.isEmail)}>
                            {({ input, meta }) => (
                              <FormGroup>
                                <label htmlFor="#email">Email*</label>
                                <FormInput {...input} id="#email" placeholder="Digite seu e-mail" />     
                                {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                              </FormGroup>
                            )}
                          </Field>
                          <Field name="senha" validate={Validator.composeValidators(Validator.required, Validator.minCharPassword)}>
                            {({ input, meta }) => (
                              <FormGroup>
                                <label htmlFor="#senha">Senha*</label>
                                <FormInput type="password" {...input} id="#senha" placeholder="Digite sua senha" />     
                                {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                              </FormGroup>
                            )}
                          </Field>
                        </Col>
                        <Col lg="12"className="p-3" md="12">
                        {errorMessage && (<span className="d-flex required" style={{paddingBottom:"10px"}}>Já existe esse email cadastrado no Banco de Dados!</span>)}
                          <button type="submit" className="btn btn-success" style={{color:"#000", marginRight:"10px"}} disabled={submitting || pristine}>
                            Salvar
                          </button>
                          <button
                            type="button" className="btn btn-warning"
                            onClick={reset}
                            disabled={submitting || pristine}>
                            Limpar
                          </button>
                        </Col>
                      </Row>
                    </form>
                  )
                }} />
              </CardBody>
            </Card>)}
          </Col>
          <div className="d-none d-xs-block d-xl-block d-md-block d-lg-block" style={{position:"fixed",bottom:0,width: "100%"}}>
            <MainFooter menuItems={[{title: `Home`,to: `/`}]} />
          </div>
        </Row>
      </Container>
    )
  }
}

const initalValidate = (values) => {

	const errors = {};
	if (!values.nome) {errors.nome = "Campo Obrigatório";}
	if (!values.identificacao) {errors.identificacao = "Campo Obrigatório";}
	if (!values.email) {errors.email = "Campo Obrigatório";}
	if (!values.senha) {errors.senha = "Campo Obrigatório";}
	return errors;
}

export default Register;
