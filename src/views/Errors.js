import React from "react";
import { Container, Button } from "shards-react";

const Errors = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h3>Alguma coisa aconteceu errado!</h3>
        <p>Você acessou uma página restrita</p>
        <a href="/"><Button pill>&larr; Ir para Home</Button></a>
      </div>
    </div>
  </Container>
);

export default Errors;
