// Importando o React
import React, { Component } from "react";
import axios from 'axios';
import Linkify from 'react-linkify';
import ReadMore from 'read-more-react';
import Abstract from './components/abstract/abstract';
import './index.css'
import Button from "react-bootstrap/Button";

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      link: '',
      expanded: false
    };
  }

  callAPI() {
    axios.get('https://profdantas.herokuapp.com/post')
      .then((res) => {
        let data = [];

        for (var i in res.data.site) {
          data.push({ titulo: res.data.site[i].titulo, texto: res.data.site[i].texto, img: res.data.site[i].img, expanded: false })
        }

        this.setState({ list: data });
        console.log("main", this.state.list);
        if(this.state.list[2]){
          var li = this.state.list[2].img//.split("\\");
          //var li = './'+ l[2] +'/'+ l[3] +'/'+ l[4];
          this.setState({link: li})
         }
        console.log(this.state)
      });
  }

  componentWillMount() {
    this.callAPI();
  }

  onclick = e => {
    let id = e.target.id;
    const newList = this.state.list.slice();
    if (this.state.list[id].expanded) {
      newList[id].expanded = false;
    } else {
      newList[id].expanded = true;
    }
    this.setState({ list: newList });
  }

  render() {
    return (
      <section className="bg-primary3" id="about">
        <div className="container">
          <br />
          <Abstract />
          <br />
          <div id="main" className="row" >
            {
              this.state.list.map((list, index) => {
                if (index === 0) {
                  return (
                    <div key={index} className="col-lg-6 float-left text-justify">
                      <h3 className="text-center">{list.titulo}</h3>
                      <br />
                      {list.expanded
                        ? <div key={index + 1}>
                          <div id="dimg">
                            <img src={require('./public/img/0.jpg')} alt={"img" + index} /><br />
                          </div>
                          <Linkify properties={{ target: "_blank", rel: "noopener noreferrer" }}>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{list.texto}</p>
                          </Linkify>
                          <Button variant='outline-dark' key={index + 2} id={index} onClick={this.onclick}>Recolher</Button>
                        </div>
                        : <div key={index + 1}>
                          <ReadMore text={list.texto} readMoreText={'...'} max={1000} />
                          <Button variant='outline-dark' key={index + 3} id={index} onClick={this.onclick}>Leia mais</Button>
                        </div>}
                    </div>
                  );
                }
                return (
                  <div className="col-lg-6 float-left text-justify">
                    <h3 className="text-center">{list.titulo}</h3>
                    <div id="dimg">
                      {list.img === 'abc'
                        ? <div></div>
                        : <img src={list.img} alt={'img' + index} />}
                    </div>
                    <br />
                    {list.expanded
                      ? <div key={index + 1}>
                        <Linkify properties={{ target: "_blank", rel: "noopener noreferrer" }}>
                          <p style={{ whiteSpace: 'pre-wrap' }}>{list.texto}</p>
                        </Linkify>
                        <Button variant='outline-dark' key={index + 2} id={index} onClick={this.onclick}>Recolher</Button>
                      </div>
                      : <div key={index + 1}>
                        <ReadMore text={list.texto} readMoreText={'...'} max={1000} />
                        <Button variant='outline-dark' key={index + 3} id={index} onClick={this.onclick}>Leia mais</Button>
                      </div>}
                  </div>
                );
              })
            }
          </div>
        </div>
      </section>
    );
  }
}

export default Main;