import React, {Component} from "react";
import { Container, InputGroup, InputGroupAddon, InputGroupText,Row, Col, Card, CardHeader, FormGroup, FormInput, CardBody } from "shards-react";
import { Form, Field } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import * as UserAPI from "../utils/UserAPI"
import * as Validator from "../utils/Validator"
import MainFooter from "../components/layout/MainFooter"

class FilesValidator extends Component {

  state = {
    dataUsers: {
      email: "",
      senha: ""
    }
  }
  onSubmit = async (values) => {
    
    const {codigoUsuario} = this.props.match.params;

    if(!codigoUsuario) {
      UserAPI.insert(values);
      //Mensagem
    }
    else {
      UserAPI.update(codigoUsuario, values)
      //Mensagem
    }
    this.props.history.push('/usuarios')
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Validador de Arquivos" subtitle="DocVal" className="text-sm-left" />
        </Row>

        <Row className="justify-content-center">
          {/* Editor */}
          <Col lg="5" md="6" xs="8">
            <Card small className="mb-4" style={{marginTop:"60px"}}>
              <CardBody className="p-0">
                <Form 
                  onSubmit={this.onSubmit} 
                  validate={initalValidate}
                  initialValues={this.state.dataUsers} 
                  render={({ handleSubmit, pristine, reset, submitting, values }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <Row className="p-4 pb-3">
                          <Col lg="12" md="12">  
                            <Field name="arquivo">
                              {({ input, meta }) => (
                                <FormGroup>
                                  <label htmlFor="#arquivo">Arquivo*</label>
                                  <InputGroup className="mb-3">
                                    <InputGroupAddon type="prepend">
                                      <InputGroupText><i class="fas fa-file"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput {...input} type="file" id="arquivo" onChange={this.onChange} />   
                                  </InputGroup>
                                  {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                                </FormGroup>
                              )}
                            </Field> 
                            <Field name="codigo" validate={Validator.composeValidators(Validator.required, Validator.minCharPassword)}>
                              {({ input, meta }) => (
                                <FormGroup>
                                  <label htmlFor="#codigo">Código*</label>
                                  <InputGroup className="mb-3">
                                    <InputGroupAddon type="prepend">
                                      <InputGroupText><i className="fas fa-font"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput {...input} id="codigo" placeholder="Digite o codigo do arquivo a ser validado" />     
                                  </InputGroup>
                                  {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                                </FormGroup>
                              )}
                            </Field>
                            <Field name="motivacao" validate={Validator.composeValidators(Validator.required)}>
                              {({ input, meta }) => (
                                <FormGroup>
                                  <label htmlFor="#motivacao">Motivação da Validação*</label>
                                  <InputGroup className="mb-3">
                                    <InputGroupAddon type="prepend">
                                      <InputGroupText><i className="fas fa-comment"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput {...input} id="motivacao" placeholder="Informa a motivação para validação" />     
                                  </InputGroup>
                                  {meta.error && meta.touched && <span className="required" >{meta.error}</span>}
                                </FormGroup>
                              )}
                            </Field>
                          </Col>
                          <Col lg="12" md="12">
                            <button type="submit" className="btn btn-primary" style={{marginRight:"10px"}} disabled={submitting || pristine}>
                              Validar
                            </button>
                          </Col>
                        </Row>
                      </form>
                    )
                  }}
                />
              </CardBody>
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

export default FilesValidator;
