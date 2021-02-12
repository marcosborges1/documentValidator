import React from "react";
import { Container,Row, Col, Card, Button, CardBody } from "shards-react";
import {Link} from 'react-router-dom'
import PageTitle from "../components/common/PageTitle";

const Index = () => {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Página Inicial" subtitle="DocVal" className="text-sm-left" />
        </Row>

        <Row className="justify-content-center">
          {/* Editor */}
          <Col lg="2" md="2" xs="2">
            <Card small className="mb-4 d-flex align-items-center" style={{marginTop:"60px", paddingBottom:"5px"}}>
              <CardBody className="p-0">
                <i style={{fontSize:"130px", color: "#61d889"}} className="far fa-check-square"></i>
              </CardBody>
              <Link to="/validacao"><Button pill>&larr; Validação</Button></Link>
            </Card>
          </Col>
          <Col lg="2" md="2" xs="2">
            <Card small className="mb-4 d-flex align-items-center" style={{marginTop:"60px", paddingBottom:"5px"}}>
              <CardBody className="p-0">
                <i style={{fontSize:"120px", paddingTop:"5px",paddingBottom:"5px", color: "#51b4d6"}} className="fas fa-unlock"></i>
              </CardBody>
              {!localStorage.token && (<Link to="/login"><Button pill>Login &rarr;</Button></Link>)}
              {localStorage.token && (<Link to="/arquivos"><Button pill>Acessar &rarr;</Button></Link>)}
            </Card>
          </Col>
        </Row>
      </Container>
    )
}



const initalValidate = (values) => {

	const errors = {};
	if (!values.email) {errors.email = "Campo Obrigatório";}
	if (!values.senha) {errors.senha = "Campo Obrigatório";}
	return errors;
}

export default Index;
