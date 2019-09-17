// Importando o React
import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import axios from 'axios';
import './contact.css';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            message: '',
            tel: '',
    
        };
      }

    handleChange = e => {
        const { id, value } = e.target
        switch (id) {
          case 'email':
            this.setState({ email: value });
            break;
          case 'phone':
            this.setState({ tel: value });
            break;
          case 'name':
            this.setState({ name: value });
            break;
          case 'message':
            this.setState({ message: value });
            break;
          default:
            console.log('this was not expected.')
            break;
        }
        console.log("pingos nos is", id, value)
        console.log(this.state)
    }

    submitEmail = e => {
        e.preventDefault();
        axios.post('https://profdantas.herokuapp.com/siteemailsender', 
        { 
        'email': this.state.email2,
        'name': this.state.name,
        'tel': this.state.tel,
        'message': this.state.message,
        })
        .then((res) => {
            console.log(res)	
        })
    }

  render (){
    return(
        <section id="contact">
            <div className="container">
                <div className="row">
                <div className="col-lg-12 text-center">
                    <h1 style={{marginTop: '20px'}} className="section-heading text-uppercase">Contato</h1>
                    <br/>
                </div>
                </div>
                <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <form id="contactForm" name="sentMessage" onSubmit={this.submitEmail} noValidate="noValidate">
                        <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                            <input className="form-control" onChange={this.handleChange} id="name" type="text" placeholder="Seu nome" required="required" data-validation-required-message="Por favor digite seu nome."/>
                            <p className="help-block text-danger"></p>
                            </div>
                            <div className="form-group">
                            <input className="form-control" onChange={this.handleChange} id="email" type="email" placeholder="Seu e-mail" required="required" data-validation-required-message="Por favor digite seu email."/>
                            <p className="help-block text-danger"></p>
                            </div>
                            <div className="form-group">
                            <input className="form-control" onChange={this.handleChange} id="phone" type="tel" placeholder="Seu telefone" required="required" data-validation-required-message="Por favor preencha o campo do telefone."/>
                            <p className="help-block text-danger"></p>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                            <textarea className="form-control" onChange={this.handleChange} id="message" placeholder="Sua mensagem" required="required" data-validation-required-message="Por favor digite sua mensagem."></textarea>
                            <p className="help-block text-danger"></p>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-lg-12 col-sm-12 col-md-12 text-center">
                            <div id="success"></div>
                            <Button size="lg" style={{marginBottom: '20px'}} id="sendMessageButton" className="btn btn-primary  text-uppercase" type="submit">Enviar Mensagem</Button>
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