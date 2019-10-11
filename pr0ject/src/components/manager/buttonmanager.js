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

        for (var i in res.data) {
          data.push({ materia: res.data[i].materia, unidade: res.data[i].unidade, id: res.data[i].id })
        }
        this.setState({ materia: data })
        console.log("materia", this.state.materia)
      });
  }

  addMat() {
    axios.post('https://profdantas.herokuapp.com/mat')
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
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
    console.log(id, name)
    let mat = id;
    let uni = name;
    const newList = this.state.materia.slice();
    let cont = newList[mat].unidade[uni].button.length + 1;
    newList[mat].unidade[uni].button.push({ titulo: 'Aula ' + cont, url: 'http://google.com.br' });
    this.setState({ materia: newList });
  }

  rmButton = e => {
    const { id, name } = e.target;
    console.log(id, name)
    const newList = this.state.materia.slice();
    newList[id].unidade[name].button.pop();
    this.setState({ materia: newList });
  }

  addVideo = e => {
    const { id, name } = e.target;
    console.log(id, name)
    const newList = this.state.materia.slice();
    let cont = newList[id].unidade[name].video.length + 1;
    newList[id].unidade[name].video.push({ titulo: 'Vídeo Aula ' + cont, url: 'http://youtube.com.br' });
    console.log(newList[id].unidade[name].video)
    this.setState({ materia: newList });
  }

  rmVideo = e => {
    const { id, name } = e.target;
    console.log(id, name)
    const newList = this.state.materia.slice();
    newList[id].unidade[name].video.pop();
    console.log(newList[id].unidade[name].video)
    this.setState({ materia: newList });
  }

  handleChange = e => {
    console.log(e.target)
    const newList = this.state.materia.slice();
    let { name, value, id } = e.target
    if (name === "materia") {
      newList[id][name] = value;
    }
    let type = name.split('.')[0];
    let idu = name.split('.')[2];
    let idb = name.split('.')[3];
    name = name.split('.')[1];
    if (type === 'v') {
      console.log(type)
      newList[id].unidade[idu].video[idb][name] = value;
    } else if (type === 'b') {
      console.log(type)
      newList[id].unidade[idu].button[idb][name] = value;
    }
    console.log("this is me", newList, "index", id, 'indexu', idu, 'indexb', idb)
    this.setState({ materia: newList });
    console.log("pingos nos is", [name], value)
    console.log(this.state)
  }

  componentDidMount() {
    this.getButton();
  }

  render() {
    return (
      <div className="col-lg-12 text-center" style={{ margin: 'auto' }}>
        <h1>Materiais de Aula</h1>
        <h2>Matérias</h2>
        <Button onClick={this.addMat}>Adicionar matéria</Button>
        <br /><br />
        {
          this.state.materia.map((list, index) => (
            <form key={index + 1} onSubmit={this.submitButton} className="text-center" id={index}>
              <div className="col-lg-12 col-md-12 float-left fill">
                <input className="col-lg-8" key={index + 2} id={index} name="materia" onChange={this.handleChange} type="text" defaultValue={list.materia} />
                <Button key={index + 6} variant='danger' id={list.id} name={index} onClick={this.rmMat}>Remover matéria</Button>
                <br /><br />
                <Button id={index} name={index} onClick={this.addUnity}>Adicionar unidade</Button>
                <Button variant='danger' id={index} onClick={this.rmUnity}>Remover unidade</Button>
              </div>
              <div className="col-lg-12 col-md-12 float-left fill">
                {
                  list.unidade.map((b, indexu) => (
                    <div className="col-lg-4 col-md-4 float-left fill">
                      <h4 key={indexu + 3} id={indexu} onChange={this.handleChange} type="text">{"Unidade " + (indexu + 1)}</h4>
                      {
                        b.button.map((b, indexb) => (
                          <div className="float-left fill">
                            <input key={indexb + 4} id={index} name={'b.titulo.' + indexu + '.' + indexb} onChange={this.handleChange} type="text" defaultValue={b.titulo} />
                            <input key={indexb + 5} id={index} name={'b.url.' + indexu + '.' + indexb} onChange={this.handleChange} type="text" defaultValue={b.url} />
                            <br /><br />
                          </div>
                        ))}
                      {b.button.length === 0 ?
                        <Button id={index} name={indexu} onClick={this.addButton}>Adicionar botão</Button>
                        :
                        <div>
                          <Button variant="danger" id={index} name={indexu} onClick={this.rmButton}>Remover botão</Button>
                          <Button id={index} name={indexu} onClick={this.addButton}>Adicionar botão</Button>
                        </div>}
                      <br />
                      <h4>Vídeos Complementares</h4>
                      {
                        b.video.map((b, indexb) => (
                          <div className="float-left fill">
                            <input key={indexb + 4} id={index} name={'v.titulo.' + indexu + '.' + indexb} onChange={this.handleChange} type="text" defaultValue={b.titulo} />
                            <input key={indexb + 5} id={index} name={'v.url.' + indexu + '.' + indexb} onChange={this.handleChange} type="text" defaultValue={b.url} />
                            <br /><br />
                          </div>
                        ))}
                      {b.video.length === 0 ?
                        <Button id={index} name={indexu} onClick={this.addVideo}>Adicionar video</Button>
                        :
                        <div>
                          <Button variant="danger" id={index} name={indexu} onClick={this.rmVideo}>Remover video</Button>
                          <Button id={index} name={indexu} onClick={this.addVideo}>Adicionar video</Button>
                        </div>}
                    </div>
                  ))}
              </div>
              <div>
                <Button block variant="success" size="lg" type="submit">Salvar</Button>
              </div>
              <br />
            </form>
          ))}
      </div>
    );
  }
}

export default ButtonManager;