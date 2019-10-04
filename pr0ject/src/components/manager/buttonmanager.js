import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class ButtonManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      materia: [],
    };
  }

  getButton() {
    axios.get('https://profdantas.herokuapp.com/button')
      .then((res) => {
        let data = [];

        console.log("b", res.data)

        for (var i in res.data) {
          data.push({ materia: res.data[i].materia, unidade: res.data[i].unidade, id: res.data[i].id })
        }
        this.setState({ materia: data })
        console.log("materia", this.state.materia)
      });
  }

  addMat() {
    axios.post('https://profdantas.herokuapp.com/button')
      .then((res) => {
        console.log(res);
      })
  }

  addUnity = e => {
    const { id } = e.target;
    axios.post('https://profdantas.herokuapp.com/uni', { 'id': id })
      .then((res) => {
        console.log(res);
      })
  }

  rmButton = (e) => {
    e.preventDefault();
    const { id, name } = e.target;
    console.log(e.target)
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
    //<Button block variant="success" size="lg" onClick={this.addButton}>Adicionar</Button>
    return (
      <div className="col-lg-8 text-center" style={{ margin: 'auto' }}>
        <h1>Botões do blog</h1>
        <br/>
        <h2>Matérias</h2>
        <Button onClick={this.addMat}>Adicionar matéria</Button>
        <br/><br/>
        {
          this.state.materia.map((list, index) => (
            <form key={index + 1} onSubmit={this.submitIntro} className="text-center" id={index}>
              <div className="col-lg-12 col-md-12 float-left fill">
                <input className="col-lg-8" key={index + 2} id={index} name="email" onChange={this.handleChange} type="text" defaultValue={list.materia} />
                <Button key={index+6} variant='danger' id={list.id} name={index} onClick={this.rmButton}>Remover matéria</Button>
                <Button id={index} onClick={this.addUnity}>Adicionar unidade</Button>
              </div>
              {
                list.unidade.map((b, index) => (
                  <div className="col-lg-4 col-md-4 float-left fill">
                    <h4 key={index + 3} id={index} name="email" onChange={this.handleChange} type="text">{index + 1}</h4>
                    {
                      b.button.map((b, index) => (
                        <div className="float-left fill">
                          <input key={index + 4} id={index} name="email" onChange={this.handleChange} type="text" defaultValue={b.titulo} />
                          <input key={index + 5} id={index} name="email" onChange={this.handleChange} type="text" defaultValue={b.url} />
                          <br/><br/>
                        </div>
                      ))}
                  </div>
                ))}
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