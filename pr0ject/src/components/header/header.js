// Importando o React
import React, {Component} from "react";
import axios from 'axios';
import bg from '../../static/images/logo.svg';
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
		axios.get('http://localhost:3001/admin')
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
      <header class="site-head" style={background}>
        <div class="container">
          <div class="site-mast">
            <div class="site-mast-left">
              <a aria-current="page" class="" href="/">
                <img class="site-logo" src={bg} alt="Ghost &amp; Gatsby"/>
              </a>
            </div>
            <div class="site-mast-right">
              <a href="https://twitter.com/tryghost" class="site-nav-item" target="_blank" rel="noopener noreferrer">
                <img class="site-nav-icon" src={tt} alt="Twitter"/>
              </a>
              <a href="https://www.facebook.com/ghost" class="site-nav-item" target="_blank" rel="noopener noreferrer">
                <img class="site-nav-icon" src={fb} alt="Facebook"/>
              </a>
              <a class="site-nav-item" href="https://feedly.com/i/subscription/feed/https://gatsby.ghost.org/rss/" target="_blank" rel="noopener noreferrer">
                <img class="site-nav-icon" src={rss} alt="RSS Feed"/>
              </a>
            </div>
          </div>
          <div class="site-banner">
            <h1 class="site-banner-title">{this.state.titulo}</h1>
            <p class="site-banner-desc">{this.state.subtitulo}</p>
          </div>
          <nav class="site-nav">
            <div class="site-nav-left">
              <a aria-current="page" class="site-nav-item" href="/">Home</a>
              <a class="site-nav-item" href="/tag/getting-started/">Tag</a>
              <a class="site-nav-item" href="/author/ghost/">Author</a>
              <a class="site-nav-item" href="https://help.ghost.org" target="_blank" rel="noopener noreferrer">Help</a>
            </div>
            <div class="site-nav-right">
              <a class="site-nav-button" href="/about">About</a>
            </div>
          </nav>
        </div>
      </header>
    );
  }
};

export default Header;