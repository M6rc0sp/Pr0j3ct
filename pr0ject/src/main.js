// Importando o React
import React, {Component} from "react";
import axios from 'axios';
import Linkify from 'react-linkify';
import Abstract from './components/abstract/abstract';
import photo from './public/img/0.jpg';

class Main extends Component {

  constructor(props) {
		super(props);
		this.state = {
    list: [],
    link: "",
		};
	}

	callAPI() {
		axios.get('https://profdantas.herokuapp.com/post')
      .then((res) => {
            console.log("res",res)
            console.log(res.data)
            let data = [];

            for (var i in res.data.site) {
                data.push({ titulo: res.data.site[i].titulo, texto: res.data.site[i].texto, img: res.data.site[i].img })
            }

            this.setState({ list: data });
            console.log("list",this.state.list);
            console.log(this.state)
          });
	}

	componentWillMount() {
		this.callAPI();
  }
  render (){
    return(
      <section className="bg-primary3" id="about">
        <div className="container">
          <br/>
          {this.state.link}
          <Abstract/>
          <br/>
        {
          this.state.list.map(function (list, index) {
            if(index===0){                
              return (
                <div key={index} id="main" className="row" >
                  <h1 className="text-center">{list.titulo}</h1>
                  <div  className="col-lg-12 mx-auto text-justify">
                    <div id="dimg">
                     <img src={photo} alt={"img"+index} />
                    </div>
                    <br/>
                    <Linkify properties={{target="_blank", rel="noopener noreferrer"}}>
                      <p style={{whiteSpace: 'pre-wrap'}}>{list.texto}</p>
                    </Linkify>
                  </div>
                </div>
              );
            }
            return (
              <div key={index} id="main" className="row" >
                  <h1 className="text-center">{list.titulo}</h1>
                  <div  className="col-lg-12 mx-auto text-justify">
                    <div id="dimg">
                    </div>
                    <br/>
                    <Linkify properties={{target="_blank", rel="noopener noreferrer"}}>
                      <p style={{whiteSpace: 'pre-wrap'}}>{list.texto}</p>
                    </Linkify>
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