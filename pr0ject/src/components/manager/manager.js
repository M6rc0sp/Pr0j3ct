import React, {Component} from 'react';
import './manager.css';
import ManagerHeader from './managerHeader';
import ManagerMain from './managerMain';
import ManagerAbstract from './managerAbstract';


class Manager extends Component{
  render() {
    return(
    <div>
      <ManagerHeader/>
      <section className="bg-primary3">
      <ManagerAbstract/>
      <ManagerMain/>
      </section>
    </div>
    );
  }
}
  
  export default Manager;