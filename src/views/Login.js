import React, {Component} from "react";
import { Container, InputGroup,
  InputGroupAddon,
  InputGroupText,Row, Col, Card, FormGroup, FormInput, CardBody } from "shards-react";
import { Form, Field } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import * as UserAPI from "../utils/UserAPI"
import * as Validator from "../utils/Validator"
import {Link} from 'react-router-dom'
import MainFooter from "../components/layout/MainFooter"

class Login extends Component {

  state = {
    dataUsers: {
      email: "marcia.borges@gmail.com",
      senha: "senhadamarcia"
    },
    errorMessage: false,
    isLoged:false
  }
  async componentDidMount() {
    const result = await UserAPI.isAutenticate()
      if(result.status==200) {
        this.setState({isLoged:true})
      }
      else {
        this.setState({isLoged:false})
      }
    // }).catch(error=>console.error(error));
  }
  onSubmit = async (values) => {

    const result = await UserAPI.login(values);
    const {notification, history} = this.props;
    console.log(this.props)
    
    if(result.data["auth"])  {
      localStorage.token = result.data["token"];
      notification.success('Login realizado com sucesso!', null, 2000);
      history.push('/arquivos')
    }
    else {
        this.setState({errorMessage:true})
    }
  }

  render() {

    const {errorMessage,isLoged} = this.state;
    return (

      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Login" subtitle="DocVal" className="text-sm-left" />
        </Row>

        <Row className="justify-content-center">
          {/* Editor */}
          <Col lg="5" md="6" xs="8">
            <Card small className="mb-4" style={{marginTop:"60px"}}>
              {isLoged && (<h2>Você ja está logado!</h2>)}
              {!isLoged && (<CardBody className="p-0">
                <Form 
                  onSubmit={this.onSubmit} 
                  validate={initalValidate}
                  initialValues={this.state.dataUsers} 
                  render={({ handleSubmit, pristine, reset, submitting, values }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <Row className="p-4 pb-3">
                          <Col lg="12" md="12">  
                            <Field name="email" validate={Validator.composeValidators(Validator.required, Validator.isEmail)}>
                              {({ input, meta }) => (
                                <FormGroup>
                                  <label htmlFor="#email">Email*</label>
                                  <InputGroup className="mb-3">
                                    <InputGroupAddon type="prepend">
                                      <InputGroupText>@</InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput {...input} id="email" placeholder="Digite seu email" />     
                                  </InputGroup>
                                  {meta.error && meta.touched && <span className="required" >{meta.error}</span>}
                                </FormGroup>
                              )}
                            </Field>
                            <Field name="senha" validate={Validator.composeValidators(Validator.required, Validator.minCharPassword)}>
                              {({ input, meta }) => (
                                <FormGroup>
                                  <label htmlFor="#senha">Senha*</label>
                                  <InputGroup className="mb-3">
                                    <InputGroupAddon type="prepend">
                                      <InputGroupText><i className="fas fa-key"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput {...input} type="password" id="senha" placeholder="Digite sua senha" />     
                                  </InputGroup>
                                  {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                                </FormGroup>
                              )}
                            </Field>
                            {errorMessage && (<span className="d-flex required" style={{paddingBottom:"10px"}}>Usuario ou senha inválidos!</span>)}
                          </Col>
                          
                          <Col lg="12" md="12">
                          
                            <button type="submit" className="btn btn-primary" style={{marginRight:"10px"}} >
                            {/* disabled={submitting || pristine} */}
                              Login
                            </button>
                            <Link to="/cadastrar-se" style={{float:"right",marginTop:"10px"}}>Cadastre-se</Link>
                          </Col>
                        </Row>
                      </form>
                    )
                  }}
                />
              </CardBody>)}
            </Card>
          </Col>
          <div style={{position:"fixed",bottom:0,width: "100%"}}>
            <MainFooter/>
          </div>
        </Row>
        
        
      </Container>
      
    )
  }
}



const initalValidate = (values) => {

	const errors = {};
	if (!values.email) {errors.email = "Campo Obrigatório";}
	if (!values.senha) {errors.senha = "Campo Obrigatório";}
	return errors;
}

export default Login;
