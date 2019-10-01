import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class ButtonManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
    };
  }

  getButton() {
    axios.get('https://profdantas.herokuapp.com/button')
      .then((res) => {
        let data = [];
        console.log("b", res.data)

        for (var i in res.data) {
          data.push({ materia: res.data[i].materia, unidade: res.data[i].unidade, titulo: res.data[i].titulo, url: res.data[i].url, id: res.data[i].id })
        }

        this.setState({ buttons: data })
        console.log("buttons", this.state.buttons)
      });
  }

  addButton(){
    axios.post('https://profdantas.herokuapp.com/button')
    .then((res)=>{
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

  render() {
    return (
      <div className="col-lg-8 text-center" style={{ margin: 'auto' }}>
        <h1>Botões do blog</h1><Button block variant="success" size="lg" onClick={this.addButton}>Adicionar</Button>
        {
          this.state.buttons.map((list, index) => (
            <form key={index + 1} onSubmit={this.submitIntro} className="text-center" id={index}>
              <div className="col-lg-6 col-md-6 float-left fill">
                <input key={index + 2} id={index} name="materia" type="text" defaultValue={list.materia} />
                <input key={index + 3} id={index} name="materia" type="text" defaultValue={list.unidade} />
                <input key={index + 4} id={index} name="materia" type="text" defaultValue={list.titulo} />
                <input key={index + 5} id={index} name="materia" type="text" defaultValue={list.url} />
              </div>
              <Button id={list.id} name={index} variant="danger" onClick={this.rmButton}>Remover</Button>
              <Button block variant="success" size="lg" type="submit">Salvar</Button>
              <br />
              <br />
            </form>
          ))
        }
      </div>
    );
  }
}

export default ButtonManager;