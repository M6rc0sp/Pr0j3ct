import React, {Component} from 'react';
import axios from 'axios';
import ManagerMainLoader from './managerMainLoader';

class ManagerMain extends Component {
    
    addPost(event) {
        axios.post('http://localhost:3001/intro')
            .then((res) => {
                console.log(res)	
            })
        event.preventDefault();
    }

    

    render (){
        
        return(
            <section class="bg-primary3" id="about">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto text-justify word-spacing: 10px">
                            <div class="light my-4">                                
                                <h1 className="text-center" >Corpo do Site <button onClick={this.addPost}>+</button></h1>
                                <ManagerMainLoader/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ManagerMain;