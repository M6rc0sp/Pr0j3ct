// Importando o React
import React, {Component} from "react";
import axios from 'axios';
// Importando o component Home
// Importando os components necessários da lib react-materialize

class Main extends Component {

  constructor(props) {
		super(props);
		this.state = {
		list: [],
		};
	}

	callAPI() {
		axios.get('http://localhost:3001/intro')
      .then((res) => {
            console.log("res",res)
            console.log(res.data)
            let data = [];

            for (var i in res.data.site) {
                data.push({ titulo: res.data.site[i].titulo, texto: res.data.site[i].texto })
            }

            this.setState({ list: data })
            console.log("list",this.state.list)
          });
	}

	componentWillMount() {
		this.callAPI();
  }
  render (){
    return(
      <section class="bg-primary3" id="about">
        <div class="container">
        {
          this.state.list.map(function (list, index) {
            return (
              <div class="row">
                <div class="col-lg-8 mx-auto text-justify word-spacing: 10px">
                  <h1 class="text-center">{list.titulo}</h1>
                  <div class="light my-4">
                    <br/>
                    <p>{list.texto}</p>         
                  </div>
                </div>
              </div>
            );
          })
        }
        </div>
      </section> 
      );
    }
}

export default Main;