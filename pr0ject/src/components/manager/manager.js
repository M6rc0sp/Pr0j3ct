import React, {Component} from 'react';
import './manager.css';
import ManagerHeader from './managerHeader';
import ManagerMain from './managerMain';

class Manager extends Component {

    render (){
      return(
        <section class="bg-primary3" id="about">
          <ManagerHeader/>
          <ManagerMain/>
        </section> 
        );
      }
	}
  
  export default Manager;