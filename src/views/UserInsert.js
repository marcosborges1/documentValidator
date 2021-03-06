import React, {Component} from "react";
// import { Container, Row, Col, Card, CardHeader, CardBody,Form, FormInput, FormGroup, Button } from "shards-react";
import { Container, Row, Col, Card, CardHeader, FormGroup, FormInput, FormSelect, CardBody } from "shards-react";
import { Form, Field } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import * as UserAPI from "../utils/UserAPI"
import * as Validator from "../utils/Validator"

import "../assets/mycss.css";

class UserInsert extends Component {

  state = {
    dataUsers: {
      nome: "",
      identificacao: "",
      email: "",
      senha: "",
      tipo: 0,
    }
    ,autorizacaoTipo:false
  }

  onSubmit = async (values) => {
    
    const {codigoUsuario} = this.props.match.params;
    const result = await UserAPI.isAutenticate();
    const user = await UserAPI.get(result.data[0].codigoUsuario)
    const {notification, history} = this.props;

    if(!codigoUsuario) {
      UserAPI.insert(values);
      notification.success('Usuário cadastrado com sucesso!', null, 2000);
    }
    else {
      UserAPI.update(codigoUsuario, values)
      notification.success('Usuário alterado com sucesso!', null, 2000);
    }
    if(user[0].tipo==1) {
      history.push('/usuarios')
    } else {
      history.push('/arquivos')
    }
  }

  async componentDidMount() {

    const {codigoUsuario} = this.props.match.params;
    const result = await UserAPI.isAutenticate();
    if(result.status==200) { 
      const user = await UserAPI.get(result.data[0].codigoUsuario)
      
      if(codigoUsuario === result.data[0].codigoUsuario || user[0].tipo==1) {
        
        this.setState({autorizacaoTipo:user[0].tipo==1?true:false});
        UserAPI.get(codigoUsuario).then(res=>{

          if(typeof res !== 'undefined' && res.length > 0) {
            console.log("Tem conteudo")
            this.setState({dataUsers:res[0]})
          } else {
            console.log("Não")
          }

        }).catch(error=>console.log(error.message))
      }
      else {
        this.props.history.push("/errors");
      }
    }
  }

  render() {
    
    const {autorizacaoTipo} = this.state;

    return (
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
                          <Field name="tipo">
                            {({ input, meta }) => (
                              <FormGroup>
                                <label htmlFor="#Tipo">Tipo de Usuário*</label>
                                <FormSelect {...input}>
                                  <option value="0">Normal</option>
                                  <option value="1" disabled={!autorizacaoTipo ? 'disabled' : null}>Administrador</option>
                                </FormSelect>     
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
            </Card>
          </Col>
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

export default UserInsert;
