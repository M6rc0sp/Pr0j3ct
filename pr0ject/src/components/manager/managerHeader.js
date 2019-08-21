import React, {Component} from 'react';
import axios from 'axios';

class ManagerHeader extends Component {

	constructor(props) {
    super(props);
    this.state = {
		titulo: '',
		subtitulo: ''
	};
	
	this.headerTitleChange = this.headerTitleChange.bind(this);
    this.headerSubtitleChange = this.headerSubtitleChange.bind(this);
    this.submitHeader = this.submitHeader.bind(this);
  }

	callAPI() {
		axios.get('http://localhost:3001/admin')
		.then((res) => {
			this.setState({
				titulo: res.data.titulo,
				subtitulo: res.data.subtitulo			
			});		
		})

	}

    componentWillMount() {
        this.callAPI();
    }

    headerTitleChange(event) {
        this.setState({titulo: event.target.value});
    }

    headerSubtitleChange(event) {
        this.setState({subtitulo: event.target.value});
    }

    submitHeader(event) {
        axios.put('http://localhost:3001/admin', { 'titulo': this.state.titulo, 'subtitulo': this.state.subtitulo })
            .then((res) => {
                console.log(res)
            })
        event.preventDefault();
    }

    render (){
      return(
        <section class="bg-primary3" id="about">
			<div class="container">
				<div class="row">
					<div class="col-lg-8 mx-auto text-justify word-spacing: 10px">
						<form onSubmit={this.submitHeader} class="text-center" id='header'>
                            <h1>Cabeçalho</h1>
                            <br/>
							<label>
								<input type="text" value={this.state.titulo} onChange={this.headerTitleChange} />
							</label>
                            <br/>
                            <br/>
							<label>
								<input type="text" value={this.state.subtitulo} onChange={this.headerSubtitleChange} />
							</label>
                            <br/><br/>                            
							<input type="submit" value="Enviar" />
						</form>
					</div>
				</div>
			</div>
        </section> 
        );
      }
	}
  
export default ManagerHeader;