import React, {Component} from "react";
// import { Container, Row, Col, Card, CardHeader, CardBody,Form, FormInput, FormGroup, Button } from "shards-react";
import { Container, Row, Alert, Button, Col, Card, CardHeader, FormGroup, FormInput, CardBody } from "shards-react";
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import PageTitle from "../components/common/PageTitle";
import * as UserAPI from "../utils/UserAPI"
import * as PhoneAPI from "../utils/PhoneAPI"
import * as Validator from "../utils/Validator"
import {Link} from 'react-router-dom'
import InputMask from "react-input-mask";

import "../assets/mycss.css";
import MainFooter from "../components/layout/MainFooter"

class Register extends Component {

  state = {
    dataUsers: {
      nome: "Marcos",
      apelido: "teste",
      email: "teste@gmail.com",
      senha: "asdfadsfasd",
      telefones: [ { numero: "86999040506" } ]
    },
    informationSuccess:false,
    errorMessage:false
  }

  onSubmit = async (values) => {
    
    await UserAPI.verifyEmail({email:values.email}).then(async (result)=> {
      if(result.data.exist) {
        this.setState({errorMessage:true});
      }
      else {
        this.setState({errorMessage:false});
        const defaultValues = {tipo:0}
        await UserAPI.insert({...values, ...defaultValues}).then(async(result) => {
            await PhoneAPI.insert({...values, ...{codigoUsuario: result.codigoUsuario}}).then(res=> {
              this.setState({informationSuccess:true})
            });
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
                mutators={{
                  ...arrayMutators
                }}
                initialValues={this.state.dataUsers} 
                render={({ handleSubmit, pristine, reset, errors, submitting, values }) => {
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
                          <Field name="apelido" validate={Validator.composeValidators(Validator.required, Validator.minCharNormal)}>
                            {({ input, meta }) => (
                              <FormGroup>
                                <label htmlFor="#apelido">Apelido*</label>
                                <FormInput {...input} id="#apelido" placeholder="Digite seu apelido" />     
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
                          
                          <FieldArray name="telefones" validate={Validator.requiredArray}>
                            
                            {({ fields}) => { 
                              return (
                                <div style={{position:"relative"}}>
                                    {fields.map((name, index) => (
                                      <div key={name} className="row" >
                                        <Col lg="9" md="9" xs="9">
                                          <Field name={`${name}.numero`} 
                                              validate={Validator.composeValidators(Validator.required, Validator.mustBeNumberPhone)} 
                                              parse={value =>
                                              value
                                                .replace(/\)/g, "")
                                                .replace(/\(/g, "")
                                                .replace(/-/g, "")
                                                .replace(/ /g, "")
                                            }>
                                            {({ input, meta }) => (
                                              <FormGroup>
                                                <label htmlFor={`#telefone${index}`} >Telefone {index+1}</label>
                                                {/* <FormInput {...input} id={`telefone${index}`} placeholder={"(99) 99999-9999"} />      */}
                                                <InputMask
                                                  disabled={false}
                                                  mask="(99) 99999-9999"
                                                  {...input}
                                                >
                                                  {InputProps => <FormInput disabled={false} {...InputProps} />}
                                                </InputMask>
                                                {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                                              </FormGroup>
                                            )}
                                          </Field>
                                        </Col>
                                        <div style={{marginTop:"35px"}}>
                                          <Button style={{fontSize:"10px", padding:"4px", marginRight:"8px"}}
                                            onClick={() => fields.push({ numero: ''})}>
                                            <i class="fas fa-plus"></i>
                                          </Button>
                                          {index>0 && (<Button style={{fontSize:"10px", padding:"4px", background:"red", border:"1px solid red"}}
                                            onClick={() => fields.remove(index)}>
                                            <i className="fas fa-minus-circle"></i>
                                          </Button>)}
                                        </div>
                                      </div>
                                    ))}
                              </div>
                            )}}
                        </FieldArray>
                        </Col>
                        <Col lg="12"className="p-3" md="12">
                        {JSON.stringify(values, 0, 2)}
                        <pre>errors{JSON.stringify(errors, 0, 2)}</pre> 
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
	if (!values.apelido) {errors.apelido = "Campo Obrigatório";}
	if (!values.email) {errors.email = "Campo Obrigatório";}
  if (!values.senha) {errors.senha = "Campo Obrigatório";}
  
	return errors;
}

export default Register;
