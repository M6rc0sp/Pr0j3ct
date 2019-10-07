import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class ButtonManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      materia: [],
    };

    //this.handleChange = this.handleChange.bind(this)
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
    axios.post('https://profdantas.herokuapp.com/mat')
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })

  }

  handleChange = e => {
    console.log(e.target)
    let { name, value, id } = e.target
    let idu = name.split('.')[1];
    let idb = name.split('.')[2];
    name = name.split('.')[0];
    const newList = this.state.materia.slice();
    if (name === "materia") {
      newList[id][name] = value;
    } else {
      newList[id].unidade[idu].button[idb][name] = value;
    }
    console.log("this is me", newList, "index", id, 'indexu', idu, 'indexb', idb)
    this.setState({ materia: newList });
    console.log("pingos nos is", [name], value)
    console.log(this.state)
  }

  submitButton = e => {
    const { id } = e.target;
    console.log(id)
    e.preventDefault();
    axios.put('https://profdantas.herokuapp.com/button',
      {
        json: this.state.materia,
        mat: id
      })
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })
  }

  rmMat = (e) => {
    e.preventDefault();
    const { id } = e.target;
    console.log('id é', id)
    axios.delete('https://profdantas.herokuapp.com/mat',
      {
        data: { 'id': id }
      })
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })
  }

  addUnity = e => {
    e.preventDefault();
    const { id } = e.target;
    axios.post('https://profdantas.herokuapp.com/uni', { 'id': id })
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })
  }

  rmUnity = (e) => {
    e.preventDefault();
    const { id } = e.target;
    let mat = id;
    console.log(mat)
    axios.delete('https://profdantas.herokuapp.com/uni',
      {
        data: { 'mat': mat }
      })
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })
  }

  addButton = e => {
    const { id, name } = e.target;
    let mat = id;
    let uni = name;
    console.log(mat, uni)
    axios.post('https://profdantas.herokuapp.com/button', { 'mat': mat, 'uni': uni })
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })
  }

  rmButton = e => {
    const { id, name } = e.target;
    let mat = id;
    let uni = name;
    console.log(mat, uni)
    axios.delete('https://profdantas.herokuapp.com/button', { data: { 'mat': mat, 'uni': uni } })
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })
  }

  componentWillMount() {
    this.getButton();
  }

  render() {
    return (
      <div className="col-lg-8 text-center" style={{ margin: 'auto' }}>
        <h1>Botões do blog</h1>
        <br />
        <h2>Matérias</h2>
        <Button onClick={this.addMat}>Adicionar matéria</Button>
        <br /><br />
        {
          this.state.materia.map((list, index) => (
            <form key={index + 1} onSubmit={this.submitButton} className="text-center" id={index}>
              <div className="col-lg-12 col-md-12 float-left fill">
                <input className="col-lg-8" key={index + 2} id={index} name="materia" onChange={this.handleChange} type="text" defaultValue={list.materia} />
                <Button key={index + 6} variant='danger' id={list.id} name={index} onClick={this.rmMat}>Remover matéria</Button>
                <Button id={index} onClick={this.addUnity}>Adicionar unidade</Button>
              </div>
              {
                list.unidade.map((b, indexu) => (
                  <div className="col-lg-4 col-md-4 float-left fill">
                    <h4 key={indexu + 3} id={indexu} onChange={this.handleChange} type="text">{indexu + 1}</h4>
                    <Button id={index} onClick={this.rmUnity}>Remover unidade</Button>
                    {
                      b.button.map((b, indexb) => (
                        <div className="float-left fill">
                          <input key={indexb + 4} id={index} name={'titulo.' + indexu + '.' + indexb} onChange={this.handleChange} type="text" defaultValue={b.titulo} />
                          <input key={indexb + 5} id={index} name={'url.' + indexu + '.' + indexb} onChange={this.handleChange} type="text" defaultValue={b.url} />
                          <br /><br />
                        </div>
                      ))}
                    <Button variant="danger" id={index} name={indexu} onClick={this.rmButton}>Remover botão</Button>
                    <Button id={index} name={indexu} onClick={this.addButton}>Adicionar botão</Button>
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