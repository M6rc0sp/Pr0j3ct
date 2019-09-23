// Importando o React
import React, {Component} from "react";
import './footer.css';

class Footer extends Component {

  render (){
    return(
        <footer>
            <div className="container text-align: center">
                <div className="row text-align: center ">
                    <div className="col-md-12 text-align: center">
                        <span className="copyright">João Dantas Pereira &copy; "O prazer no trabalho aperfeiçoa a obra" (2018)</span>
                    </div>
                </div>
            </div>
        </footer>
      );
    }
}

export default Footer;