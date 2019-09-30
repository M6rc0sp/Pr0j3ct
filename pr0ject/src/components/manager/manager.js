import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './manager.css';
import ManagerHeader from './managerHeader';
import ManagerMain from './managerMain';
import ManagerAbstract from './managerAbstract';
import EmailManager from './emailmanager';

class Manager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  blog = () => this.setState({ expanded: false });

  site = () => this.setState({ expanded: true });

  render() {
    return (
      <div>
        <ManagerHeader />
        <section className="bg-primary3">
          <div className="col-lg-12 text-center">
            <Button onClick={this.site}>Site</Button>
            <Button onClick={this.blog}>Blog</Button>
            <br/><br/>
          </div>
          {this.state.expanded
            ?
            <div className="container">
              <div className="row">
                <ManagerAbstract />
                <ManagerMain />
              </div>
            </div>
            :
            <div className="container">
              <div className="row">
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