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
	    axios.get('https://profdantas.herokuapp.com/email')
        .then((res) => {
            let data = [];
            console.log("entrei", res.data)
            for (var i in res.data) {
                data.push({ email: res.data[i].email, permission: res.data[i].permission })
            }
        this.setState({ list: data })
        console.log("list",this.state.list)
        });
    }

	componentWillMount() {
		this.getEmail();
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
        e.preventDefault();
        const { id } = e.target;
        axios.put('https://profdantas.herokuapp.com/email', 
            { 
            'email': this.state.list[id].email,
            'permission': this.state.list[id].permission,
            'id': id
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
        axios.delete('https://profdantas.herokuapp.com/email', 
            {
             data:{'id': id} 
            })
            .then((res) => {
                console.log(res)
            })
       window.location.reload();
        
    }

    render(){
        return (
        <div className="col-lg-8 text-center" style={{margin: 'auto'}}>
            <h1>Emails</h1>
            {
            this.state.list.map((list, index) => (
                <form key={index+1} onSubmit={this.submitIntro} className="text-center" id={index}>
                    <input key={index+2} id={index} name="email" onChange={this.handleChange} type="text" defaultValue={list.email}/>
                    <input key={index+3} id={index} name="permission" onChange={this.handleChange} type="text" defaultValue={list.permission}/>
                    <Button id={list.id} name={index} variant="danger" onClick={this.rmEmail}>Remover</Button>
                    <Button block variant="success" size="lg" type="submit">Salvar</Button>
                    <br/>
                    <br/>
                </form>
            ))
            }
        </div>
        );
    }
}

export default EmailManager;