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
			</div>
		);
	}
}

export default Home;