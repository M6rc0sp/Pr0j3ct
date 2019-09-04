// Importando o React
import React, {Component} from "react";
import axios from 'axios';
import photo from './public/img/1567176103251-blob.png';
// Importando o component Home
// Importando os components necessários da lib react-materialize

class Main extends Component {

  constructor(props) {
		super(props);
		this.state = {
    list: [],
    link: "",
		};
	}

	callAPI() {
		axios.get('http://localhost:3001/post')
      .then((res) => {
            console.log("res",res)
            console.log(res.data)
            let data = [];

            for (var i in res.data.site) {
                data.push({ titulo: res.data.site[i].titulo, texto: res.data.site[i].texto, img: res.data.site[i].img })
            }

            this.setState({ list: data });
            console.log("list",this.state.list);
            if(this.state.list[0]){
              console.log('entrei')
              var l = this.state.list[0].img.split("\\");
              var li = l[1]+'/'+l[2]+'/'+l[3];
              this.setState({link: li})
            }
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
        {
          this.state.list.map(function (list, index) {
            return (
              <div key={index} className="row">
                <div className="col-lg-8 mx-auto text-justify word-spacing: 10px" >
                  <img src={photo} alt={"img"+index}></img>
                  <h1 className="text-center">{list.titulo}</h1>
                  <div className="light my-4">
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