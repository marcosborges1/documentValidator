import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody,Form, FormInput, FormGroup, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
// import ArrowBack from "../components/common/ArrowBack";

const ArquivosInserir = () => (
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
            <h6 className="m-0"><i style={{color:"#007BFF"}} className="fas fa-exclamation-triangle"></i> Preencha os campos abaixo.</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <Form>
              <Row className="p-4 pb-3">
                <Col lg="6" md="6">
                    <FormGroup>
                      <label htmlFor="#nome">Nome</label>
                      <FormInput id="#nome" placeholder="Digite o nome do arquivo" />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="#arquivo">Arquivo</label>
                      <FormInput type="file" />
                    </FormGroup>
                </Col>
              <Col lg="12"className="p-3" md="12">
                <Button theme="success" style={{marginRight:"10px"}}>
                  Salvar
                </Button>
                <Button theme="warning" type="reset">
                  Limpar
                </Button>
              </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default ArquivosInserir;
