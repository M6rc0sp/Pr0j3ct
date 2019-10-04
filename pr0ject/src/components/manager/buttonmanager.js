import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class ButtonManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
      materia: [],
      unidade: [],
      temp: [],
    };
  }

  getButton() {
    let da = [];
    let db = [];
    da.push({ titulo: 'site da oi', url: "http://oi.com.br" })
    da.push({ titulo: 'site da tim', url: "http://tim.com.br" })
    let json = JSON.stringify(da);
    db.push({ mat: 'mat', bots: JSON.parse(json) });

    this.setState({ temp: JSON.stringify(db) })
    console.log('db', this.state.temp, db)

    axios.get('https://profdantas.herokuapp.com/button')
      .then((res) => {
        let data = [];
        let uni = [];
        let be = [];

        console.log("b", res.data)

        for (var i in res.data) {
          data.push({ materia: res.data[i].materia, unidade: res.data[i].unidade, id: res.data[i].id })
          for (var j in data) {
            console.log(data[i].unidade)
            uni.push({ button: data[i].unidade[j].button })
            for (var k in uni[j].button) {
              //console.log(uni[k].button)
              be.push({ titulo: uni[j].button[k].titulo, url: uni[j].button[k].url })
            }
          }
        }
        this.setState({ materia: data })
        console.log("materia", this.state.materia)
        this.setState({ unidade: uni })
        console.log("unidade", this.state.unidade)
        this.setState({ buttons: be })
        console.log("buttons", this.state.buttons)
      });
  }

  addButton() {
    axios.post('https://profdantas.herokuapp.com/button')
      .then((res) => {
        console.log(res);
      })
  }

  addUnity() {
    axios.post('https://profdantas.herokuapp.com/uni', {'id': 0})
      .then((res) => {
        console.log(res);
      })
  }

  rmButton = (e) => {
    e.preventDefault();
    const { id, name } = e.target;
    console.log(e.target)
    console.log(this.state.buttons[name])
    console.log('id é', id, "num é", name)
    axios.delete('https://profdantas.herokuapp.com/button',
      {
        data: { 'id': id }
      })
      .then((res) => {
        console.log(res)
      })
    //window.location.reload();
  }

  componentWillMount() {
    this.getButton();
  }

  showU() {
  }

  bots() {
    var mat = [];
    let unid = [];
    let but = [];
    console.log('mat.length', this.state.materia.length)
    for (var i in this.state.materia) {
      mat.push(<input className="col-lg-12" name="materia" type="text" defaultValue={this.state.materia[i].materia} />)
      console.log('uni.length', this.state.unidade.length)
      for (var j in this.state.unidade) {
        console.log(this.state.unidade[j].button)
        unid.push(<h1>{parseInt(j) + 1}</h1>)
        console.log('unid', unid)
        for (var k in this.state.buttons) {
          but.push(<input className="col-lg-12" name="materia" type="text" defaultValue={this.state.buttons[k].titulo} />)
          but.push(<input className="col-lg-12" name="materia" type="text" defaultValue={this.state.buttons[k].url} />)
        }
      }
    }
    mat.push(unid)
    mat.push(but)
    console.log('mat', mat)
    return mat;
  }

  render() {
    //<Button block variant="success" size="lg" onClick={this.addButton}>Adicionar</Button>
    return (
      <div className="col-lg-8 text-center" style={{ margin: 'auto' }}>
        <h1>Botões do blog</h1>
        <Button onClick={this.addButton}>Adicionar matéria</Button>
        <Button onClick={this.addUnity}>Adicionar unidade</Button>
        {this.bots()}
      </div>
    );
  }
}

export default ButtonManager;