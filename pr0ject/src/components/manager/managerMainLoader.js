import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class ManagerMainLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      img: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitIntro = this.submitIntro.bind(this);
  }

  callAPI() {
    axios.get('https://profdantas.herokuapp.com/post')
      .then((res) => {
        console.log(res.data)
        let data = [];

        for (var i in res.data.site) {
          data.push({ titulo: res.data.site[i].titulo, texto: res.data.site[i].texto, img: res.data.site[i].img, id: res.data.site[i].id })
        }

        this.setState({ list: data })
        console.log("list", this.state.list)
      })
  }

  componentWillMount() {
    this.callAPI();
  }

  handleChange = e => {
    const { name, value, id } = e.target
    const newList = this.state.list.slice();
    newList[id][name] = value;
    console.log("this is me", newList, "index", id)
    this.setState({ list: newList });
    console.log("pingos nos is", [name], value)
    console.log(this.state)
  }

  submitIntro = e => {
    const { id } = e.target;
    e.preventDefault();
    axios.put('https://profdantas.herokuapp.com/post',
      {
        'titulo': this.state.list[id].titulo,
        'texto': this.state.list[id].texto,
        'img': this.state.list[id].img,
        'id': id
      })
      .then((res) => {
        console.log(res)
      })
  }

  onChangeHandler = event => {
    const { files } = event.target;
    this.setState({
      img: files,
      loaded: 0,
    })
  }

  onClickHandler = (e) => {
    const { id } = e.target;
    console.log(id)
    e.preventDefault();
    const data = new FormData()
    data.append('file', this.state.img)
    const file = new Blob(this.state.img, { type: 'image/png' });// WORKS much better (if you know what MIME type you want.)

    const formData = new FormData();
    formData.append('test', file);
    axios.post("https://profdantas.herokuapp.com/upload", formData, {
      //receive two parameter endpoint url ,form data
    })
      .then(res => {
        const newList = this.state.list.slice();
        newList[id].img = res.data[0].path;
        console.log(res.data[0].path)
        this.setState({ list: newList });
        console.log(res)
        console.log(this.state)
        console.log(res.statusText)
      })
  }

  rmPost = (e) => {
    e.preventDefault();
    const { id, name } = e.target;
    console.log(e.target)
    console.log(this.state.list[name])
    console.log('id é', id, "num é", name)
    axios.delete('https://profdantas.herokuapp.com/post/',
      {
        data: { 'id': id, 'img': this.state.list[name].img }
      })
      .then((res) => {
        console.log(res)
      })
    //window.location.reload();

  }

  render() {
    return (
      <div>
        {
          this.state.list.map((list, index) => (
            <form key={index + 1} onSubmit={this.submitIntro} className="text-center" id={index}>
              <label key={index + 2} className="col-lg-12 mx-auto">
                <input key={index + 3} id={index} name="titulo" type="text" defaultValue={list.titulo} onChange={this.handleChange} />
                <Button id={list.id} name={index} variant="danger" onClick={this.rmPost}>Remover postagem</Button>
                <br />
                <div className="fill">
                  <input type="file" name="img" key={index + 5} onChange={this.onChangeHandler} />
                  <Button id={index} name="imgbutton" onClick={this.onClickHandler}>Adicionar foto</Button>
                </div>
                <textarea key={index + 4} id={index} name="texto" style={{ whiteSpace: 'pre-wrap' }} className="col-lg-12 mx-auto" defaultValue={list.texto} onChange={this.handleChange} />
                <Button block variant="success" size="lg" type="submit">Salvar</Button>
                <br />
                <br />
              </label>
            </form>
          ))
        }
      </div>
    );
  }
}

export default ManagerMainLoader;