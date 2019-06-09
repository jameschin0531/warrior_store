import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    getFromStorage,
    setInStorage
  } from '../../utils/storage'

import 'whatwg-fetch';

class Profile extends Component {
    constructor(props) {
        super(props);
        // this.loadData = this.loadData.bind(this);
        // this.productList = this.productList.bind(this);
        this.state = {
            accountEmail:'',
            accountFirstName:'',
            accountLastName:'',
        };

        // this.loadData();
        this.logout =this.logout.bind(this);
        
    }

    componentDidMount() {        
        const obj = getFromStorage('the_main_app');
        if(obj && obj.email){
             // read user data
     
            fetch('http://localhost:8080/api/account/'+ obj.email)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.setState({
                    accountEmail:json.user.email,               
                    accountFirstName:json.user.firstName,                                              
                    accountLastName:json.user.lastName,                                              
                    });  
                  
                }
                else{
                    console.log("user fetch fail");
                }
            });
        }
    }

    logout(){
        this.setState({
          isLoading:true
        })
        const obj = getFromStorage('the_main_app');
       
        if(obj && obj.token){
          const {token} =obj;
          //verify token
    
          fetch('/api/account/logout?token='+ token)
          .then(res => res.json())
          .then(json => {
            if(json.success){
              setInStorage('the_main_app',{token:''});
              this.setState({
                token:'',
                isLoading: false
              });
            }else{
              this.setState({
                isLoading: false
              });
            }
          });
          
        }else{
          this. setState({
            isLoading:false
          })
        }
        let path = `/`;
        this.props.history.push(path);
        
      }



    render(){
        return(
           // <p>example</p>
        <div>
            <div className="container App-main ">   
               <div className="card m-3">
                    <div className="card-header">
                        <h3>Profile</h3>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Firstname:  {this.state.accountFirstName}</li>
                        <li className="list-group-item">Lastname:   {this.state.accountLastName}</li>
                        <li className="list-group-item">Email:      {this.state.accountEmail}</li>
                    </ul>
                </div>
                <button onClick={this.logout} className="btn btn-primary  m-3">Logout</button>
            </div>
        </div>
        )
    }
}

export default Profile;
