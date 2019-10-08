import React, { Component } from 'react';
import axios from 'axios';
import photo from './../../images/header.jpg';

var background = {
  backgroundImage: "url(" + photo + ")",
  color: "black",
}

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
    axios.get('https://profdantas.herokuapp.com/hdr')
      .then(async (res) => {
        this.setState({
          titulo: await res.data.titulo,
          subtitulo: await res.data.subtitulo
        });
      })

  }

  componentWillMount() {
    this.callAPI();
  }

  headerTitleChange(event) {
    this.setState({ titulo: event.target.value });
  }

  headerSubtitleChange(event) {
    this.setState({ subtitulo: event.target.value });
  }

  submitHeader(event) {
    axios.put('https://profdantas.herokuapp.com/hdr', { 'titulo': this.state.titulo, 'subtitulo': this.state.subtitulo })
      .then((res) => {
        console.log(res)
      })
    event.preventDefault();
  }

  render() {
    return (
      <header className="site-head" style={background}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-justify word-spacing: 10px">
              <form onSubmit={this.submitHeader} className="text-center" id='header'>
                <h1 className="white">Cabeçalho</h1>
                <br />
                <label>
                  <input type="text" value={this.state.titulo} onChange={this.headerTitleChange} />
                </label>
                <br />
                <br />
                <label>
                  <input type="text" value={this.state.subtitulo} onChange={this.headerSubtitleChange} />
                </label>
                <br /><br />
                <input type="submit" value="Enviar" />
              </form>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default ManagerHeader;