import React, {Component} from "react";
// import { Container, Row, Col, Card, CardHeader, CardBody,Form, FormInput, FormGroup, Button } from "shards-react";
import { Container, Row, Col, Button, Card, CardHeader, FormGroup, FormInput, FormSelect, CardBody } from "shards-react";
import { Form, Field } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import * as UserAPI from "../utils/UserAPI"
import * as PhoneAPI from "../utils/PhoneAPI"
import * as Validator from "../utils/Validator"
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import InputMask from "react-input-mask";

import "../assets/mycss.css";

class UserInsert extends Component {

  state = {
    dataUsers: {
      nome: "",
      apelido: "",
      email: "",
      senha: "",
      tipo: 0,
      telefones: [ { numero: "" }]
    },
    errorMessage:false,
    autorizacaoTipo:false
  }

  onSubmit = async (values) => {
    
    const {codigoUsuario} = this.props.match.params;
    const result = await UserAPI.isAutenticate();
    const user = await UserAPI.get(result.data[0].codigoUsuario)
    const {notification, history} = this.props;

    if(!codigoUsuario) {
      // UserAPI.insert(values);
      // notification.success('Usuário cadastrado com sucesso!', null, 2000);
      await UserAPI.verifyEmail({email:values.email}).then(async (result)=> {
        if(result.data.exist) {
          this.setState({errorMessage:true});
        }
        else {
          this.setState({errorMessage:false});
          await UserAPI.insert({...values}).then(async(result) => {
              await PhoneAPI.insert({...values, ...{codigoUsuario: result.codigoUsuario}}).then(res=> {
                notification.success('Usuário cadastrado com sucesso!', null, 2000);
              });
          });
        }
      });
    }
    else {
      // console.log(values);
      UserAPI.update(codigoUsuario, values).then(async (result)=> {
        await PhoneAPI.remove(codigoUsuario);
        await PhoneAPI.insert(values);
        notification.success(result.message, null, 2000);
      })
      
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
      if(codigoUsuario == result.data[0].codigoUsuario || user[0].tipo==1) {
        
        this.setState({autorizacaoTipo:user[0].tipo==1?true:false});
        UserAPI.get(codigoUsuario).then( async res=>{

          await PhoneAPI.listByUser(codigoUsuario).then(resPhones=>res[0]["telefones"] = resPhones);
          console.log(res);
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
    
    const {autorizacaoTipo, errorMessage} = this.state;

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
                mutators={{
                  ...arrayMutators
                }}
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
                          <Field name="apelido" validate={Validator.composeValidators(Validator.required, Validator.minCharNormal)}>
                            {({ input, meta }) => (
                              <FormGroup>
                                <label htmlFor="#apelido">Apelido*</label>
                                <FormInput {...input} id="#apelido" placeholder="Digite sua identificação" />     
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
                          {errorMessage && (<span className="d-flex required" style={{paddingBottom:"10px"}}>Já existe esse email cadastrado no Banco de Dados!</span>)}
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
                                                  {InputProps => <FormInput placeholder={"(99) 99999-9999"} disabled={false} {...InputProps} />}
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
                        {/* {JSON.stringify(values, 0, 2)} */}
                          <button type="submit" className="btn btn-success" style={{color:"#000", marginRight:"10px"}} disabled={submitting}>
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
	if (!values.apelido) {errors.apelido = "Campo Obrigatório";}
	if (!values.email) {errors.email = "Campo Obrigatório";}
	if (!values.senha) {errors.senha = "Campo Obrigatório";}
	return errors;
}

export default UserInsert;
