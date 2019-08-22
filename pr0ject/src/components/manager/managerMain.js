import React, {Component} from 'react';
import axios from 'axios';

class ManagerMain extends Component {

	constructor(props) {
    super(props);
    this.state = {
        list: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.submitIntro = this.submitIntro.bind(this);
  }

  callAPI() {
    axios.get('http://localhost:3001/intro')
        .then((res) => {	
            console.log("res",res)
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
  
    handleChange(event) {
        this.setState({texto: event.target.value});
    }

    titleChange(event) {
        this.setState({titulo: event.target.value});
    }

    submitIntro(event) {
        axios.put('http://localhost:3001/intro', { 'titulo': this.state.list[0].titulo, 'texto': this.state.list[0].texto })
            .then((res) => {
                console.log(res)	
            })
        event.preventDefault();
    }

    addPost(event) {
        axios.post('http://localhost:3001/intro')
            .then((res) => {
                console.log(res)	
            })
        event.preventDefault();
    }

    render (){
        return(
            <section class="bg-primary3" id="about">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto text-justify word-spacing: 10px">
                            <div class="light my-4">                                
                                    <h1 className="text-center" >Corpo do Site <button onClick={this.addPost}>+</button></h1>
                                        {
                                            this.state.list.map(function (list, index) {
                                                return (
                                                    <form key={index} onSubmit={() => this.submitIntro()} class="text-center" id='intro'>
                                                        {console.log(list)}
                                                        <label key={index} class="col-lg-12 mx-auto">
                                                            <input key={index+"inp"} type="text" value={list.titulo} />
                                                            <textarea key={index+"text"} class="col-lg-12 mx-auto" value={list.texto} onChange={() => this.handleChange()} />
                                                            <input key={index+"i"} type="submit" value="Enviar" />
                                                        </label>
                                                    </form> 
                                                );
                                            })
                                        }   
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ManagerMain;