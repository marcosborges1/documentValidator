import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const dadosArquivo = [
    {
      codigo:1,
      arquivo: 'teste.pdf',
      usuario_codigo:'1',
    },
    {
      codigo:2,
      arquivo: 'teste2.pdf',
      usuario_codigo:'2',
    },
    {
      codigo:3,
      arquivo: 'teste3.txt',
      usuario_codigo:'1',
    },

    
]

const Arquivos = () => (
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
            
            <a href="#">
              <i style={{fontSize:'22px'}} class="fas fa-plus-circle"></i>
            </a>  
          </CardHeader>
          <CardBody className="p-0 pb-3">
            
            <table className="table mb-0 table-hover">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Ações
                  </th>
                  <th scope="col" className="border-0">
                    Arquivo
                  </th>
                  <th scope="col" className="border-0">
                    Usuário
                  </th>
                </tr>
              </thead>
              <tbody>
                {dadosArquivo && dadosArquivo.map((arquivo)=>
                  (
                    <tr>
                      <td className="align-items-center">
                        <a href="#" className="col-1"><i className="fas fa-edit"></i></a>
                        <a href="#" style={{color:'red' }}><i className="fas fa-trash-alt"></i></a>
                      </td>
                      <td>{arquivo.arquivo}</td>
                      <td>{arquivo.usuario_codigo}</td>
                    </tr>
                  )
                )}
                
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Arquivos;
