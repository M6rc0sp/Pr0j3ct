// Importando o React
import React from "react";
// Importando o component Home
// Importando os components necessários da lib react-materialize

const Main = () => (
  <section class="bg-primary3" id="about">
    <div class="container">
      <div class="row">

        <div class="col-lg-8 mx-auto text-justify word-spacing: 10px">
          <h1 class="text-center" >Introdução</h1>
          <div class="light my-4">
            <br />
            <p >
            A Constituição da República Federativa do Brasil - CRFB, de 1988, é um Diploma legal que estrutura e organiza a sociedade, com estabilidade, para garantir a segurança jurídica das pessoas. Apesar de rígida, ela pode ser alterada por meio de: 
            a) Emenda Constitucional – processo formal de modificação da Constituição. Os critérios e os procedimentos são pré-estabelecidos e têm participação da Câmara dos Deputados e do Senado Federal; 
            b) mutação constitucional - é uma alteração feita de modo informal, sem necessidade de passar por um processo legislativo. Ela se faz necessária, pela evolução da sociedade, dos valores religiosos, morais e dos fatores econômicos. É um processo de adequação da Constituição na realidade na qual se insere. Não tem como objetivo alterar o texto constitucional. Visa, apenas, a alteração do sentido que dá à norma constitucional;
            c) O ativismo Judicial, segundo a doutrina, foi usado pela primeira vez por um historiador americano em 1947. É uma consequência da jurisprudência progressista da Suprema Corte Americana. Contribuiu para a abolição da segregação racial americana. Expandiu-se a outros países no período de 1954 – 1969. Trata-se de uma atitude e escolha, de modo específico e proativo, de interpretar a Constituição, expandindo o seu sentido e alcance. É uma participação mais ampla e intensa do poder judiciário, na concretização dos valores e dos fins constitucionais.
          </p>
         

          
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

export default Main;