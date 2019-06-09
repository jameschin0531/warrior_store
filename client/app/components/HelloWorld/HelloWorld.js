import React, { Component } from 'react';

// const HelloWorld = () => (
//   <p>Terms and Condition</p>
// );


class Rule extends Component {
  constructor(props) {
      super(props);
      this.loadData = this.loadData.bind(this);
      this.rulesList = this.rulesList.bind(this);
      this.state = {
          rules:[]
      };

      this.loadData();      
  }

  loadData(){
      fetch('http://localhost:3002/')
      .then(res => res.json())
      .then(json => {
          if(json.success){
              this.setState({
                rules:json.data.rules,               
              });

             
              console.log(this.state.products);
          }
          else{
              console.log("rules fetch fail");
          }
      });    
  }

  componentDidMount() {        
      
  }

  rulesList() {
      const list=  this.state.rules.map((rule) =>
          <div className="col-sm-12" key={rule.number}>
              <p>{rule.number}. {rule.description}</p>
          </div>           
      );
      return (list);
         
  }

  render(){
      return(
      // <p>example</p>
 
        <div className="container App-main p-3">
          <h3>Terms and Conditions </h3>              
          {this.rulesList()}        
        </div>
    
      )
  }
}

export default Rule;
