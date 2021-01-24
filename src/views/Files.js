import React,{ Component } from "react";
import { Container, Alert, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import {Link} from 'react-router-dom'
import * as FileAPI from "../utils/FileAPI"
import * as UserAPI from "../utils/UserAPI"
import PageTitle from "../components/common/PageTitle";
import "../assets/mycss.css";


class Files extends Component {
    
  state = {
    data: [],
    loading:true,
  }

  async componentDidMount() {

    const result = await UserAPI.isAutenticate()
    
    if(result.status==200) {
      let PromiseUser;
      if(result.data[0].codigoUsuario==1) {
        PromiseUser = FileAPI.listAll();
      } else {
        PromiseUser = FileAPI.listByUser(result.data[0].codigoUsuario)
      }
      const dados = await PromiseUser.then(data => { 
        data.map( async (d) => {
          d.positivo = await FileAPI.getValidations({arquivo:`${d.arquivo}`, tipo:'positivo' }).then(res=>{ console.log("as"); return res.data} );  
          d.negativo = await FileAPI.getValidations({arquivo:`${d.arquivo}`, tipo:'negativo' }).then(res=>{ console.log("as"); return res.data} );  
        })
        return data
      });
      await sleep(1500)  
      this.setState({data:dados, loading:false});
    }
    else {
      this.props.history.push("/login");
    }
  }

  removeFile = (file,e) => {

    const {notification} = this.props;
    e.preventDefault();
    FileAPI.remove(file).then(data=> {
      notification.success('Arquivo deletado com sucesso!', null, 2000);
    })
    this.setState(
      {data:this.state.data.filter(res=>res.codigoArquivo!=file.codigoArquivo)}
    )
	}

  render() {

    const {data, loading} = this.state;
    
    return (
      <Container fluid className="main-content-container px-4" id="main_">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Lista" subtitle="Arquivos" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">  
              <Link to={`/arquivos/inserir`} title="Adicionar Usuários">
                <i style={{fontSize:'22px'}} className="fas fa-plus-circle"></i>
              </Link>  
              </CardHeader>
              <CardBody className="p-0 pb-3">
                {loading && (<Alert theme="primary" style={{textAlign:"center"}}>... Carregando Dados!</Alert>)}
                {!loading && data && data.length==0 && (<Alert theme="light" style={{textAlign:"center"}}><i className="fas fa-exclamation-triangle"></i> Não existem Arquivos cadastrados!</Alert>)}
                {data && data.length>0 &&
                (<table className="table mb-0 table-hover">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Ações
                      </th>
                      <th scope="col" className="border-0">
                        Nome
                      </th>
                      <th scope="col" className="border-0">
                        Arquivo
                      </th>
                      <th scope="col" className="border-0">
                        Criptografia
                      </th>
                      <th scope="col" className="border-0">
                        Validações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((file)=>
                      (
                        <tr>
                          <td className="align-items-center">
                          <Link to={`/arquivos/editar/${file.codigoArquivo}`} title="Editar Usuário" className="col-1"><i className="fas fa-edit"></i>
                            </Link>
                            <a href="javascript:void(0);" onClick={(e)=>this.removeFile(file,e)} title="Excluir Arquivo" style={{color:'red' }}><i className="fas fa-trash-alt"></i></a>
                          </td>
                          <td>{file.nome}</td>
                          <td><a className="link_normal" href={file.url} title={file.nome}>{file.arquivo}</a></td>
                          <td><input type="text" value={file.cripto} onFocus={(e)=>e.target.select()} size="10"/></td>
                          <td><i style={{color:"green", fontSize:"14px"}} className="far fa-thumbs-up">({file.positivo})</i>&nbsp;&nbsp;<i style={{color:"red", fontSize:"14px"}} className="far fa-thumbs-down">({file.negativo})</i>&nbsp;&nbsp;&nbsp;<a style={{fontSize:"14px"}} href={`http://ec2-3-94-190-164.compute-1.amazonaws.com:4000/log/${file.arquivo}`}><i class="fas fa-file-alt"></i></a></td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>)}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
} 
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
// const getCountValidations = async (body) => {
//   // const body = {arquivo, tipo}
//   const result =  await FileAPI.getValidations(body)
//   return result;
//   // return (<span>${[result]}</span>);
// }

export default Files;
