import React, {Component} from "react";
import { Container, InputGroup, Alert,Button, InputGroupAddon, InputGroupText,Row, Col, Card, CardHeader, FormGroup, FormInput, CardBody } from "shards-react";
import { Form, Field } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import * as FileAPI from "../utils/FileAPI"
// import Crypto from "../utils/Crypto"
import * as Validator from "../utils/Validator"
import MainFooter from "../components/layout/MainFooter"
import {Link} from 'react-router-dom'

class FilesValidator extends Component {

  state = {
    dataUsers: {
      arquivo: "",
      codigo: "",
      motivacao:"",
    },
    errorMessage: false,
    informationValidation:false,
    informationSuccess:false
  }
  onSubmit = async (values) => {
    const verifyFile = await FileAPI.isFileOnDB(values);
    if(verifyFile.length>0) {
      let defaultValues;
      if(verifyFile[0].cripto == values.codigo) { 
        defaultValues = {validacao: "positivo"} 
        await FileAPI.validateFile({...values,...defaultValues}).then(resultValidation=> {
          this.setState({informationSuccess:true})
        }).catch(err => { alert("Erro ao processar validação Positiva!");  window.location.reload(); } );
        
      }
      else {
        defaultValues = {validacao: "negativo"} 
        await FileAPI.validateFile({...values,...defaultValues}).then(resultValidation=>{
          this.setState({errorMessage:false})
          this.setState({informationValidation:true}) 
        }).catch(err => { alert("Erro ao processar validação Negativa!");  window.location.reload(); } );
      }
    }
    else {
      this.setState({errorMessage:true})
      this.setState({informationValidation:false})
    }
    //Verificar se existe o arquivo no banco de dados
    //Se sim
      //compara com o hash
      //Independente da resposta grava no BD no Dynamo
    //Mandar mensagem
  }

  render() {
    const {errorMessage, informationValidation, informationSuccess} = this.state;
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Validador de Arquivos" subtitle="DocVal" className="text-sm-left" />
        </Row>
        <Row className="justify-content-center">
          {/* Editor */}
          <Col lg="5" md="6" xs="8">
          {informationSuccess && (
            
            <div className="justify-content-center" >
                <Alert className="mb-4" theme="success">Arquivo Validado com sucesso! </Alert>
                <Link className="align-items-center" to="/"><Button pill>&larr; Página Inicial</Button></Link>
            </div>
            )}
            <Card small className="mb-4" style={{marginTop:"60px"}}>
              {!informationSuccess && (
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
                              {
                                ({ input: { value, onChange, ...input }, meta }) => {
                                const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
                                  onChange(target.files[0].name) // instead of the default target.value
                                }
                                return (
                                  <FormGroup>
                                    <label htmlFor="#arquivo">Arquivo*</label>
                                    <InputGroup className="mb-3">
                                      <InputGroupAddon type="prepend">
                                        <InputGroupText><i class="fas fa-file"></i></InputGroupText>
                                      </InputGroupAddon>
                                      <FormInput {...input} type="file" id="arquivo" onChange={handleChange} /> 
                                    </InputGroup>
                                    {/* <input {...input} type="file" onChange={handleChange} /> */}
                                    {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                                  </FormGroup>
                                )
                              }}
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
                            {errorMessage && (<span className="d-flex required" style={{paddingBottom:"10px"}}>Não existe arquivo no Banco de dados!</span>)}
                            {informationValidation && (<span className="d-flex required" style={{paddingBottom:"10px"}}>Validação <b>Negativa! </b> O arquivo não foi validado!</span>)}
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
              </CardBody>)}
            </Card>
          </Col>
          <div className="d-none d-xs-block d-xl-block d-md-block d-lg-block" style={{position:"fixed",bottom:0,width: "100%"}}>
            <MainFooter/>
          </div>
        </Row>
        
        
      </Container>
    )
  }
}



const initalValidate = (values) => {

	const errors = {};
	if (!values.arquivo) {errors.email = "Campo Obrigatório";}
  if (!values.codigo) {errors.codigo = "Campo Obrigatório";}
  if (!values.motivacao) {errors.motivacao = "Campo Obrigatório";}
	return errors;
}

export default FilesValidator;
