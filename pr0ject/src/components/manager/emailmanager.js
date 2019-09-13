import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class EmailManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    getEmail() {
	    axios.get('http://profdantas.herokuapp.com/email')
        .then((res) => {
          console.log("entre aki")
          this.setState({
              titulo: res.data.titulo,
              subtitulo: res.data.subtitulo
          });
        })
	}

	componentWillMount() {
		this.getEmail();
	}
  
    handleChange = e => {
      }

    submitIntro = e => {
        const { id } = e.target;
        axios.put('http://profdantas.herokuapp.com/email', 
            { 
            'email': this.state.list[id].email,
            'permission': this.state.list[id].permission,
            })
            .then((res) => {
                console.log(res)	
            })
    }

    rmEmail =(e)=> {
        e.preventDefault();
        const { id, name } = e.target;
        console.log(e.target)
        console.log(this.state.list[name])
        console.log('id é', id, "num é", name)
        axios.delete('http://profdantas.herokuapp.com/post/', 
            {
             data:{'id': id, 'img': this.state.list[name].img} 
            })
            .then((res) => {
                console.log(res)
            })
       window.location.reload();
        
    }

    render(){
        return (
        <div>
            <h1 style={{textAlign: 'center'}}>Emails</h1>
            {
            this.state.list.map((list, index) => (
                <form key={index+1} onSubmit={this.submitIntro} className="text-center" id={index}>
                    <label key={index+2} className="col-lg-12 mx-auto">
                        <input key={index+3} id={index} name="titulo" type="text" defaultValue={list.email} onChange={this.handleChange}/>
                        <Button id={list.id} name={index} variant="danger" onClick={this.rmEmail}>Remover postagem</Button>
                        <br/>
                        <input key={index+3} id={index} name="titulo" type="text" defaultValue={list.permission} onChange={this.handleChange}/>
                        <Button block variant="success" size="lg" type="submit">Salvar</Button>
                        <br/>
                        <br/>
                    </label>
                </form> 
            ))
            }
        </div>
        );
    }
}

export default EmailManager;