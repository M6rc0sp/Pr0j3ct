import React, { Component } from 'react';
import Header from './components/header/header'
import Main from './main'
import Footer from './components/footer/footer'
import Contact from './components/contact/contact'

class App extends Component {

  render() {
    return (

      <div>
        <Header />
        <Main />
        <Contact />
        <Footer />
      </div>

    );
  }
}

export default App;