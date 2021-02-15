import React, {Component} from "react";
import 'react-notifications/lib/notifications.css';
import { Container, Row, Col, Card, CardHeader, FormGroup, FormInput, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import * as FileAPI from "../utils/FileAPI"
import * as UserAPI from "../utils/UserAPI"
import "../assets/mycss.css";
import config from "../config"

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
    document.getElementById("enviar_arquivo").disabled=true;
    document.getElementById("enviar_arquivo").innerHTML="Enviando...";
    
    const pass = this.validateInsert();

    if(!pass) {
      document.getElementById("enviar_arquivo").disabled=false;
      document.getElementById("enviar_arquivo").innerHTML="Salvar";
      return 
    }

      const {history, notification} = this.props
      const {codigoArquivo} = this.props.match.params;
      const formData = new FormData();
      const configType = {timeout: 10000,headers: {'content-type': 'multipart/form-data'}};

      formData.append('nome',this.state.nome);
      formData.append('codigoUsuario',this.state.codigoUsuario);
      formData.append('arquivo',this.state.arquivo);

      if(!codigoArquivo) {
        
        const verifyFile = await FileAPI.isFileOnDB({arquivo:this.state.arquivo.name});
        if(verifyFile.length>0) {
          document.getElementById("erro_existe_arquivo").innerHTML = "Já existe um arquivo com o mesmo nome no Banco de Dados<br/><b>Por favor renomeie o arquivo!</b>"
          document.getElementById("enviar_arquivo").disabled=false;
          document.getElementById("enviar_arquivo").innerHTML="Salvar";
          return 
        }
        else {
          await axios.post(`${config.SERVER_URL}/inserirArquivo`,formData,configType)
            .then((response) => {
                console.log("Arquivo feito upload com sucesso!");
                notification.success('Arquivo inserido com sucesso!', null, 2000);
                history.push("/arquivos");
            }).catch((error) => {});
        }
      }
      else {
        
        formData.append('arquivoAtual',this.state.arquivoAtual); 
        // console.log(this.state.arquivoAtual)
        // console.log(this.state.arquivo)
        axios.put(`${config.SERVER_URL}/atualizarArquivo/${codigoArquivo}`,formData,configType)
          .then((response) => {
            notification.success('Arquivo atualizado com sucesso!', null, 2000);
            history.push("/arquivos");
          }).catch((error) => {});
      }
    
  }
  validateInsert() {
    
    let pass = true;
    document.getElementById("erro_nome").innerHTML="";
    document.getElementById("erro_arquivo").innerHTML="";
    document.getElementById("erro_existe_arquivo").innerHTML = "";
    
    if(this.state.nome == "") {
      document.getElementById("erro_nome").innerHTML="Preencha o campo nome";
      pass = false; 
    }
    if(this.state.arquivo == "") {
      document.getElementById("erro_arquivo").innerHTML="Faça o upload do arquivo";
      pass = false;
    }
    return pass
  }
  async componentDidMount() {

    await UserAPI.isAutenticate().then(result=>this.setState({codigoUsuario:result.data[0].codigoUsuario}));

    const {codigoArquivo} = this.props.match.params;

    if(codigoArquivo) {
      
      FileAPI.get(codigoArquivo).then(res=>{

        if(typeof res !== 'undefined' && res.length > 0) {
          console.log("Tem conteudo")
          const {nome, arquivo, codigoArquivo,codigoUsuario} = res[0];
          this.setState({nome, arquivo, arquivoAtual:arquivo, codigoArquivo,codigoUsuario,showArquivo:true})
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
                        <span id="erro_nome" className="required"></span>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="#arquivo">Arquivo*<i> (Somente: pdf, jpeg e png)</i></label><br/>
                        {showArquivo && (<div><span className="arquivo_selecionado"><i className="fas fa-file"></i> {arquivo}</span><a className="other_choice" onClick={()=>this.setState({showArquivo:false})} href="javascript:void(0)" >Escolher outro arquivo</a></div>)}
                        {!showArquivo && (<input type="file" accept="application/pdf,image/png, image/jpeg" name="arquivo" onChange={(e)=>this.setState({arquivo : e.target.files[0]})} />)}
                        <br/>
                        <span id="erro_arquivo" className="required"></span>
                        <span id="erro_existe_arquivo" className="required"></span>
                      </FormGroup>
                    </Col>
                    <Col lg="12"className="p-3" md="12">
                      <button id="enviar_arquivo" type="submit" className="btn btn-success" style={{color:"#000", marginRight:"10px"}} >
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
export default FileInsert;
