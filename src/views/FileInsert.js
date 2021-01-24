import React, {Component} from "react";
import 'react-notifications/lib/notifications.css';
import { Container, Row, Col, Card, CardHeader, FormGroup, FormInput, CardBody } from "shards-react";
import { Form, Field,FieldProps  } from 'react-final-form'
import PageTitle from "../components/common/PageTitle";
import * as FileAPI from "../utils/FileAPI"
import * as UserAPI from "../utils/UserAPI"
import * as Validator from "../utils/Validator"
import "../assets/mycss.css";

const path = require('path');
const axios = require("axios");

class FileInsert extends Component {

  state = {
      nome: "",
      arquivo: "",
      arquivoAtual:"",
      codigoUsuario:0,
      showArquivo:false
  }

  onFormSubmit = async (e) => {
    
    e.preventDefault();

    const {history, notification} = this.props
    const {codigoArquivo} = this.props.match.params;
    const formData = new FormData();
    const config = {timeout: 6000,headers: {'content-type': 'multipart/form-data'}};

    formData.append('nome',this.state.nome);
    formData.append('arquivo',this.state.arquivo);
    formData.append('codigoUsuario',this.state.codigoUsuario);

    if(!codigoArquivo) {

      await axios.post("http://ec2-3-94-190-164.compute-1.amazonaws.com:4000/inserirArquivo",formData,config)
        .then((response) => {
            console.log("Arquivo feito upload com sucesso!");
            notification.success('Arquivo inserido com sucesso!', null, 2000);
            history.push("/arquivos");
        }).catch((error) => {});
    }
    else {
      
      formData.append('arquivoAtual',this.state.arquivoAtual); 
      // console.log(this.state.arquivoAtual)
      // console.log(this.state.arquivo)
      axios.put(`http://ec2-3-94-190-164.compute-1.amazonaws.com:4000/atualizarArquivo/${codigoArquivo}`,formData,config)
        .then((response) => {
          notification.success('Arquivo atualizado com sucesso!', null, 2000);
          history.push("/arquivos");
        }).catch((error) => {});
    }
  }

  async componentDidMount() {

    await UserAPI.isAutenticate().then(result=>this.setState({codigoUsuario:result.data[0].codigoUsuario}));

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
                        <input type="text" name="nome" className="form-control" placeholder="Digite o nome do arquivo" value={nome} onChange= {(e)=>this.setState({nome:e.target.value})} />
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
export default FileInsert;
