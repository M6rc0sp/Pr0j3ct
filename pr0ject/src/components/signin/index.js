import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    user: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { user, password } = this.state;
    if (!user || !password) {
      this.setState({ error: "Preencha usuário e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { user, password });
        login(response.data.token);
        this.props.history.push("/manager");
      } catch (err) {
        this.setState({
          error: "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Usuário"
            onChange={e => this.setState({ user: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/admin">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);