// Importando o React
import React, { Component } from "react";
import axios from 'axios';
import './abs.css'

class abs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      link: "",
    };
  }

  callAPI() {
    axios.get('https://profdantas.herokuapp.com/abs')
      .then((res) => {
        let data = [];

        for (var i in res.data.site) {
          data.push({ titulo: res.data.site[i].titulo, texto: res.data.site[i].texto, img: res.data.site[i].img })
        }

        this.setState({ list: data });
        console.log('abstract', this.state)
      });
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    return (
      <section id="intro">
        <div className="container">
          {
            this.state.list.map(function (list, index) {
              return (
                <div key={index+'abs'} className="row">
                  <h1 className="text-center">{list.titulo}</h1>
                  <div id="abs" className="col-lg-12 mx-auto text-justify" >
                    <img src={require('../../public/img/00.png')} alt={"img" + index}></img>
                    <p>{list.texto}</p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </section>
    );
  }
}

export default abs;