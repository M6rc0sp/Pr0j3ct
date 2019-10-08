import React, { Component } from 'react';
import axios from 'axios';
import ManagerMainLoader from './managerMainLoader';
import Button from 'react-bootstrap/Button';

class ManagerMain extends Component {

  addPost(e) {
    e.preventDefault();
    axios.post('https://profdantas.herokuapp.com/post')
      .then(async (res) => {
        console.log(res)
        await window.location.reload();
      })
  }



  render() {

    return (
      <div className="col-lg-12 mx-auto text-justify word-spacing: 10px">
        <div className="light my-4">
          <h1 className="text-center">Corpo do Site <Button size="lg" variant="dark" className="buttonPlus" onClick={this.addPost}><b>+</b></Button></h1>
          <ManagerMainLoader />
        </div>
      </div>
    );
  }
}

export default ManagerMain;