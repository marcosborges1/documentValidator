import React, {Component} from "react";
import { Container,Row} from "shards-react";
import * as UserAPI from "../utils/UserAPI"

class Home extends Component {

  async componentWillMount() {

    await UserAPI.isAutenticate().then(result => {
      if(result.status===401) {
         this.props.history.push("/errors")
      }
    }).catch(error=>console.error(error));
  }

  render() {
    return (
      <Container fluid className="main-content-container align-items-center align-self-center d-flex px-4" id="main_">
        <Row className="error__content "> 
            <h3><i style={{fontSize:'30px', color:"#5194E2"}} class="far fa-smile"></i> Seja bem vindo ao Sistema DocVal!</h3>
            <h6>Para utilizar o sistema clique no menu ao lado!</h6>
            <i style={{fontSize:'50px', color:"#5194E2"}} class="fas fa-sitemap"></i>
        </Row>
      </Container>
    )
  }
}


export default Home;
