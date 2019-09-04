// Importando o React
import React, {Component} from "react";
import axios from 'axios';
import fb from '../../static/images/icons/facebook.svg';
import tt from '../../static/images/icons/twitter.svg';
import rss from '../../static/images/icons/rss.svg';
import photo from './../../images/header.jpg';
import './app.css'

var background = {
  backgroundImage: "url("+photo+")",
}

class Header extends Component {

  constructor(props) {
		super(props);
		this.state = {
		site: [],
		};
	}

	callAPI() {
		axios.get('http://localhost:3001/hdr')
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

  render(){
    return(
      <header className="site-head" style={background}>
        <div className="container">
          <div className="site-mast">
            <div className="site-mast-left">
              <a aria-current="page" className="site-nav-item" href="/">Home</a>
              <a className="site-nav-item" href="#about">Timeline</a>
              <a className="site-nav-item" href="#contact">Contato</a>
            </div>
            <div className="site-mast-right">
              <a className="site-nav-button" target="_blank" rel="noopener noreferrer" href="http://profdantaspereira.com/">Blog</a>
              <a href="https://twitter.com/tryghost" className="site-nav-item" target="_blank" rel="noopener noreferrer">
                <img className="site-nav-icon" src={tt} alt="Twitter"/>
              </a>
              <a href="https://www.facebook.com/ghost" className="site-nav-item" target="_blank" rel="noopener noreferrer">
                <img className="site-nav-icon" src={fb} alt="Facebook"/>
              </a>
              <a className="site-nav-item" href="https://feedly.com/i/subscription/feed/https://gatsby.ghost.org/rss/" target="_blank" rel="noopener noreferrer">
                <img className="site-nav-icon" src={rss} alt="RSS Feed"/>
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