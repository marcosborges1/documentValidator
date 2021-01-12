import React, {Component} from "react";
import { Container, Row, Col, Card, CardHeader, FormGroup, FormInput, CardBody } from "shards-react";
import { Form, Field,FieldProps  } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import * as FileAPI from "../utils/FileAPI"
import * as Validator from "../utils/Validator"
import "../assets/mycss.css";
const path = require('path');
const axios = require("axios");

// import ArrowBack from "../components/common/ArrowBack";

class FileInsert extends Component {

  state = {
      nome: "",
      arquivo: "",
      arquivoAtual:"",
      codigoUsuario:5,
      showArquivo:false
  }

  onFormSubmit = (e) => {
    
    e.preventDefault();

    const {codigoArquivo} = this.props.match.params;
    const formData = new FormData();
    const config = {headers: {'content-type': 'multipart/form-data'}};

    formData.append('nome',this.state.nome);
    formData.append('arquivo',this.state.arquivo);
    formData.append('codigoUsuario',this.state.codigoUsuario);

    if(!codigoArquivo) {
      
      // formData.append('nome',this.state.nome);
      // formData.append('arquivo',this.state.arquivo);
      // formData.append('codigoUsuario',this.state.codigoUsuario);

      axios.post("http://localhost:4000/inserirArquivo",formData,config)
        .then((response) => {
            console.log("The file is successfully uploaded");
        }).catch((error) => {});
    }
    else {
      
      formData.append('arquivoAtual',this.state.arquivoAtual); 
      // console.log(this.state.arquivoAtual)
      // console.log(this.state.arquivo)
      axios.put(`http://localhost:4000/atualizarArquivo/${codigoArquivo}`,formData,config)
        .then((response) => {
            console.log("The file is successfully uploaded");
        }).catch((error) => {});
    }
    
  }
  
  // onSubmit = async (values) => {
    
  //   console.log(values);
  //   const defaultValues = {codigoUsuario: 5}

  //   const formData = new FormData();
  //   formData.append("nome", values.nome);
  //   formData.append("arquivo", values.arquivo);
    
  //   return await fetch("http://localhost:4000/inserirArquivo", {
  //     method: "POST",
  //     headers: {
  //       'content-type': 'multipart/form-data;boundary=something'
  //     },
  //     body: formData,
  //   })

    


    // console.log(values.arquivo[0].name)
    // console.log(values.arquivo);
    // values.arquivo = values.arquivo[0].name
    // values.cripto = Crypto.encrypt(values.arquivo[0].name);

    // const {codigoArquivo} = this.props.match.params;

    // if(!codigoArquivo) {
      
      // FileAPI.insert({...defaultValues,...values});
    // FileAPI.insert(formData);
    //   //Mensagem
    // }
    // else {
      
    //   console.log({...defaultValues,...values});
    //   FileAPI.update(codigoArquivo, {...defaultValues,...values})
    //   //Mensagem
    // }
    // this.props.history.push('/arquivos')
  // }

  async componentDidMount() {

    const {codigoArquivo} = this.props.match.params;

    if(codigoArquivo) {
      
      FileAPI.get(codigoArquivo).then(res=>{

        if(typeof res !== 'undefined' && res.length > 0) {
          console.log("Tem conteudo")
          // res[0].arquivo = "";
          // console.log(res[0])
          const {nome, arquivo, codigoArquivo,codigoUsuario} = res[0];
          this.setState({nome, arquivo, arquivoAtual:arquivo, codigoArquivo,codigoUsuario,showArquivo:true})

          // this.setState({dataFiles:res[0]})
        } else {
          console.log("Não")
        }

      }).catch(error=>console.log(error.message))
    }
  }

  initalValidate = (values) => {

    const errors = {};
    if (!values.nome) {errors.nome = "Campo Obrigatório";}
    if (!values.arquivo) {errors.arquivo = "Campo Obrigatório";}
    return errors;
  }

//   onFormSubmit = (e)=> {
//     e.preventDefault();
//         const formData = new FormData();
//         formData.append('myImage',this.state.file);
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         };
//     // console.log(formData.values)
//     axios.post("http://localhost:4000/inserirArquivo",formData,config)
//         .then((response) => {
//             alert("The file is successfully uploaded");
//         }).catch((error) => {
//     });
// }

  render () {
    const {nome, arquivo, codigoUsuario, codigoArquivo, showArquivo} = this.state;
    console.log(codigoUsuario);
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Inserir" subtitle="Arquivo" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0"><i style={{color:"#007BFF"}} className="fas fa-exclamation-triangle"></i> Preencha os campos abaixo. Campos Obrigatórios(*)</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <form onSubmit={this.onFormSubmit}>
                  <Row className="p-4 pb-3">
                    <Col lg="12" md="12">
                      <FormGroup>
                        <label htmlFor="#nome">Nome*</label>
                        <input type="text" name="nome" className="form-control" placeholder="Digite seu nome completo" value={nome} onChange= {(e)=>this.setState({nome:e.target.value})} />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="#arquivo">Arquivo*<i> (Somente: pdf, jpeg e png)</i></label><br/>
                        {showArquivo && (<div><span className="arquivo_selecionado"><i className="fas fa-file"></i> {arquivo}</span><a className="other_choice" onClick={()=>this.setState({showArquivo:false})} href="javascript:void(0)" >Escolher outro arquivo</a></div>)}
                        {!showArquivo && (<input type="file" accept="application/pdf,image/png, image/jpeg" name="arquivo" onChange={(e)=>this.setState({arquivo : e.target.files[0]})} />)}
                      </FormGroup>
                    </Col>
                    <Col lg="12"className="p-3" md="12">
                      <button type="submit" className="btn btn-success" style={{color:"#000", marginRight:"10px"}}>
                        Salvar
                      </button>
                      <button
                        type="button" className="btn btn-warning">
                        Limpar
                      </button>
                    </Col>
                  </Row>
                </form>
                {/* <Form 
                  onSubmit={this.onSubmit} 
                  validate={this.initalValidate}
                  initialValues={this.state.dataFiles} 
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
                            <Field name="arquivo">
                              {({ input: { value, onChange, ...input } }) => {
                                const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
                                  onChange(target.files) // instead of the default target.value
                                }
                                return <input {...input} type="file" onChange={handleChange} />
                              }}
                            </Field> */}
                            {/* <Field name="arquivo">
                              {({ input, meta }) => (
                                <FormGroup>
                                  <label htmlFor="#arquivo">Arquivo*</label>
                                  <FormInput {...input} type="file" id="arquivo" onChange={this.onChange} /> 
                                  {meta.error && meta.touched && <span className="required">{meta.error}</span>}
                                </FormGroup>
                              )}
                            </Field> */}
                          {/* </Col>
                          
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
                  }} /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default FileInsert;
