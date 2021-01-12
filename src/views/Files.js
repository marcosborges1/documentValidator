import React,{ Component } from "react";
import { Container, Alert, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import {Link} from 'react-router-dom'
import * as FileAPI from "../utils/FileAPI"
import PageTitle from "../components/common/PageTitle";


class Files extends Component {
    
  state = {
    data: []
  }

  componentDidMount() {
    FileAPI.listAll().then(data=> this.setState({data}))
  }

  removeFile = (file,e) => {

    e.preventDefault();
    FileAPI.remove(file).then(data=> console.log(data))
    this.setState(
      {data:this.state.data.filter(res=>res.codigoArquivo!=file.codigoArquivo)}
    )
	}

  render () {

    const {data} = this.state;

    return (
      <Container fluid className="main-content-container px-4">
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
                {data.length==0 && (<Alert theme="light" style={{textAlign:"center"}}><i className="fas fa-exclamation-triangle"></i> Não existem Arquivos cadastrados!</Alert>)}
                {data.length>0 &&
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
                        Usuário
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
                          <td>{file.arquivo}</td>
                          <td><input type="text" value={file.cripto} onFocus={(e)=>e.target.select()} size="10"/></td>
                          <td>{file.codigoUsuario}</td>
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
    );
  }
}    

export default Files;
