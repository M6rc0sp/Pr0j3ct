import React, { Component } from "react";
import './css/agency.css'
import './scss/agency.scss'
import "./vendor/fontawesome-free/css/all.min.css"
import './js/agency.js'
import photo2 from "./img/team/2.jpg";
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";

class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      buttons: [],
      videos: [],
      already: false,
      email: '',
      email2: '',
      email3: '',
      name: '',
      message: '',
      tel: '',
      show: false,
      e: '',
      nomeModal: '',
    };
  }

  handleChange = e => {
    const { id, value } = e.target
    switch (id) {
      case 'email':
        this.setState({ email2: value });
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
  }

  submitEmail = e => {
    e.preventDefault();
    axios.post('https://profdantas.herokuapp.com/emailsender',
      {
        'email': this.state.email2,
        'name': this.state.name,
        'tel': this.state.tel,
        'message': this.state.message,
      })
      .then((res) => {
        console.log(res)
        if (res.status === 204) {
          alert('Mensagem enviada.')
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Algo deu errado, tente novamente mais tarde.')
      })
  }

  addEmail(email) {
    axios.post('https://profdantas.herokuapp.com/email', { 'email': email })
      .then((res) => {
        console.log(res)
      })
  }

  getEmail() {
    axios.get('https://profdantas.herokuapp.com/email')
      .then((res) => {
        let data = [];

        for (var i in res.data) {
          data.push({ email: res.data[i].email, permission: res.data[i].permission })
        }

        this.setState({ list: data })
      })
  }

  getButtons() {
    axios.get('https://profdantas.herokuapp.com/button')
      .then((res) => {
        let buttons = [];

        for (var i in res.data) {
          buttons.push({ materia: res.data[i].materia, unidade: res.data[i].unidade, titulo: res.data[i].titulo, url: res.data[i].url, id: res.data[i].id })
        }
        this.setState({ buttons: buttons })
        console.log(this.state.buttons)
      })
  }

  getVideos() {
    axios.get('https://profdantas.herokuapp.com/video')
      .then((res) => {
        let data = [];

        for (var i in res.data) {
          data.push({ tema: res.data[i].tema, button: res.data[i].button, id: res.data[i].id })
        }
        this.setState({ videos: data })
      });
  }

  notifyEmail = (e, email) => {
    axios.post('https://profdantas.herokuapp.com/emailadvisor', { 'nome': this.state.nomeModal, 'email': email, 'url': e.href })
      .then((res) => {
        console.log(res)
      });
  }

  componentDidMount() {
    this.getEmail();
    this.getButtons();
    this.getVideos();
  }

  //modal init
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  setEmail3 = e => this.setState({ email3: e.target.value.toLowerCase() });
  setNome3 = e => this.setState({ nomeModal: e.target.value });

  verifyEmail3 = e => {
    var usuario = this.state.email3;
    console.log(usuario)
    if (usuario === "jotarn08@gmail.com" | usuario === "jotarn@hotmail.com" | usuario === "jotarn03@yahoo.com") {
      this.setState({ show: false });
      console.log(e.href)
      window.open(e.href, '_blank');
    } else {
      var p = false;
      var exist = false;
      let email = this.state.email3;
      if (!email) {
        alert('E-mail vazio')
        this.props.history.push("/blog");
      } else
        if (email.includes('@') && email.includes('.com')) {
          for (var i in this.state.list) {
            console.log('email', email)
            console.log('emails', this.state.list[i].email)
            if (email === this.state.list[i].email) {
              exist = true;
              if (this.state.list[i].permission === true) {
                p = true;
              } else {
                p = false
              }
              break;
            }
          }
          if (p) {
            alert('Olá, não se esqueça de mandar um feedback sobre o assunto depois...')
            this.setState({ show: false });
            this.notifyEmail(e, email);
            window.open(e.href, '_blank');
          } else if (!exist) {
            alert('Bem vindo')
            this.setState({ show: false });
            this.setState({ email: email })
            this.addEmail(email);
            this.notifyEmail(e, email);
            window.open(e.href, '_blank');
          } else {
            alert('Esse email está proibido de acessar esse arquivo.')
          }
        } else {
          alert('Invalido, digite seu e-mail corretamente.')
        }
    }
  }

  clicked = e => {
    var usuario = window.sessionStorage.getItem('e-mail');
    if (usuario === "jotarn08@gmail.com" | usuario === "jotarn@hotmail.com" | usuario === "jotarn03@yahoo.com") {
      //window.open(e.target.href, '_blank');
    } else {
      this.setState({ show: true });
      e.preventDefault();
      this.setState({ e: e.target });
    }
  }

  confirmed = e => {
    window.sessionStorage.setItem('e-mail', this.state.email3);
    e.preventDefault();
    this.verifyEmail3(this.state.e)
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
          <div className="container" id="page-top" style={{ padding: '0px 6px' }}>
            <a className="navbar-brand js-scroll-trigger" href="#page-top">Home</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
                  <i style={{ padding: '0px 6px' }} className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav text-uppercase ml-auto">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#services">Apresentação</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#about">Quem Sou</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#team">Redes Socias</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#edu">Educação</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#videos">Vídeos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#contact">Contato</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <div className="intro-lead-in">Bem Vindo ao blog do</div>
              <div className='col-lg-12 col-md-12 col-sm-12 intro-heading text-uppercase'><strong>Professor</strong></div>
              <div className="intro-heading text-uppercase"><strong>João Dantas Pereira</strong></div>
              <Button size="lg" className="btn btn-warning  text-uppercase js-scroll-trigger" href="#services"> Apresentação</Button>
            </div>
          </div>
        </header>

        <Modal show={this.state.show} size="md" onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Para continuar o acesso ao arquivo, por favor preencha abaixo.</Modal.Title>
          </Modal.Header >
          <Modal.Body className="text-center">
            <form id="modalForm" name="sentMessage" onSubmit={this.confirmed} noValidate="noValidate">
              <label><b>Seus dados</b></label>
              <br />
              <input placeholder='Nome' onChange={this.setNome3}></input>
              <p />
              <input placeholder='E-mail' onChange={this.setEmail3}></input>
              <br />
              <br />
              <Modal.Footer className="text-center">
                <Button variant="secondary" onClick={this.handleClose}>Fechar</Button>
                <Button variant="primary" type="submit">Continuar</Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>

        <section id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <h2 className="section-heading text-uppercase">Apresentação</h2>
              </div>
            </div>
            <div className="row text-align: justify">
              <p className="text-muted present">
                Este Blog foi criado em 2019 pelo Professor João Dantas Pereira, docente na Universidade Federal do Rio Grande do Norte – Natal/RN. Trata-se de um espaço que tem como objetivo principal: colaborar na consolidação, divulgação e implementação de resultados de estudos acadêmicos e científicos com as Instituições de Ensino Superior – IES locais, regionais, nacionais e estrangeiras, públicas e privadas. Essa colaboração poderá ser feita através da socialização de projetos de pesquisa e de estudos comparativos entre os seus integrantes e colaboradores, as suas congêneres locais, regionais, nacionais e estrangeiras. Este Blog vai articular um conjunto de discussões que permita a produção de conhecimentos, orientando-se preferencialmente pelo trabalho profissional dos cientistas sociais em geral e do operador de direito em particular, num contexto multi e interdisciplinar. Pretende, ainda, contribuir para a análise e capacidade dos profissionais envolvidos em dar respostas, em um contexto dinâmico e compartilhado. Será, portanto, um espaço para docentes, alunos de iniciação científica, de pós-graduação lato e stricto sensu, profissionais, pesquisadores e todos os interessados que assim o queiram fazer.
                    </p>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Minha Trajetória Acadêmica</h2>
                <ul className="timeline">
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="timeline">

                        <li>
                          <div className="timeline-image">
                            <img className="rounded-circle img-fluid" src="https://www.unl.pt/sites/default/files/logo-unl-face.jpg" alt="" style={{ maxwidth: '100%', height: '100%' }} />
                          </div>
                          <div className="timeline-panel">
                            <div className="timeline-heading">
                              <h4>2006 - 2007</h4>
                              <h4 className="subheading">Pós-Doutorado em Sociologia.</h4>
                            </div>
                            <div className="timeline-body">
                              <p className="text-muted">Universidade Nova de Lisboa, UNL, Portugal.
                                Grande área: Ciências Humanas</p>
                            </div>
                          </div>
                        </li>


                        <li className="timeline-inverted">
                          <div className="timeline-image">
                            <img className="rounded-circle img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4qhpaFrqL9Llc02IQLNj8sKicCU7bezLJjJI86tnMXk6Z9w6q" alt="" style={{ maxwidth: '100%', height: '100%' }} />
                          </div>
                          <div className="timeline-panel">
                            <div className="timeline-heading">
                              <h4>1995 - 1999</h4>
                              <h4 className="subheading">Doutorado em Sociologia (Conceito CAPES 6).</h4>
                            </div>
                            <div className="timeline-body">
                              <p className="text-muted">Universidade de São Paulo, USP, Brasil.
                                Título: Pontas e Ponteiros na Guiné-Bissau, Ano de obtenção: 1999.
                                Orientador: Fernando Augusto Albuquerque Mourão.
                                Bolsista do(a): Conselho Nacional de Desenvolvimento Científico e Tecnológico, CNPq, Brasil.
                                Palavras-chave: Pontas e Ponteiros; Guiné-Bissau; Ajustamento Estrutural.
                                Grande área: Ciências Humanas
                                Setores de atividade: Produtos e Serviços Recreativos, Culturais, Artísticos e Desportivos.</p>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="timeline-image">
                            <img className="rounded-circle img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4qhpaFrqL9Llc02IQLNj8sKicCU7bezLJjJI86tnMXk6Z9w6q" alt="" style={{ maxwidth: '100%', height: '100%' }} />
                          </div>
                          <div className="timeline-panel">
                            <div className="timeline-heading">
                              <h4>1982 - 1989</h4>
                              <h4 className="subheading">Mestrado em Sociologia</h4>
                            </div>
                            <div className="timeline-body">
                              <p className="text-muted">Mestrado em Sociologia (Conceito CAPES 6).
                                Universidade de São Paulo, USP, Brasil.
                                Título: Relações Brasil, Guiné-Bissau e Cabo Verde no contexto das comunicações nos países do terceiro mundo,Ano de Obtenção: 1989.
                                Orientador: Fernando Augusto Albuquerque Mourão.
                                Bolsista do(a): Coordenadoria de Atividades Culturais da Universidade de São Paulo, CODAC-USP, Brasil.
                                Palavras-chave: Brasil; Guiné - Bissau; Cabo Verde; Relações; Comunicações nos países do terceiro mundo.
                                Grande área: Ciências Humanas
                              Setores de atividade: Produtos e Serviços Recreativos, Culturais, Artísticos e Desportivos.</p>
                            </div>
                          </div>
                        </li>

                        <li className="timeline-inverted">
                          <div className="timeline-image">
                            <img className="rounded-circle img-fluid" src="https://static-cdn.solutudo.com/solutudo-cdn/prod/adv_ads/5ad74499-1870-4e81-b815-17a7ac1f10ee/5ae9ecf9-988c-446a-b221-53abac1f177c.jpg" alt="" style={{ maxwidth: '100%', height: '100%' }} />
                          </div>
                          <div className="timeline-panel">
                            <div className="timeline-heading">
                              <h4>2010 - 2014</h4>
                              <h4 className="subheading">Graduação em Direito.</h4>
                            </div>
                            <div className="timeline-body">
                              <p className="text-muted">Faculdade Estácio de Natal, ESTACIO/FAL, Brasil.
                                Título: Análise Técnico-Jurídica da Legislação sobre Drogas no Brasil e em Portugal: um estudo comparativo.
                                    Orientador: Sivanildo de Araújo Dantas.</p>
                            </div>
                          </div>
                        </li>

                        <li className="timeline-inverted">
                          <div className="timeline-image">
                            <img className="rounded-circle img-fluid" src="https://i.ytimg.com/vi/IZHx3ycps5E/hqdefault.jpg" alt="" style={{ maxwidth: '100%', height: '100%' }} />
                          </div>
                          <div className="timeline-panel">
                            <div className="timeline-heading">
                              <h4>1977 - 1981</h4>
                              <h4 className="subheading">Graduação em Serviço Social.</h4>
                            </div>
                            <div className="timeline-body">
                              <p className="text-muted">Universidade Federal do Rio Grande do Norte, UFRN, Brasil.
                                Bolsista do(a): Ministério das Relações Exteriores - DF, MRE, Brasil.</p>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="timeline-image">
                            <img className="rounded-circle img-fluid" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhMVFRUVFxsYFhgYGBUWGhggGhgaGBgfGx8aHSggGBolHhgaITEhJSkrLi4vGCAzODMsNygtLisBCgoKDg0OGxAQGy0iICUvMisrLS0yLS0tLy8tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYBBAcCAwj/xABOEAACAQMBBQQHAgkICQMFAAABAgMABBEhBQYSMUETIlFhBxQycYGRoSNCJDNSYoKxssHRQ1NykpOi0uEVFiU0VGPCw/AXVaNEg5Ti8f/EABkBAQADAQEAAAAAAAAAAAAAAAACAwQBBf/EAC4RAAICAQMCBAUEAwEAAAAAAAABAgMREiExBEEiMlFhE3GBkaEjM0LRwfDxUv/aAAwDAQACEQMRAD8A7jSlKAUpSgFKUoBSlKAUrBrBagPVYNRe2N4ba2GZ5VTwBOWPuA1Pyqm3npQ424LO1klbpxDn5hUy2PfipxrlLhEHZFHRc0zXMJNobelHFwx26+J7NPdq5J/VWg6bS+/tW1Xy9YOR8FTFTVL9UVu72OvUzXIEj2j9za1qffcEfrjregutvRjiVorhR4GJwf6vC31o6PRofGXodSBrIrmkHpMlhYJe2bxnxXK58wHxke41cdib02l1+JlBbnwHKv8A1Tr8qjKqcd2iyNkWTVK88VZzVZMzSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFYzQmoTefeOGziMkhyT7CD2nPl4DxNdSbeEcbwSO0toRQRmSV1RF5kn/zJ8q53fb33l8zRbOQxxjIaZsDA8cnITx6nyFQ1+z3GLzajlIdTBbpo7/0R0XGMuddeYFRW0tqXV1E6wRNHaRLkxxA8Kjxcj8YfH4nxNa66Et/+GWdrfBszLs+3YtM7305OW4WKxA+bZ4pPry1rWu98rrh4YeC2jI0SFAuRyHexk8jqCOVbW8m5otreG4jk7VTw9qcAAcYBQgdF1xr4ir1vXsNLpDExijkUBrViwBbu5dSvPh01+fSrHOCw+StQk/Yoku6UzqHuruGORk7RY5pGLkfnZ9n3DP0r1u3ujDPatcSPN3ZDHwxR9oTjGoAGetWRtu2bTJeNcJG6RiOeFo+1YlGJ7hzga5HEM5FRdnvnaiO5jdbpBNctMphKBgCE5ksMElWJGo71RU7WsRR3EE92amxtzIbi5nhEksaRKmC6BXy3RlPL/OtVdz5o7aW87UR9kzgKAysQjcGQQcjJ0xW3ab2W8PbdkLgmV4G4pSjNiN1MnEQ3VQcAfStzefe6C4t7pI2I42iWJeEqSqt2jt5ZZmqeq7Vwc8GMles98ryMcLSCZOqTKJFPz1+tbIm2bckZVrGbmHXLw58cc0Pu0qrVYtzd3VumleZzHBEhZ3GmDju89NNW+A8avsrrjHVx8iqDk3gtVnvHf7P4fWh6zbH2ZkIbnyw+AD7m1866FsTbMN1H2kLhl69Cp8GHMGuOzNc7LdQsiTW8w4lGMxSqcZyp9g69PrW1YxhibvZLGOVRmW1Y8RxnXg/nI/LmMjGNBWOypNZ/JphY4vc7WKVWdzt7or1MexMv4yM8x0yvUr+rkasorJJNPDNMZJrKM0pSuEhSlKAUpSgFKUoBSlKAUpSgFYNZzXwvLpI0Z3YKqgsxPIAamgzgjd5tvxWcJlkPkijm7Y0A/jXL55yP9o7QHaSvra2/IYGoZh0jHMDr8a+11tIXcj7RugfVYDw28R07V+i/EjLfLkKjthWEm07qWeclkjAZ1XViuvDHGvQHGM/vrZXWoxy/r/SMdljk8I87P2ZLfF728kZYEOGYKWJ1A4I1HsjJA5fXWrdsWNrG6ksVZuymUSW7up4RJg8SE4w2QBkfvOa09k3D2N03Cn2MimS5gQFvVBkcBJz7WDlgOgPgKrW8m9c79rbJOZbcvlGZQHIGoGcZIz1OpwPGp4la9MfKRyoLL5JveHe+BVEcMYIaFoZoTkKjK32fCw5hftMY6FeWNKTtTaM11L2kp43IC6KBoOSgKPf4mt7Yu7rSp28ziC2B1kb73lGPvnpmt595orccGzoRGeRnkAeVvMZyEHl9BV0IxhtBZfqVyblvJ4Naz3MvHXjZBCnPimYRD66j5V9f9WIF/GbStVP5nFL9RioK9vZZm45Xdz4sSf8AIfCtfNXKFr5ePoV5itsFmO7NsfY2nbE/nK8f1ya8XG5V2BxRdncL4wSLJ9ND8hVcr6W1y8bcUbsjeKkqfmKaLO0sjVDujE0TKSrKVI5ggqR86tm7237b1RrG5EkSO3E0sWpbUHDgjIGgGmeQrWg3s7VRHfxC6To+izL/AEWGM/H4mvG0t2wYzcWUnrEA9oY+0i/pr4fnf/2oTepabNiUdt4l5so7e6eO5ZQllbL2VusmFEjkhcni+7nCgHmc1Td54I7eVZrcvbThu/Ac8UZwe+jcmjPToc+8DR3f3iaBTDIvbWz+3C2o15lM8m6+f1qKvbkyOWJY9F4mLkKNFGTqcCq66JRnvwTnase5boZ/XD61bfZbQi7zougnA5sg/K8V6/Kukbl70JexZ9mVNJE8D4jrwn/KuD2ly8brJGxV1OVI6EVdBfnu7VtMLKhAvIhywebY/IbGvgdehqHUUE6rTs+azUfsXakdxCk0ZyrjI8R0IPgQdKkBXnYa2ZtTzuKUpQ6KUpQClKUApSlAKUpQHlq53v7fNdTx7MhbGSGuGH3V54PuXveZ4RV129tJbaCSduUak48T0HxOBXHrm6aGzedz+E7RLa9ViBOSPAPy92Kvohl5+xRdLCwau2Ltbq5htYGWO3jYRQkkBRyDOTyJOCdddB1Os/vHZHZ5SeEiHsuCKEDDG4GOKVpdfZ1x46dNK+G5G7LOh9ZsjJDOF4ZeJVZB0KjOQDnPQ6cjX13zmks4DZNIlzHKPsi+skIUjmeTc8BtMVpbTkoR+pn4jqf0Ineje8XCdnDH2Il71xjGZXwBgkc1GOvPTPXOtsPZESReu3g+xB+yj+9cMOg/MHU9da192NkJM7STHht4BxzN5dEH5zHT3A+IrX3g2w1zLxEcMajhijGgjUcgB46anyq/Tv8ADh9Spy21SMbc21LcvxOQFXSONdEQdAo/f1+QHz2VsmWdgI10JALt3UGTgZPhnT31Ibq7CFxIDMSsC4LsNCQTwgjP3eIYZhnhzrXZ7zYcXYCOKNQEUhV+6ykYZG8VYdfHDcxULeojV4YE66nZ4mchbZ2zrfSad7qTkUtwFQfpnn7x8qtuztmbM7e3tXssTzKWZTK79kAhcBzkDjOOQGnj4weztgJbXbTSZaGJe0hQ+078XAseOro5AOOoU8jWxujsm+O047m4glXiaRnZhoOKJwB5DJAHuFUzed9ROOzxg2tpW2zfwlEsgZbZu+iyuhZOrrzBx1GNPGqqbTZ834meS2Y8lnAZD+mhyvxFWDae720V2hJdQQFh2pZTxxgMpGCDlvZIyK1Nt+j267ZjbxZibDKCyApnUoctzU6Z16VKuUV/I5NN9is7U2RNbkCVMA6o47yOPFWGjfrrxsraktvIJYXKsOfUMPBh1FXHY+7m1IVMb26zQN7cLvHwnzU57jeY+NRO+W6T2hEihjC/s51ZCfuPgkE+DdavjdGT0y3KnBrdHraez4ruJru0XgdNbi3GvDz76eKHHKqtW5snaUlvKs0Rwyn4MDzU+IOOVSu8+z4yqXtsMQTHDJz7GTGWQ+GcZHv8MVOLdctL47HGlJZ7kzujuUroLq6P2ZUvHEpy8oALdNcYHsjU6cq1Lwf6Pu0mjUta3KcXAQRxRvjiRgeTAnT4eJrxuLtfs5HBDyTdiyWi+0FZjkgA+zk655YBzzqX3p2axhMu0roG5KYghjA0PmBzydCeQz1rNKUlY1N7FsdLhlLc3d1bwWN56tx8VrdgPbvnQFuQ95Pd9/DXUFrhWxybm0ktDkT22Zrf8rTWRBnl4gePurq+5W3PW7SOUnvjuyf0l5/PQ/Gs18MPP+/M0Uy7Mn6VgVms5oFKUoBSlKAUpSgFYJrNeWoCgekeY3E9ts5DjtHDy+SjOM/Dib3qKpN2v+kNpCNDiFWEa45JFGO8R78E/pCpa42kTLtLaGfZHq0B8C3dyvmAM/pHwqp7t7cezl7WNUbThIYaEaZAxy5c69GmDUXp9PyYLZZluXnZm0biNFgkX1u1kjeRAxCyxwo2A5bRT3cEag+Yrnd0VkmbslYBnxGpJZsE4UEnmeVXTbm+lvNbyGKJo7mZFhfXIEYySFYacOuMYHtCoXcuJVeW8cZS0TjA/KdsiIe/OvwFSqTinNrDIzabSR9N6ZBbxR7PjI+z79wR9+RgDg+SDT4jwqL3b2Q11cJCugY5dvyVGrH6YHmRWhcTM7M7HLMSzHxJOT+/51d9x7QJZXc7SxwtL9hHJI3Cq6ZY58TxfNasn+nX7sgvFP2Rpbd3o4bqMWwAt7UGJF6SKe7JxeKtjGvkeddN3U2ukkaBWLIy5hJOTge1G3XjTlrzGDqc1yr/AFVh/wDcrL+0qY2CqWenrtvLGzA4icM8TDlKo8ByYdVJzoKzWwg4rTyXVzalvwXffHYSzRsQeDXi4xzjcezIPLThbywfu1znde9u12jDDNLNkS8LqzuQcA+J1Gma6XLvfaR9y4lWOTA4kIZgc8ipC4ZCNQfCqpcTWUl3FcW8odrchmADAtEMg6MASY+empUfmiqqpNRaa2LbMNpplY342jMt/cKssigOMAOwA7qnQZqT3Wv5LuzubJpHMqL20LcTcXd5rnmRn9uvvvRsWwlupZX2kkbSEMU7ItjKjGobUEYPxr1ups+wt7qOVNpLI2SoTsmXi4xwgZ4j1NXylB1pJb/IpSlr5KF69L/Oyf12qW3d252btHcFnt5hwyqxJx4OM8mXnp/Cpzam62zo5pEfaHZsGOU7Fjw51AznBwDWuN3tl/8Aun/wtVvxa5Rxh/YhomnyV3buy2tp3gY54T3WHJlOqsPIj6ipLdC9Tja0mP2FyOA5+4/8m4884HxHhUtvpZwtZ280Ewn7E+rvIAVJGCycQPhy+NUirIP4teHyQktEjbuoZbWdkJKywvzGmqnQj6Ee+uo7sxw9nFPDE01zPHI3bzEuFkTmjtzQZ5YA0FUref8ACLa3vvvn7Cf+mgPAf0lHPyArb9Hs8shltRcmGJkZ2AQMSAAH4M+ySDnIB5VTcnOvPdcltb0zx2Zne2X1TaaXCEcR4JZFUggEjEi+YbB/rHyqybpzC22lLbqfsLtRNB4aji0+BYfoCozeDd+y9Uf1VWLpElysrFiZIySrc+gGp0GMioqC8Y2VrdL+MsZwjH8xiGXPlpw+4mqnicF9iW8ZHcQazXxtZQ6qw1DAEfEZr7VhNqFKUodFKUoBSlKAVF7yXvY2s0vVI2I9+O79cVKGqX6V7nhsGUc5HRB8+I/RTUoLMkiM9kc32v8AZbNs4fvStJcP5jVY/f3TVaxVo33XN5HbAfiYoYceZUN9eMCpjaG5UXb8KCRFe6SFQORTsQ8r6gknIbB5V6cLY1xWe+55zg5vY5/Vm2l9hs23iGjXLtPJ48K92MHxB5/DzqDvLVRM0KEkCQopPM97hGelTO/0g9bMK+zbxxwjw7qAn6n6VbJ6pRS+ZCO0WyuVbNtNwbJsU/nJJZD+icfvr6ejCCJ7pzMqMixE4cKwzxAA6/Gr1t9YysVtCsLdrIIom4FbscqzyFQQRngRiPPnyGaOpuxYljguqrzFs4pVi9H3D/pCANw8J7QHixjBhkGudPL411HZ9hblWSWKANBJ2cj9kmXGAyEd3QuGXPh3gPESHq+z/wCbt/7NP4VXZ1aaawSj0z5yclgxexm3JHrEHF6sdPtEB70RPiBqvxHjVes7p4ZFkQlXQ5HiDyIP6iK77FHYKQypACNQQiAg+WBpR47AkkpbknUkohJzzzpqahDqlFNY2JS6fO+Tiu3bVGVbuAfZSHDqP5GTGWT+iea+Rx0qHhn4GVx9whv6pz+6v0GBYgFQsAVsZHAmDjlkYwcV47LZ383bf2af4alHq8RxgPpt85OR+klMbRm8wh+aLVZzX6Gmaxc8TiBjyyyqTp5kV44Nn/kW/wDUj/hSvrdMUsHJdM285OSbs9+x2hCeQRJVHmran6CquDXf5No7NhyGe1j4hgg9mnEPDXGRVZ9I0Vq9iZLcQ9ySM8UYUaE8PMDlr9KlV1PixjlnJ0+HOSmbpHtorqzOvaRdrGPz4sHA8yP1edRe7e0WguYpUAJDYwTwghu6QSAcDXPI8q+m6V72N5bv07RVb3P3W/az8K19vWfY3M0Q+5IwA8snH0NaWvHKPqUavCmXq42AkKgXe0VhQK6rFEdQsjcbJn2nXJxjhOnhVd3QXtFvLUd7tYGaPTm0XeTGeWcmrlu7b20lu08OzFdlVeEy8B7Vvv8ABxZIxgnOBmq9Ji327gABWmVcDAAEyKMaaYBk+lZIPKlEvksYZ0L0bX3a7PhJOSqlD+gcD+7w1aKoXosbg9ctv5mc4HgGJA/YNX2slixJmut5iKUpUCYpSlAKUpQCqD6Uu+bGHpJdLn6J/wByr8aoW/ut7s1f+dn5Mn8Ksq85Xb5Tn+3zJLtWQRayG4AjPmrBVznTAwPgK6DcXG0YYnZbm1uXiUs8fBhsAHiwVYa++ucptJYdptO6llSd2IGMnVgMZ+B+FWFN59mIZZYreWOaRJBnmCXHXvdTWy2Enpwuxkg0slV3Xh7W+twdeKdWPnhuM/qNfDb8/aXM7n70rn+8ak/R6v4fB+bxn5RtUBM2WY+JJ+ZrXH9z6IoflL16Hf8Aepj/AMn/AKxV+29GZYe3DrGYWWWFm7q93mXPRXBxjoMeYrnvokQNcyoeRi1HjiRTj3HkR1Brrt7CGjdWGVZSCDyII1rzuq/dNvTrNZAbtyu8clwGRpJJOOSNHEgXuKgQMNOIKoOeROehzVkt5QwBByCM9f8AwVz3Zmx4mIs5GktpQgeKS3bsTPGRpxcIw7pyOQTrnqak/wDUBf8Aj9of24/wVS1HuycW8cFzpVO/9P0/47aH9uP8FP8A0/j/AONv/wC3/wD1rmIepLMvQuNKpp9H0f8Axl9/bj/DXg+juP8A42//ALZf8FdxD1GZehdahd6t4I7OFpXOTg8CdXboPIeJ6VyLfWE2lz2ENzcOAili8pJDEk47oA0Xh+dVqeZnPfZm0x3mLfrPnWqvo9S1Z2M8+pxtg7O09nY4e+lV7mXVmZS5GeiAA8EY5YHhnXWo30hwiGCRI9Ip04wg9lXjdGyo5KGUknHVQepr6bMtbddmPcfjpriMq0j9+RpH7ioC2SMMcAU9JIAjSIfydvK59wMUY/XVMF+okTl5Dkitg58Dn5VYvSAn4a79JUikA98ag/3garhqy78HLWjn71nF9OKvUl+6mYY+Rlg2NA9zYwNHfm3a3JQqe6oYswTLaalSOeRr0qv7X2FdW0wnuHVmE0ZLcRYsSSytkjX2CPEYHTWp3ca5nFoyWdmJZC5LySMqxgj2MAkcTAeGMZqtbybRvjI8d2zBsqxQ8PCOHPCVxkY1OoPjWWClrklg0SxpWTou6Hc2vtGMfeCP88N/3D86v1c92Af9tTfn20Z/ux/wroIrDZyaqvKeqUpVZaKUpQClKUAqhb+aX2zT/wA7HzZP41faoPpOPC9hL0S6XPzVv+g1ZV5iu3ynKturi5nH/Nf9s1o1Mb4RcN9cr4St9dR9DUzu/uHJIhnumMECqXOfxjBRkkDHdGAdSM+VeurIwrTkzztEpSeDS9Hh/D4vMSD/AONqrjDU1OblyBNoW5zkdrwA+PGGQftZqL2lFwzSr+TI4+TGux/dfukH5C2eiOXF9jxif6Fa7PN7Le4/qrg/o6uODaMHgxZT8UbH1xXd5fZPuP6q87rF+obOmfgwQW1th+s20XC3ZzRqrwyDmjBR/dPIivjuxvP2rG2uQIruPR0PJ8feTxB5/wAan9n/AIqP+gv7IqJ3p3XivFHFlJE1jlTRl1z8Rnp8sVmTXDLWmt0ToNZrmNztnbGz+7NGtzCvKTDE46ZZSCv6Sn31rD0uSY/3Vf7U/wCCpqib8u5H48VydWJqD3q3nhsoyznLkdyMc2P7l8TXNNo+k+8cYRY4h4gFm+bHH0qnzXEk0mWZpJGPXLMfd1+FaK+jecz2RVPqVjERe3bzSNLIcu5LMfMnp4DpjyFXXcbcdbqCSaYsgfuwkcwQdWx1GRjz73kazun6OZZSJLsGOPnwfff3/kr9fIV163gVFCKAFUYAGgAxip9R1KWIQ7EKqG3qkc92Jst7LhWSweZ0J4JYnDKxP3uFmHZtg44iM4HOvrvhaSCyurm4AEsqxxhAeIRoHHCufvEkkkjy8K6DiqT6XJuGw4fy5UX5Zf8A6KyQlqmjROKUWcWqy76crJeotI/31WjVk3/IFykf81bwoffwl/8AqFetP9yKPPXlZNbtp6zYR28N4LWWKR2kHEycYbVSeEgnHv6eVRnpDu0eaGNZBM0MKxyS8+Nuuvj/ABqqEV9bROKRF8XUfNh/GoKjTJzbJfEysHWdgj/bUv5tqgP9WP8AjXQRVC3UHFtjaDjkionyCr/2zV+ry7eTfVwZpSlVlopSlAKUpQA1SfS1b8Vjx9YpUf8AWv6mq7VD72WXbWc8QGS0bcI8wMr9QKlB4kmQmsxZxrf0fhvbD+WjilHxQL+tPrU5a+kNJGBuLNGYqY+NWIJV9GHe5A9dag9untbCxn6qHt3/AECSnzXWve7mz9nNEJLuaXjLFRBGDxN4Y4QWwfHu++vSlGDqTl22MEXJTwjV2zb+qbQIChRFKkigHIAysijPXAOKb8W/BfT45MwkXzEih/1kj4Vu+kSbtZkf1eaEdmEBlGC4XOCOeoB5ZzXz3qPa29ldcy0RhkP50Rx9Qc1KuW8ZP5HJLlELse57KeGT8iRG+TA1+jnOVJH5J/VX5lNdy3b3njks4iwkL9mFYrFKwLKOE6qpGpGefWquuhwy3pZYyizbO/FR/wBBf2RWxUFZ7diWNFKzZCqD9hP0AB+5X1feGLGizn/7E/8Agrz8GzUiVaqbtPZltfSGOOJOBT9tOFAOQfYRvvNkd5ug05mtGfbFxcazRukX8ysd2Cdf5R1iPEPzVIHjmtg75xQ4jKxRcIACEXCYHTAMIwKnGMo8FUnF8nKb+ya1uGjkQFo31Vs8LDOnmVIrsm420bGWPNsiROB30wA4/ey+Bqu7wPFtGMN2WWA7kqJdN8DiHDL5fqqjjYF7HJxRwz5U911SRT7xkAj41tli6HieGjOv05ZSyj9Cg16FUDcreK8HEl/FNgAFH7FyT0IbhGvkceNWn/T8X5E//wCPP/grBKGl4NkZ5WSWNcy9NF13LeLxZnx7hwj9o1dzt6P8if8AsJ/8Fcg9Je1hcXh4c8MaBBkMpz7TaMMjU4/Rq/pY5sRV1EsQIDY9oZbiGIffkRT7iwyfgM1v72y9tfzldeKXgX9HEa/s1s7hqFne4Yd21ieX444VHxJ+hqFsrOad27NWkfBduEZPMEn5n616Lfjb9EYf4oktq7o3tvkyQMVH3k+0H93UfEV8t0LbtL62X/mqx90Z4z+zir3u/vGsVkjPdESQLKskL6yO5Y9mO93hjTl4+VVPctyrXV2dTBbuwJ/Lfup8zn61SrpyhLPyLHXFNYL96MF45L65/nZ8A+IUsR+3V9qp+jCy7PZ8WecnFIf0mPD9MGrZXnWPxM3wXhFKUqBMUpSgFKUoBXh+Ve68mgOMz7Owu0rDGsTC5hHkoycfoEfM1pejSULcuF4e1MLi34vZ7Tpn4Z+tXDf5PVby1vwO4T2M2OqnP/SW+IFc33j2f6tdSRryVuKMjqp7yFfp8RXo0vXFx9TBPwyyXbeGK6XZ0x2lIpkaRDAo4SwIPe9kAYx0Gca1XN3B6xZ3NpzZQLiAdeJNHUe8Y+tScFvNC9nPGj3puIBxCQNKoJIJAY54ceeORPiKj9vlbDanHAMBGV+AYwOJQXT3EE/AiuVrKcO/P2OS/wDRVRXT/Q5tbSW1Y9e0j+Ojj58J+Jqmb37OWKYSRawXC9rCfJsFl/RJxj3Vp7A2o1tcRzr9xtR4qdGHxGa02r4tWxXB6LDuO+PEtv2isw7J0chSV4xxAMpI1xg50PMVqrGfX0iRnVFtzIw4mbjLMUAPEcDhxnTXNbO8Fys2zppEPErQM6nx7nEta4b/AGnF+dZn6SA/v+teSspYN75K7vBcSW8UDRFzKHuAX45CX9XSXGVLFe+UGRjqcVJ7aaGytInit45nlZEDOB32kHtOxBJLHX41i9QG4sAdQbq8BHjlbisHZnb2Vzs5s8dueGI9eEd+3I+GFP8ARap7bEO7I+4LxyDKG0nLxFkhbMNwpmRGI00dQ2uBnHiKmLvgWC7uZO0cxPKcCWVAQmMAcLYHyrY3YuI7+0hkmUM8bAPkarJHjJ8j1+NeLiFXsr5HfgVnnDPgnhHU4HOuN7nUtj4WkbSwvNatNBPGSGjkkaVCwUMFYMxBVgwPEuDr5VP7tbXW7to7hRjjGo8CDhh8waoSb1IsL29h2l3czElpAnCoJULnHTAAAGMaZJ8bluTsZrSzjhcjjGWbGoyxzj4Zx8K5KOFudg8sldpXqQxPK57qKWPwH66/N97dNK7SvqzsWPxOflXTfS9t0BVs0OrYeXH5I9lT7zr7hXPt3tlG5uEhBwp7zt+Si6ufln5itvSx0QdkjN1EtUtKJWX8H2aq8pL1+I+IijOF+bHPuJqQ9H1tGhWZrzsJXcIsYCkyAsBghhyJ646ZqH21dreXqhWEcOViiJ0CIpwD+ttfGugxLaXUawPCDF2phtGT28RL9pJxAjhUMp1HlXLXphh992K14vkRPpQuR2SLLDGs7ytwEd5hEh0JPi2Rp76gbe3K7PihUfaX9woHjwI3CP7xH1qJu4GuLzso5Hm4pBHG7niJGcAnyGp00xrV/wB3bVbjah4B9hs+NYo/Di1XT4hvkPGkv060vqFmUjodhbCONI1GAihR7gABWzWBWa883IUpSh0UpSgFKUoBTFKUBEb07JF1bSwnGWXu+TDVT865BtCJrmyDMPwiwPZTDqY8ngP6JGM9cE13U1zXfS09SvFv1Xihn+zuk6EEYOfeNfep8a0UTw8fYoujlZKjudtm+40s7acRrITjiVWC6FjjIyM4+uatN7sG3lgjTs17SSB5Tclu8ZYyOMOebDJOR0wcDTSkbd2c1ncK0Tdw4lt5B1XPEuD4jQfKp+K8l2giSXDKsEDFHEAw6mUY7Rl1+zJ5+9uetabY7qyOyM0H/GRH7vSC6gOz5Th88dqzacL4yyHyccvMnyqszwsjMjgqykqwPMEaEVf9+NkFLeK4meNLpCEBQ/j1UjgcAAcLAYOn8MRkkY2nHxrgX0S99dB6wqjHEv5/iP8AKrKrf5dmRnDt3N/0f7wZjk2fKdJVcQk8gzA5U+8nI/zFWuO6ZpbS9WN2VYZIJ1RSzxOSmQVGpwyEHFcYIIONQQfMEEH6EVf91NsLcns3uZLW5bA7RCOGfAwONW7vaADGdCdPdVd9GHrjwWV2PyssdxcZvNnREFZO0nnZeqK6SkBvPvY+BqX2x9hdwXPJJPweb9I8ULfB8r+nXjdzdFLaVp3keeZxgyOdQOZwB44Fffa13b3QmsOPEpXQEFdRhgyH7xU8J05aVifOxpSwsshdmt6ntWSDlFeDtY/DtBnjHxx9V8a273Wwv8flXHKoveJpLjZ0d2ulzaNxN4hozwSgj3rxY8qndjWjy26SQ3LrHKpcLwRNjjyxGSuTgk6nWuy9SKzwSO7USC2hKBQDEhPCAM90ZOnOsby7cjs4Gmc8tFXTLt0A+WvgM1rB7fZtoqu5EcQwCdWY88AdSfCuMb07xS3svaP3UGkaZ0UeZ6sep/dU6aXZLPYjZYq1juR+0LySeV5ZDxO7ZOnjoAB8gBVjvh6ha9hyurkAzeMcX3U8mbTPlnypsuySxjW8uVBmYZtoDoc9JHHQDp7/ABr3uLD61eyST4mkWN5VVtA7gqFz5DPLly00rbOSxt5V+TNFPO/LNTdOGwlDwXXEkjkdlLnCr0APvz1GD5YFSG2NmybLiwLgNLMHjCgZAibmy51jYkDlnn1xmpLaNx6zZSXFzarDPayLwkoUWTvA8BB1YHkRqOWOeKqzNPtO86cUhHL2Y0Xr7lGvmffUItzbk+O5KS0+Hube7S+rW8t+fawYbbr32GGYD80Z+vlXUPR9sU21oocfaSfaSeOW5A+4YHzqo7DsEvbxFjH4FY4CeEjA5yfEsw4vcB411UCs3UWZ2/32L6YdzIrNYrNZjSKUpQClKUApSlAKUpQGDWltXZ6TxPFIMq6kHxHmPAg65rerBFONzjWTjLbO4S+ybtsEEtZzHQAnkD+a3LyOnhVc2de3Gz7knHC6ErIh5MOZU+R5g/Guz757spew8PsypkxP4HwPipxr8+lc3ngN3m0usRX8PdjdtBOByRj445N1BrfTamt+O5itraexWdubYlupTNK2SdAOiDoB/wCa1pQTMjB0YqynKkcwfKs3Nu8bmORSrqcMpGCKlt0rK3nnEE5ZRL3UdTjhb7uh0IPLXqRW56Yw9jMtUpEoLi32iAJitvd4AEv8lMenaD7jnx6/IVAbW2PPbPwzIyn7rfdbzVuRrp2y/R6lqs0pb1iQI3Yjhxw5Ujlk8THOM1Qdnbx3VsPV5F44xo0E6kgY0wAw4l/VWauzLar3Xoy6cMebksG6XpGkhxFdAyINFcauo8/yx58/fU9LKkxlnQccPbCVJ4SHlhbs0TPZ4J4cLhgddTpgZqk9tsqb2o57RjqeA9rH8Ae8PlX3stlwRN2lttaNG8WV4j8dSDVVlcM5WzJxsktnuWjaG1ozbSWdl2l1PcMxd+AqAX9tnPCFXQYA06VuT71W+zbaO1DCeaOMKVU6A414j0Gc+flUFtC9kkQRy7Yt1XHe7KNuJ/NuEjPwwPKoELsqHUm4u28PxKfE54vlmoQrT53Ouxrg0728vNpT6hpW+6ijuxj9SjzPOprZ2zrezlRJDHcXjsFVM5hhJOFMhHtsDjQcvrUVf72zMnZQKlrD+RCOEn+k3M/MVvbjbCglkjllvIoyjh1iDAOxU8QzxYAGRyGa0TUlDfZeiKo4cvUhNvrcm5cXIYzk4ORqfDhwMFfDGla0bzW8oYccUqajQqwyPA+R69DX6Lnt11cIhkCkKSBnxAzzAzX532nHP27iYN2xc8YxqWJ6DrnOmOmK701/xFpa2wdtrcd0be194bu84UmcvgjhRVABY6Zwo1Y5x8TpzqdWza2QWEHevbrAnYa9kh14M9NDlj/lXi1ths8BivaX8mkUQHF2HFyZh1kPRfOr/uJuqbUGac8dzLkyMdeHJzwg+Piep91U22RSwuCdcHJ7kzuzsVLSBYU1xqzdWY+0T/5oMVLCgFZrC3k2pYWBSlK4dFKUoBSlKAUpSgFKUoBSlKAxiqzvjulHepkYSZPxcg+eGxzGfiDqKs9YNdi3F5RFrJxW9YSH1TagMNwgxFdY0I6cf5afnfPBr5bLtY9mzdteRPKf/pzGFaJtM8fGSATqMDmNTrzHWtv7Bguo+CZAfBvvKfEGudX2xr7Z4ZVUXlmfajYceB5rqV966eIFa4W6lj8f0ZZ1aXksZ36R7Ca6iXEkRC9mxyQWYBc45gg5+B8K5Xt3eGe7YGYqccgqKMfHHEfiTUwtlZ3IYWtx6q74DQTHuMQcgLJ5HkDr7qiNp7tXcH4yF8dHUcaH9JdPng1fRGuLfZ+5VbKckRNWTZW5F3cKsiBOzbHeDqcDry6jwqt1ePRZemKWaSSbs7dEy+ThSxICc+uPDXprV/USkoZiV1JasSJfffcKWSSJ7RF4RGI2UsF9jRTrzyNP0R41znaFk8LmN+HiXnwsGA+I0zXXNtb1RXdlcCzmKyoucao5VTluEHXBUEaa1xomqeklN5UizqFFPwisMKktm7CuZz9jDI3nwkKPexwPrUwNg2ttre3IZh/IQEM36Tcl+nvrRK6C25KYwfJJbV3ivL+aKOyMiiNFyVJXvEDjZj0Uchn/ACr1LtAxSKkTevbQYcHa4DLEPBNO+w/LOca9NK+uzrW9vk7K1iFjZ9SAe972wGlPu06HNX/djda3s1xEuXI70h9o/wAB5CvPnOMV/j+zZGEpEbuXuZ6vm4uG7W5fUsdQmeeD1bxbn0GnO4gUWs1llJyeWaYxSWwpSlRJClKUApSlAKUpQClKUApSlAKUpQClKUArBFZpQFY29uRZ3RLNHwOfvx4U/HGjfEVVzuTtK1ObK8LL0RiV+GG4kPyFdOxQirI2yWxXKqLOQ3sm0B/veyoZ/wA7sgx/rRk4+lRb7Qt+T7HZep4Zp1B+HBgV3ErTgqxXr0/JW6Pc4bFtC1B7myHJ855/3R1IWU94ceq7IhjPRzESf68mP112LgFY4KO9en5YVD9TmI3U2tdf71dCJPyFOQP0Uwp+dWLYfo+s7fDFO1cfekwQD5L7Iq3Ypiq3bJ7cE1VFGEXFeqUqstFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKA//Z" alt="" style={{ maxwidth: '100%', height: '100%' }} />
                          </div>
                          <div className="timeline-panel">
                            <div className="timeline-heading">
                              <h4>2007</h4>
                              <h4 className="subheading">Especialização
                                On-Line de Capacitação-PREINVEST. (Carga Horária: 150h)</h4>
                            </div>
                            <div className="timeline-body">
                              <p className="text-muted">Escola de Enfermagem de Ribeirão Preto, EERP, Brasil.
                                  Título: Alcoolismo em Natal/RN.
                                  Orientador: Carlos Renato Tirapelli.</p>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="timeline-image">
                            <img className="rounded-circle img-fluid" src="https://img.redro.pl/fototapety/herb-portugalii-400-3101933.jpg" alt="" style={{ maxwidth: '100%', height: '100%' }} />
                          </div>
                          <div className="timeline-panel">
                            <div className="timeline-heading">
                              <h4>1998</h4>
                              <h4 className="subheading">
                                Especialização em Formação de
                                    Formadores para a Área Pedagógica. (Carga Horária: 90h).</h4>
                            </div>
                            <div className="timeline-body">
                              <p className="text-muted"> Trabalho e Solidariedade/Sistema Nacional Certificação Profissional, MTS/SNCP, Portugal.</p>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="timeline-image">
                            <img className="rounded-circle img-fluid" src="http://parentnets.com/site/assets/files/1032/iscte.jpg" alt="" style={{ maxwidth: '100%', height: '100%' }} />
                          </div>
                          <div className="timeline-panel">
                            <div className="timeline-heading">
                              <h4>1990 - 1991</h4>
                              <h4 className="subheading">Especialização em Desenvolvimento Social e Econômico Em África. (Carga Horária: 345h).</h4>
                            </div>
                            <div className="timeline-body">
                              <p className="text-muted">Instituto Superior da Ciência do Trabalho e da Empresa, ISCTE, Portugal.
                                    Bolsista do(a): Ministério dos Negócios Estrangeiros, MNE, Portugal.</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-light" id="team">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Contato nas Redes Sociais</h2>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="team-member">
              <img className="mx-auto rounded-circle" srcSet={photo2} alt="" />
              <h4>João Dantas Pereira</h4>
              <p className="text-muted"></p>
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/profjoao_dantas">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/joao.dantaspereira?jazoest=2651001197568566910071117821175079691075585113116901115586827454858712256117521055577457411856667175104115103586510012011082676711555978390971081125250109546976897349841219854113579911169988811210569909910988951058081">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a target="_blank" rel="noopener noreferrer" href="https://br.linkedin.com/in/jo%C3%A3o-dantas-pereira-7a40a08b">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCw-lR8Zdpe9r0H58zRXPgBQ">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/pereirajoaodantas/">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-light" id="edu">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center" style={{ margin: 'auto' }}>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                    <h2 className="section-heading text-uppercase">Matérias Ministradas</h2>
                  </div>
                </div>
                {
                  this.state.buttons.map((list, index) => (
                    <div className="col-lg-12 col-md-12 col-sm-12 float-left fill">
                      <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                        <h4>{list.materia}</h4>
                        <p className="text-muted">Materiais De Aula</p>
                      </div>
                      <div className="team-member">
                        {
                          list.unidade.map((b, index) => (
                            <div className={"col-lg-"+parseInt(12/list.unidade.length, 10)+" col-md-"+parseInt(12/list.unidade.length, 10)+" float-left fill"}>
                              <p>Unidade {index + 1}</p>
                              {
                                b.button.map((b, index) => (
                                  <div className="float-left fill">
                                    <Button onClick={this.clicked} block target="_Blank" href={b.url}>{b.titulo}</Button>
                                    <br />
                                  </div>
                                ))}
                              {
                                b.video.map((b, indexb) => (
                                  (indexb === 0)
                                    ? <div className="float-left fill">
                                      <h5>Vídeos para complementar o conteúdo</h5>
                                      <Button block onClick={this.clicked} target="_Blank" href={b.url}>{b.titulo}</Button>
                                      <br />
                                    </div> :
                                    <div className="float-left fill">
                                      <Button block onClick={this.clicked} target="_Blank" href={b.url}>{b.titulo}</Button>
                                      <br />
                                    </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                <br /><br />
              </div>
            </div>

            <section className="bg-light" id="videos">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 mx-auto text-center" style={{ margin: 'auto' }}>
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <br />
                        <h2 className="section-heading text-uppercase">Vídeos</h2>
                      </div>
                      {
                        this.state.videos.map((list) => (
                          <div className="col-lg-4 col-md-4 float-left fill">
                            <div className="team-member">
                              <h4>{list.tema}</h4>
                              <br />
                              {
                                list.button.map((v) => (
                                  <div className="float-left fill">
                                    <Button block onClick={this.clicked} target="_Blank" href={v.url}>{v.titulo}</Button>
                                    <br />
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Contato</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form id="contactForm" name="sentMessage" onSubmit={this.submitEmail} noValidate="noValidate">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input className="form-control" onChange={this.handleChange} id="name" type="text" placeholder="Seu nome" required="required" data-validation-required-message="Por favor digite seu nome." />
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <input className="form-control" onChange={this.handleChange} id="email" type="email" placeholder="Seu e-mail" required="required" data-validation-required-message="Por favor digite seu email." />
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <input className="form-control" onChange={this.handleChange} id="phone" type="tel" placeholder="Seu telefone" required="required" data-validation-required-message="Por favor preencha o campo do telefone." />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <textarea className="form-control" onChange={this.handleChange} id="message" placeholder="Sua mensagem" required="required" data-validation-required-message="Por favor digite sua mensagem."></textarea>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-lg-12 text-center">
                      <div id="success"></div>
                      <Button size="lg" style={{ marginBottom: '20px' }} id="sendMessageButton" className="btn btn-warning  text-uppercase" type="submit">Enviar Mensagem</Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="container text-align: center">
            <div className="row text-align: center ">
              <div className="col-md-12 text-align: center">
                <span className="copyright">João Dantas Pereira &copy; "O prazer no trabalho aperfeiçoa a obra" (2018)</span>
              </div>
            </div>
          </div>
        </footer>

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

        <script src="js/jqBootstrapValidation.js"></script>
        <script src="js/contact_me.js"></script>

        <script src="js/agency.min.js"></script>

      </div >
    );
  }
};

export default Blog;