import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class VideoManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    this.getVideo();
  }

  getVideo() {
    axios.get('https://profdantas.herokuapp.com/video')
      .then(async (res) => {
        let data = [];

        for (var i in res.data) {
          await data.push({ tema: res.data[i].tema, button: res.data[i].button, id: res.data[i].id })
        }
        this.setState({ videos: data })
        // console.log("videos", this.state.videos)
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
    axios.put('https://profdantas.herokuapp.com/video',
      {
        json: this.state.videos,
        t: id
      })
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })
  }

  rmVid = (e) => {
    e.preventDefault();
    const { id } = e.target;
    axios.delete('https://profdantas.herokuapp.com/video',
      {
        data: { 'id': id }
      })
      .then(async (res) => {
        console.log(res);
        await window.location.reload();
      })
  }

  addButton = e => {
    const { id } = e.target;
    let t = id;
    const newList = this.state.videos.slice();
    let cont = newList[t].button.length + 1;
    newList[t].button.push({ titulo: 'Vídeo ' + cont, url: 'http://google.com.br' });
    this.setState({ videos: newList });
  }

  rmButton = e => {
    const { id } = e.target;
    const newList = this.state.videos.slice();
    newList[id].button.pop();
    this.setState({ videos: newList });
  }

  handleChange = e => {
    let { name, value, id } = e.target
    let type = name.split('.')[0];
    let idv = name.split('.')[2];
    const newList = this.state.videos.slice();
    if (name === "tema") {
      newList[id][name] = value;
    } else if (type === 'v') {
      name = name.split('.')[1];
      newList[id].button[idv][name] = value;
    }
    // console.log("this is me", newList, "index", id, 'indexv', idv)
    this.setState({ videos: newList });
    // console.log("pingos nos is", [name], value)
    // console.log(this.state)
  }

  render() {
    return (
      <div className="col-lg-12 text-center" style={{ margin: 'auto' }}>
        <br/><br/><br/>
        <h1>Vídeos</h1>
        <h2>Temas</h2>
        <Button onClick={this.addVid}>Adicionar tema</Button>
        <br /><br />
        {
          this.state.videos.map((list, index) => (
            <form key={index + 1} onSubmit={this.submitButton} className="text-center" id={index}>
              <div className="col-lg-4 col-md-4 float-left fill">
                <input className="col-lg-8" key={index + 2} id={index} name="tema" onChange={this.handleChange} type="text" defaultValue={list.tema} />
                <Button key={index + 6} variant='danger' id={list.id} name={index} onClick={this.rmVid}>Remover tema</Button>
                <br /><br />
                {
                  list.button.map((v, indexv) => (
                    <div className="float-left fill">
                      <input key={indexv + 4} id={index} name={'v.titulo.' + indexv} onChange={this.handleChange} type="text" defaultValue={v.titulo} />
                      <input key={indexv + 5} id={index} name={'v.url.' + indexv} onChange={this.handleChange} type="text" defaultValue={v.url} />
                      <br /><br />
                    </div>
                  ))}
                {list.button.length === 0 ?
                  <Button id={index} onClick={this.addButton}>Adicionar vídeo</Button>
                  :
                  <div>
                    <Button variant="danger" id={index} onClick={this.rmButton}>Remover vídeo</Button>
                    <Button id={index} onClick={this.addButton}>Adicionar vídeo</Button>
                  </div>}
                <br />
                <Button block variant="success" size="lg" type="submit">Salvar</Button>
              </div>
            </form>
          ))}
      </div>
    );
  }
}

export default VideoManager;