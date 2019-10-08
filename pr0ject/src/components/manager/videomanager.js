import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class ButtonManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };

    //this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    this.getVideo();
  }

  getVideo() {
    axios.get('https://profdantas.herokuapp.com/video')
      .then((res) => {
        let data = [];

        console.log("v", res.data)

        for (var i in res.data) {
          data.push({ tema: res.data[i].tema, button: res.data[i].button, id: res.data[i].id })
        }
        this.setState({ videos: data })
        console.log("videos", this.state.videos)
      });
  }

  addVid() {
    axios.post('https://profdantas.herokuapp.com/video')
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
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

  rmVid = (e) => {
    e.preventDefault();
    const { id } = e.target;
    console.log('id é', id)
    axios.delete('https://profdantas.herokuapp.com/video',
      {
        data: { 'id': id }
      })
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })
  }

  // addButton = e => {
  //   const { id, name } = e.target;
  //   console.log(id, name)
  //   let mat = id;
  //   let uni = name;
  //   const newList = this.state.materia.slice();
  //   let cont = newList[mat].unidade[uni].button.length + 1;
  //   newList[mat].unidade[uni].button.push({ titulo: 'Aula ' + cont, url: 'http://google.com.br' });
  //   this.setState({ materia: newList });
  // }

  // rmButton = e => {
  //   const { id, name } = e.target;
  //   console.log(id, name)
  //   const newList = this.state.materia.slice();
  //   newList[id].unidade[name].button.pop();
  //   this.setState({ materia: newList });
  // }

  // addVideo = e => {
  //   const { id, name } = e.target;
  //   console.log(id, name)
  //   const newList = this.state.materia.slice();
  //   let cont = newList[id].unidade[name].video.length + 1;
  //   newList[id].unidade[name].video.push({ titulo: 'Vídeo ' + cont, url: 'http://youtube.com.br' });
  //   console.log(newList[id].unidade[name].video)
  //   this.setState({ materia: newList });
  // }

  // rmVideo = e => {
  //   const { id, name } = e.target;
  //   console.log(id, name)
  //   const newList = this.state.materia.slice();
  //   newList[id].unidade[name].video.pop();
  //   console.log(newList[id].unidade[name].video)
  //   this.setState({ materia: newList });
  // }

  // handleChange = e => {
  //   console.log(e.target)
  //   let { name, value, id } = e.target
  //   let type = name.split('.')[0];
  //   let idu = name.split('.')[2];
  //   let idb = name.split('.')[3];
  //   name = name.split('.')[1];
  //   const newList = this.state.materia.slice();
  //   if (name === "materia") {
  //     newList[id][name] = value;
  //   } else if (type === 'v') {
  //     newList[id].unidade[idu].video[idb][name] = value;
  //   } else {
  //     newList[id].unidade[idu].button[idb][name] = value;
  //   }
  //   console.log("this is me", newList, "index", id, 'indexu', idu, 'indexb', idb)
  //   this.setState({ materia: newList });
  //   console.log("pingos nos is", [name], value)
  //   console.log(this.state)
  // }

  render() {
    return (
      <div className="col-lg-8 text-center" style={{ margin: 'auto' }}>
        <h1>Vídeos</h1>
        <h2>Temas</h2>
        <Button onClick={this.addVid}>Adicionar tema</Button>
        <br /><br />
        {
          this.state.videos.map((list, index) => (
            <form key={index + 1} onSubmit={this.submitButton} className="text-center" id={index}>
              <div className="col-lg-12 col-md-12 float-left fill">
                <input className="col-lg-8" key={index + 2} id={index} name="tema" onChange={this.handleChange} type="text" defaultValue={list.tema} />
                <Button key={index + 6} variant='danger' id={list.id} name={index} onClick={this.rmVid}>Remover matéria</Button>
                <br /><br />
              </div>
              <div className="col-lg-12 col-md-12 float-left fill">
                {
                  list.button.map((v, indexv) => (
                    <div className="float-left fill">
                      <input key={indexv + 4} id={index} name={'v.titulo.' + index + '.' + indexv} onChange={this.handleChange} type="text" defaultValue={v.titulo} />
                      <input key={indexv + 5} id={index} name={'v.url.' + index + '.' + indexv} onChange={this.handleChange} type="text" defaultValue={v.url} />
                      <br /><br />
                    </div>
                  ))}
                {v.button.length === 0 ?
                  <Button id={index} onClick={this.addButton}>Adicionar vídeo</Button>
                  :
                  <div>
                    <Button variant="danger" id={index} onClick={this.rmButton}>Remover vídeo</Button>
                    <Button id={index} onClick={this.addButton}>Adicionar vídeo</Button>
                  </div>}
                <br />
              </div>
              <div>
                <Button block variant="success" size="lg" type="submit">Salvar</Button>
              </div>
              <br />
            </form>
          ))
        }
      </div>
    );
  }
}

export default ButtonManager;