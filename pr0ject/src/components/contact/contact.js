// Importando o React
import React, {Component} from "react";
import {Button} from 'react-bootstrap'
import './contact.css';

class Footer extends Component {

  render (){
    return(
        <section id="contact">
            <div className="container">
                <div className="row">
                <div className="col-lg-12 text-center">
                    <h1 className="section-heading text-uppercase">Contato</h1>
                    <br></br>
                </div>
                </div>
                <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <form id="contactForm" name="sentMessage" noValidate="novalidate">
                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group">
                            <input className="form-control black" id="name" type="text" placeholder="Your Name *" required="required" data-validation-required-message="Please enter your name."/>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="form-group">
                            <input className="form-control" id="email" type="email" placeholder="Your Email *" required="required" data-validation-required-message="Please enter your email address."/>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="form-group">
                            <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" required="required" data-validation-required-message="Please enter your phone number."/>
                            <p className="help-block text-danger"></p>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                            <textarea className="form-control" id="message" placeholder="Your Message *" required="required" data-validation-required-message="Please enter a message."></textarea>
                            <p className="help-block text-danger"></p>
                        </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-lg-12 text-center">
                        <div id="success"></div>
                        <Button id="sendMessageButton" variant="warning" className="btn btn-primary  text-uppercase" type="submit">Enviar Mensagem</Button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </section> 
      );
    }
}

export default Footer;