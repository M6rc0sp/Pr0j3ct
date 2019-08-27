import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleSignUp = e => {
    e.preventDefault();
    axios.post('http://localhost:3001/session')
            .then((res) => {
                console.log(res)
            })
    alert("Eu vou te registrar");
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Cadastrar grátis</button>
          <hr />
          <Link to="/login">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default SignUp;