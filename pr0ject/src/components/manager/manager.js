import React, {Component} from 'react';
import './manager.css';
import axios from 'axios';

class Manager extends Component {

	constructor(props) {
    super(props);
    this.state = {
			intro: [],
			header: [],
			titulo: '',
			subtitulo: '',
			titulo2: '',
			texto: '',
    };

		this.handleChange = this.handleChange.bind(this);
		this.headerTitleChange = this.headerTitleChange.bind(this);
		this.headerTitle2Change = this.headerTitle2Change.bind(this);
		this.headerSubtitleChange = this.headerSubtitleChange.bind(this);
    this.submitIntro = this.submitIntro.bind(this);
  }

      callAPI() {
				axios.get('http://localhost:3001/intro')
				.then((res) => {
						this.setState({
							titulo2: res.data.titulo,
							texto: res.data.texto				
						});		
				})
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
		
		handleChange(event) {
			this.setState({texto: event.target.value});
		}
		headerTitle2Change(event) {
			this.setState({titulo2: event.target.value});
		}

		headerTitleChange(event) {
			this.setState({titulo: event.target.value});
		}

		headerSubtitleChange(event) {
			this.setState({subtitulo: event.target.value});
		}

		submitIntro(event) {
			axios.put('http://localhost:3001/intro', { 'titulo': this.state.titulo2, 'texto': this.state.texto })
				.then((res) => {
						console.log(res)	
				})
			event.preventDefault();
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
								<form onSubmit={this.submitHeader} id='header'>
									<label>
										<input type="text" value={this.state.titulo} onChange={this.headerTitleChange} />
									</label>
									<label>
										<input type="text" value={this.state.subtitulo} onChange={this.headerSubtitleChange} />
									</label>
									<input type="submit" value="Enviar" />
								</form>
							</div>
						</div>
					</div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto text-justify word-spacing: 10px">
                <div class="light my-4">
                  <form onSubmit={this.submitIntro} id='intro'>
										<label class="col-lg-12 mx-auto">
											<input type="text" value={this.state.titulo2} onChange={this.headerTitle2Change} />
											<textarea class="col-lg-12 mx-auto" value={this.state.texto} onChange={this.handleChange} />
										</label>
										<input type="submit" value="Enviar" />
									</form>    
              </div>
            </div>
          </div>
          </div>
        </section> 
        );
      }
  }
  
  export default Manager;