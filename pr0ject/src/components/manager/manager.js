import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './manager.css';
import ManagerHeader from './managerHeader';
import ManagerMain from './managerMain';
import ManagerAbstract from './managerAbstract';
import EmailManager from './emailmanager';
import ButtonManager from './buttonmanager';
import VideoManager from './videomanager';

class Manager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: window.sessionStorage.getItem('expanded')
    };
  }

  blog = () => {
    window.sessionStorage.setItem('expanded', true);
    this.setState({ expanded: window.sessionStorage.getItem('expanded') });
  }

  site = () => {
    window.sessionStorage.setItem('expanded', false);
    this.setState({ expanded: window.sessionStorage.getItem('expanded') });
  }

  render() {
    return (
      <div>
        <ManagerHeader />
        <section className="bg-primary3">
          <div className="col-lg-12 text-center">
            <Button onClick={this.site}>Site</Button>
            <Button onClick={this.blog}>Blog</Button>
            <br /><br />
          </div>
          {(this.state.expanded !== 'true')
            ?
            <div className="row">
              <ManagerAbstract />
              <ManagerMain />
            </div>
            :
            <div className="container">
              <div className="row">
                <ButtonManager />
                <VideoManager />
                <EmailManager />
              </div>
            </div>
          }
        </section>
      </div>
    );
  }
}

export default Manager;