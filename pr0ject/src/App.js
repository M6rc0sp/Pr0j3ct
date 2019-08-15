import React, { Component } from 'react';
import Header from './components/header/header'
import Main from './main'

class App extends Component {

constructor(props) {
    super(props);
    this.state = {
      name: []
    };
  }

callAPI() {
    fetch("http://localhost:3001/admin")
        .then(res => res.text())
        .then(res => this.setState({ name: res }));

}

componentWillMount() {
    this.callAPI();
}

  render() {
    return (

      <div>
        <Header />
        <Main />
        <div className="shopping-list">
          <h1>Lista de compras para {this.state.name}</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
        </div>
      </div>

    );
  }
}

export default App;