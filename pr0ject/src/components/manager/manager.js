import React, { Component } from 'react';
import './manager.css';
import ManagerHeader from './managerHeader';
import ManagerMain from './managerMain';
import ManagerAbstract from './managerAbstract';
import Emailmanager from './emailmanager';


class Manager extends Component {
  render() {
    return (
      <div>
        <ManagerHeader />
        <section className="bg-primary3">
          <div className="container">
            <div className="row">
              <ManagerAbstract />
              <ManagerMain />
              <Emailmanager />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Manager;