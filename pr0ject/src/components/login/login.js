import React, { Component } from 'react';
import { Redirect } from 'react-router'

class Cadastro extends Component {
  constructor(args){
    super(args)
    this.state = {
        email: '',
        password:'',
        redirect: false   
    }
}

onChange(e){
  this.setState({
    [e.target.name]: e.target.value
  })
}
 
render() {
    return(
        <div className="login-page">
        <div className="form">
          <form className="register-form">
          <h1>Cadastro</h1>

          <div className="email">
            <label htmlFor="email"> E-mail </label>
            <input value={this.state.email} onChange={this.onChange.bind(this)} name="email" id="email" type="email"></input>
          </div>


          <div className="password">
              <label htmlFor="password"> Senha </label>
              <input value={this.password} onChange={this.onChange.bind(this)} name="password" id="password" type="password"></input>
            </div>

          <div className="creatAccount">
            <button type="submit"
            onClick={Redirect("/")}
            >Cadastrar</button>
          </div>

        </form>
      </div>
      </div>
     )
   }
}

export default Cadastro;