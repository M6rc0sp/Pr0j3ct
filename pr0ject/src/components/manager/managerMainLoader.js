import React, {Component} from 'react';
import axios from 'axios';

class ManagerMainLoader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitIntro = this.submitIntro.bind(this);
    }

  callAPI() {
    axios.get('http://localhost:3001/intro')
        .then((res) => {	
            console.log(res.data)
            let data = [];

            for (var i in res.data.site) {
                data.push({ titulo: res.data.site[i].titulo, texto: res.data.site[i].texto })
            }

            this.setState({ list: data })
            console.log("list",this.state.list)
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
        axios.put('http://localhost:3001/intro', { 'titulo': this.state.list[id].titulo, 'texto': this.state.list[id].texto, 'id': id })
            .then((res) => {
                console.log(res)	
            })
    }

    render(){
        return (
        <div>
            {
            this.state.list.map((list, index) => (
                <form key={index+1} onSubmit={this.submitIntro} className="text-center" id={index}>
                    <label key={index+2} className="col-lg-12 mx-auto">
                        <input key={index+3} id={index} name="titulo" type="text" defaultValue={list.titulo} onChange={this.handleChange}/>
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