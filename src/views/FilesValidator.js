import React, {Component} from "react";
import { Container, InputGroup, Alert,Button, InputGroupAddon, InputGroupText,Row, Col, Card, CardHeader, FormGroup, FormInput, CardBody } from "shards-react";
import { Form, Field } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import * as FileAPI from "../utils/FileAPI"
// import Crypto from "../utils/Crypto"
import * as Validator from "../utils/Validator"
import MainFooter from "../components/layout/MainFooter"
import {Link} from 'react-router-dom'
import config from "../config"
const axios = require("axios");

class FilesValidator extends Component {

  state = {
    
    arquivo: "",
    codigo: "",
    motivacao:"",
    errorMessage: false,
    informationValidation:false,
    informationSuccess:false
  }
  validateInsert() {
    
    let pass = true;
    document.getElementById("erro_arquivo").innerHTML="";
    document.getElementById("erro_codigo").innerHTML="";
    document.getElementById("erro_motivacao").innerHTML="";
    
    if(this.state.arquivo == "") {
      document.getElementById("erro_arquivo").innerHTML="Faça o upload do arquivo";
      pass = false;
    }
    
    if(this.state.codigo == "") {
      document.getElementById("erro_codigo").innerHTML="Preencha o campo codigo";
      pass = false; 
    }

    if(this.state.motivacao == "") {
      document.getElementById("erro_motivacao").innerHTML="Preencha o campo motivação";
      pass = false; 
    }
    
    return pass
  }

  onFormSubmit = async (e) => {

    e.preventDefault();
    document.getElementById("enviar_arquivo").disabled=true;
    document.getElementById("enviar_arquivo").innerHTML="Enviando...";

    const pass = this.validateInsert();

    if(!pass) {
      document.getElementById("enviar_arquivo").disabled=false;
      document.getElementById("enviar_arquivo").innerHTML="Validar";
      return 
    }

    const formData = new FormData();
    const configType = {timeout: 10000,headers: {'content-type': 'multipart/form-data'}};

    formData.append('arquivo',this.state.arquivo);
    formData.append('codigo',this.state.codigo);
    formData.append('motivacao',this.state.motivacao);

    // formData.append('hash',this.state.arquivo);

    // const verifyFile = await FileAPI.isFileOnDB(formData);
     const verifyFile = await axios.post(`${config.SERVER_URL}/verificarArquivoParaValidacao`,formData,configType)
        .then(async (response) => {
            if(response.data[0]) {
              const data = response.data[0];
              if(data.cripto == this.state.codigo) { 
                const defaultValues = {arquivo:data.arquivo, motivacao: this.state.motivacao, codigo:this.state.codigo, validacao: "positivo"} 
                await FileAPI.validateFile({...defaultValues}).then(resultValidation=> {
                  this.setState({informationSuccess:true})
                }).catch(err => { alert("Erro ao processar validação Positiva!");  window.location.reload(); } );
              }
              else {
                const defaultValues = {arquivo:data.arquivo, motivacao: this.state.motivacao, codigo:this.state.codigo, validacao: "negativo"} 
                await FileAPI.validateFile({...defaultValues}).then(resultValidation=>{
                  document.getElementById("enviar_arquivo").disabled=false;
                  document.getElementById("enviar_arquivo").innerHTML="Validar";
                  this.setState({errorMessage:false})
                  this.setState({informationValidation:true}) 
                }).catch(err => { alert("Erro ao processar validação Negativa!");  window.location.reload(); } );
              }
            }
            else {
              document.getElementById("enviar_arquivo").disabled=false;
              document.getElementById("enviar_arquivo").innerHTML="Validar";
              this.setState({errorMessage:true})
              this.setState({informationValidation:false})
            }
            
        }).catch((error) => console.log(error));

    // if(verifyFile.length>0) {
    //   console.log("Tem arquivo");
    //   let defaultValues;
    //   console.log(verifyFile[0].cripto)
    //   console.log(values.codigo)
    //   if(verifyFile[0].cripto == values.codigo) { 
    //     defaultValues = {validacao: "positivo"} 
    //     await FileAPI.validateFile({...values,...defaultValues}).then(resultValidation=> {
    //       this.setState({informationSuccess:true})
    //     }).catch(err => { alert("Erro ao processar validação Positiva!");  window.location.reload(); } );
        
    //   }
    //   else {
    //     defaultValues = {validacao: "negativo"} 
    //     await FileAPI.validateFile({...values,...defaultValues}).then(resultValidation=>{
    //       this.setState({errorMessage:false})
    //       this.setState({informationValidation:true}) 
    //     }).catch(err => { alert("Erro ao processar validação Negativa!");  window.location.reload(); } );
    //   }
    // }
    // else {
    //   this.setState({errorMessage:true})
    //   this.setState({informationValidation:false})
    // }
    // else {
    //   console.log("Não tem arquivo");
    // }


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
                <form onSubmit={this.onFormSubmit}>
                        <Row className="p-4 pb-3">
                          <Col lg="12" md="12"> 
                              <FormGroup>
                                <label htmlFor="#arquivo">Arquivo*</label>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon type="prepend">
                                    <InputGroupText><i class="fas fa-file"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <input type="file" id="arquivo" name="arquivo" accept=".docx, text/plain, application/pdf,image/png, image/jpeg" onChange={(e)=>this.setState({arquivo : e.target.files[0]})} /> 
                                </InputGroup>
                                {/* <input {...input} type="file" onChange={handleChange} /> */}
                                <span className="required" id="erro_arquivo"></span>
                              </FormGroup>
                              <FormGroup>
                                <label htmlFor="#codigo">Código*</label>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon type="prepend">
                                    <InputGroupText><i className="fas fa-font"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <FormInput id="codigo" name="codigo" placeholder="Digite o codigo do arquivo a ser validado" onChange={(e)=>this.setState({codigo:e.target.value})} />     
                                </InputGroup>
                                <span className="required" id="erro_codigo"></span>
                              </FormGroup>
                              <FormGroup>
                                <label htmlFor="#motivacao">Motivação da Validação*</label>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon type="prepend">
                                    <InputGroupText><i className="fas fa-comment"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <FormInput id="motivacao" name="motivacao"  placeholder="Informa a motivação para validação" onChange={(e)=>this.setState({motivacao:e.target.value})} />     
                                </InputGroup>
                                <span className="required" id="erro_motivacao"></span>
                              </FormGroup>
                              
                            {errorMessage && (<span className="d-flex required" style={{paddingBottom:"10px"}}>Arquivo não existe arquivo no Banco de dados!</span>)}
                            {informationValidation && (<span className="d-flex required" style={{paddingBottom:"10px"}}>Validação <b>Negativa! </b> O arquivo não foi validado!</span>)}
                          </Col>
                          <Col lg="12" md="12">
                            <button type="submit" id="enviar_arquivo" className="btn btn-primary" style={{marginRight:"10px"}}>
                              Validar
                            </button>
                          </Col>
                        </Row>
                      </form>
              
              </CardBody>)}
            </Card>
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
	if (!values.arquivo) {errors.email = "Campo Obrigatório";}
  if (!values.codigo) {errors.codigo = "Campo Obrigatório";}
  if (!values.motivacao) {errors.motivacao = "Campo Obrigatório";}
	return errors;
}

export default FilesValidator;
