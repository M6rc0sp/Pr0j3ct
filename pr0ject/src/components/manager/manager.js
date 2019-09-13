import React, {Component} from 'react';
import './manager.css';
import ManagerHeader from './managerHeader';
import ManagerMain from './managerMain';
import ManagerAbstract from './managerAbstract';
import Emailmanager from './emailmanager';


class Manager extends Component{
  render() {
    return(
    <div>
      <ManagerHeader/>
      <section className="bg-primary3">
      <ManagerAbstract/>
      <ManagerMain/>
      <Emailmanager/>
      </section>
    </div>
    );
  }
}
  
  export default Manager;