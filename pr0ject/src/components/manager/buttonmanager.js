import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class ButtonManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
      materias: [],
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
        let mat = [];
        //let uni = [];
        let tempMat = [];
        console.log("b", res.data)

        for (var i in res.data) {
          data.push({ materia: res.data[i].materia, unidade: res.data[i].unidade, titulo: res.data[i].titulo, url: res.data[i].url, id: res.data[i].id })
        }

        for (var j in res.data) {
          mat.push({ materia: res.data[j].materia, unidade: res.data[i].unidade, titulo: res.data[i].titulo, url: res.data[i].url, id: res.data[i].id })
        }
        mat = mat.filter(function (este, i) {
          return mat.indexOf(este) === i;
        });
        console.log("mat[]", mat)

        for (var z in mat) {
          axios.get('https://profdantas.herokuapp.com/mat', { params: res.data[z].materia })
            .then((res) => {
              tempMat.push(res.data)
            })
          console.log(tempMat)
          for (var k in mat) {
            axios.get('https://profdantas.herokuapp.com/uni', { params: [res.data[z].materia, res.data[k].unidade] })
              .then((res) => {
                // console.log("uni", res.data)
              })
          }
        }

        this.setState({ buttons: data })
        console.log("buttons", this.state.buttons)
      });
  }

  addButton() {
    axios.post('https://profdantas.herokuapp.com/button')
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

  showU(x) {
    let info = [];
    axios.get('https://profdantas.herokuapp.com/mat', { params: x })
      .then((res) => {
        for (var i in res.data) {
          info.push({ unidade: res.data[i].unidade, titulo: res.data[i].titulo, url: res.data[i].url, id: res.data[i].id })
        }
      })
    console.log('oi', info)
    //this.setState({ unidade: info })
    //console.log('oi', this.state.unidade)
    var m = this.state.buttons.filter(function (obj) {
      return obj.materia === x;
    });
    console.log('sel', m)
    return (
      <>
        {
          m.map((list, index) => (
            <div>
              <form key={index + 1} onSubmit={this.submitIntro} className="text-center" id={index}>
                <div className="col-md-12 float-left fill">
                  <input key={index + 3} id={index} name="materia" type="text" defaultValue={list.unidade} />
                  <input key={index + 4} id={index} name="materia" type="text" defaultValue={list.titulo} />
                  <input key={index + 5} id={index} name="materia" type="text" defaultValue={list.url} />
                  <Button id={list.id} name={index} variant="danger" onClick={this.rmButton}>Remover</Button>
                  <Button variant="success" type="submit">Salvar</Button>
                  <br />
                  <br />
                </div>

              </form>
            </div>
          ))
        }
      </>
    )
  }

  showM() {
    return (
      this.state.buttons.map((list, index) => (
        <div>
          <form key={index + 1} onSubmit={this.submitIntro} className="text-center" id={index}>
            <div className="col-lg-12 col-md-12 fill">
              <input className="col-lg-6" key={index + 2} id={index} name="materia" type="text" defaultValue={list.materia} />
              <Button id={list.id} name={index} variant="danger" onClick={this.rmButton}>Remover</Button>
              <Button variant="success" type="submit">Salvar</Button>
              {this.showU(list.materia)}
            </div>
            <br />
            <br />
          </form>
        </div>
      ))
    )
  }

  bots() {
    var mat = [];
    var but = [];
    for (var i in this.state.buttons) {
      mat.push(<input className="col-lg-12" name="materia" type="text" defaultValue={this.state.buttons[i].materia} />)
      mat.push(<input className="col-lg-4" name="materia" type="text" defaultValue={this.state.buttons[i].unidade} />)
      axios.get('https://profdantas.herokuapp.com/uni', { params: [this.state.buttons[i].materia, this.state.buttons[i].unidade] })
        .then((res) => {
          for (var j in res.data) {
            but.push(<input className="col-lg-4" name="materia" type="text" defaultValue={res.data[0].titulo} />)
            but.push(<input className="col-lg-4" name="materia" type="text" defaultValue={res.data[0].url} />)
          }
        })
    }
    var result = mat.concat(but)
    console.log('but', but)
    console.log(mat)
    return result;
  }

  render() {
    //<Button block variant="success" size="lg" onClick={this.addButton}>Adicionar</Button>
    return (
      <div className="col-lg-8 text-center" style={{ margin: 'auto' }}>
        <h1>Botões do blog</h1>
        {this.showM()}
        {this.bots()}
      </div>
    );
  }
}

export default ButtonManager;