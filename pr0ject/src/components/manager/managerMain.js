import React, {Component} from 'react';
import axios from 'axios';
import ManagerMainLoader from './managerMainLoader';

class ManagerMain extends Component {
    
    addPost(e) {
        e.preventDefault();
        axios.post('http://profdantas.herokuapp.com/post')
            .then((res) => {
                console.log(res)	
            })
        window.location.reload();
    }

    

    render (){
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-justify word-spacing: 10px">
                        <div className="light my-4">                                
                            <h1 className="text-center">Corpo do Site <button className="buttonPlus" onClick={this.addPost}>+</button></h1>
                            <ManagerMainLoader/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManagerMain;