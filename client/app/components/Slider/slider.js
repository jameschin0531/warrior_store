import React, { Component } from 'react';



// const HelloWorld = () => (
//   <p>Terms and Condition</p>
// );


class Slider extends Component {
  constructor(props) {
      super(props); 
  }

  render(){
    
      return(
      // <p>example</p>
 
        <div className="container App-main p-3">
            <h3>Welcome to warrior shop </h3><br></br>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://happy2u.my/attachment_img/ATCH42990.jpg?v=1560062752" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://happy2u.my/attachment_img/ATCH62382.jpg?v=1560062752" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://happy2u.my/attachment_img/ATCH47882.png?v=1560062752" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>        
        </div>
    
      )
  }
}

export default Slider;
