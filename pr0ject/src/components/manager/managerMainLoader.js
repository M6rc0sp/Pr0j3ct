import React, {Component} from 'react';
import axios from 'axios';

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
    axios.get('http://localhost:3001/post')
        .then((res) => {	
            console.log(res.data)
            let data = [];

            for (var i in res.data.site) {
                data.push({ titulo: res.data.site[i].titulo, texto: res.data.site[i].texto, id: res.data.site[i].id })
            }

            this.setState({ list: data })
            console.log("list",this.state.list)
        })
    }

    componentWillMount() {
        this.callAPI();
    }
  
    handleChange = e => {
        const { name, value, id, files } = e.target
        const newList = this.state.list.slice();
        if ([name] == "img"){
            console.log('é uma img')
            newList[id][name] = files[0];
        } else {
            newList[id][name] = value; 
        }
        console.log("this is me", newList, "index", id)
        this.setState({ list: newList });
        console.log("pingos nos is", [name], value)
        console.log(this.state)
      }

    submitIntro = e => {
        const { id } = e.target;
        axios.put('http://localhost:3001/post', 
            { 
            'titulo': this.state.list[id].titulo,
             'texto': this.state.list[id].texto,
               'id': id 
            })
            .then((res) => {
                console.log(res)	
            })
    }

    onChangeHandler=event=>{
        this.setState({
          img: event.target.files[0],
          loaded: 0,
        })
      }

    onClickHandler = (e) => {
        e.preventDefault();
        const data = new FormData() 
        data.append('file', this.state.img)
        axios.post("http://localhost:3001/upload", data, { 
            //receive two parameter endpoint url ,form data
        })
        .then(res => {
            // then print response status
        console.log(res.statusText)
        })
    }

    rmPost(e) {
        const { id } = e.target;
        console.log('id é', id)
        axios.delete('http://localhost:3001/post/', 
            {
             data:{'id': id} 
            })
            .then((res) => {
                console.log(res)
            })
        window.location.reload();
        e.preventDefault();
    }

    render(){
        return (
        <div>
            {
            this.state.list.map((list, index) => (
                <form key={index+1} onSubmit={this.submitIntro} className="text-center" id={index}>
                    <label key={index+2} className="col-lg-12 mx-auto">
                        <input type="file" name="img" id={index} onChange={this.onChangeHandler}/><button onClick={this.onClickHandler}>.</button>
                        <br/>
                        <input key={index+3} id={index} name="titulo" type="text" defaultValue={list.titulo} onChange={this.handleChange}/>
                        <button id={list.id} className="buttonPlus" onClick={this.rmPost}>-</button>
                        <textarea key={index+4} id={index} name="texto" className="col-lg-12 mx-auto" defaultValue={list.texto} onChange={this.handleChange}/>
                        <input type="submit" value="Enviar"/>
                    </label>
                </form> 
            ))
            }
        </div>
        );
    }
}

export default ManagerMainLoader;