// Importando o React
import React, { Component } from "react";
import axios from 'axios';
import fb from '../../static/images/icons/facebook.svg';
import tt from '../../static/images/icons/twitter.svg';
import yt from '../../static/images/icons/youtube.svg';
import photo from './../../images/header.jpg';
import './app.css'
import './header.css'

var background = {
  backgroundImage: "url(" + photo + ")",
}

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      site: [],
    };
  }

  callAPI() {
    axios.get('https://profdantas.herokuapp.com/hdr')
      .then((res) => {

        console.log("ente aki", res.data)
        this.setState({
          titulo: res.data.titulo,
          subtitulo: res.data.subtitulo
        });
      })
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <header className="site-head" style={background}>
        <div className="container">
          <div className="site-mast">
            <div className="site-mast-left ">
              <a aria-current="page" className="site-nav-item" href="/">Home</a>
              <a className="site-nav-item" href="#about">Timeline</a>
              <a className="site-nav-item" href="#contact">Contato</a>
            </div>
            <div className="site-mast-right">
              <a className="site-nav-button" target="_blank" rel="noopener noreferrer" href="/blog">Blog</a>
              <a href="https://twitter.com/ProfJoao_Dantas" className="site-nav-item" target="_blank" rel="noopener noreferrer">
                <img className="site-nav-icon" srcSet={tt} alt="Twitter" />
              </a>
              <a href="https://www.facebook.com/joao.dantaspereira" className="site-nav-item" target="_blank" rel="noopener noreferrer">
                <img className="site-nav-icon" srcSet={fb} alt="Facebook" />
              </a>
              <a href="https://www.youtube.com/user/jotarnbr" className="site-nav-item" target="_blank" rel="noopener noreferrer">
                <img className="site-nav-icon2" srcSet={yt} alt="Youtube" />
              </a>
            </div>
          </div>
          <div className="site-banner">
            <h1 className="site-banner-title">{this.state.titulo}</h1>
            <p className="site-banner-desc">{this.state.subtitulo}</p>
          </div>
          <nav className="site-nav">

          </nav>
        </div>
      </header>
    );
  }
};

export default Header;