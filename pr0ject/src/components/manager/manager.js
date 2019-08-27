import React, {Component} from 'react';
import './manager.css';
import ManagerHeader from './managerHeader';
import ManagerMain from './managerMain';


class Manager extends Component{
  render() {
    return(
    <div>
      <ManagerHeader/>
      <ManagerMain/>
    </div>
    );
  }
}
  
  export default Manager;