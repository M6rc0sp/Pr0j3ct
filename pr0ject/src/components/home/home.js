// Importando o React
import React, {Component} from "react";
import {Button, Row, Col} from 'react-bootstrap';

var sectionStyle = {
	fontsize: 27, 
  }

class Home extends Component {

	render(){
		return(
			<div className="col-lg-8 mx-auto">
			<p className="text-center mb-5" style={sectionStyle}> {this.state.site.titulo} </p>
			<p className="text-center mb-5"> {this.state.site.subtitulo} </p>

			<br />
			<Row className="justify-content-lg-center">
				<div className="d-flex flex-column">
					<Col xs lg="5">
						<Button bsSize="large" active>Evento</Button>
					</Col>
				</div>
			</Row>
			</div>
		);
	}
}

export default Home;