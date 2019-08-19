// Importando o React
import React, {Component} from "react";
// Importando o component Home
// Importando os components necessários da lib react-materialize

class Main extends Component {

  constructor(props) {
		super(props);
		this.state = {
		site: [],
		};
	}

	callAPI() {
		fetch("http://localhost:3001/intro")
			.then(res => res.json())
			.then(res => this.setState(
				{
					site: res,
					titulo: res.titulo
				}
			));
			console.log("aqui é o main", this.state.site.titulo)

	}

	componentWillMount() {
		this.callAPI();
  }
  render (){
    return(
      <section class="bg-primary3" id="about">
        <div class="container">
          <div class="row">

            <div class="col-lg-8 mx-auto text-justify word-spacing: 10px">
              <h1 class="text-center" >{this.state.titulo}</h1>
              <div class="light my-4">
                <br />
                <p >{this.state.texto} </p>         
            </div>
          </div>
        </div>
        <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <br/><br/>
                  <h1 >O Congresso</h1>
                <div class="light my-4">
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-sm-4">
                <div class="team-member">
                  <img src="https://congressodireitotecnologia.com.br/img/icon_network.png" />
                  <br/><br/>
                        <span class="dvChamadaTitulo" s>Network</span>
                        <p class="text-justify" >Esperamos um público de 1000 a 1200 congressistas e abordaremos discussões que envolvem temas como: Inteligência Artificial (exemplos reais), Direito Digital, Tecnologia no Governo, Cyber Segurança e Legal Research & E-Discovery.</p>
                </div>
                
              </div>
              <div class="col-sm-4">
                <div class="team-member">
                    <img src="https://congressodireitotecnologia.com.br/img/icon_aprendizado.png" />
                      <span class="dvChamadaTitulo">Aprendizado</span>
                      <p class="text-justify" >Em nosso espaço, contaremos com o palco principal e a Exibição Tecnológica do
                        Congresso, onde patrocinadores e LawTechs poderão expor suas tecnologias aos congressistas.</p>
                        <br/>
                        <a class="btn btn-light btn-xl js-scroll-trigger text-center" href="#portfolio">Palestrantes</a>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="team-member">
            <img src="https://congressodireitotecnologia.com.br/img/icon_conexao.png" />
                      <span class="dvChamadaTitulo" >Conex&atilde;o</span>
                      <p class="text-justify" >Teremos também dois incríveis mini-eventos: Talkshow no final do dia 26 de setembro, onde haverá uma interação maior entre público e palestrantes, e a Apresentação 
                        de Startups, que ocorrerá no final do dia 27 de setembro.</p>
                </div>
                    <span class="dvChamadaTitulo"></span>
            </div>
          </div>
          </div></div></div>
      </section> 
      );
    }
}

export default Main;