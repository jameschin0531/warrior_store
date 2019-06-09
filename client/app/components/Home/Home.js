import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token : '',
      signUpError:'',
      signIpError:'',
      signInEmail:'',
      signInPassword:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail:'',
      signUpPassword:'',
      accountEmail:'',
      accountFirstName:'',
      accountLastName:'',
    };
    
    this.onTextboxChangeSignInEmail=this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword=this.onTextboxChangeSignInPassword.bind(this);
    
    this.onTextboxChangeSignUpEmail=this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword=this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName=this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName=this.onTextboxChangeSignUpLastName.bind(this);
  
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout =this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
   
    if(obj && obj.token){
      const {token,email} =obj;

      // read user data
     
      fetch('http://localhost:8080/api/account/'+ email)
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
      //verify token

      fetch('/api/account/verify?token='+ token)
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token,
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
  }

  onTextboxChangeSignInEmail(event){
    this.setState({
      signInEmail:event.target.value
    })
  }
  onTextboxChangeSignInPassword(event){
    this.setState({
      signInPassword:event.target.value
    })
  }

  onTextboxChangeSignUpEmail(event){
    this.setState({
      signUpEmail:event.target.value
    })
  }
  onTextboxChangeSignUpPassword(event){
    this.setState({
      signUpPassword:event.target.value
    })
  }
  onTextboxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName:event.target.value
    })
  }
  onTextboxChangeSignUpLastName(event){
    this.setState({
      signUpLastName:event.target.value
    })
  }

  onSignUp(){
    const{
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state

    this.setState({
      isloading:true
    })

    //post request to backend
    fetch('/api/account/signup',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        firstName:signUpFirstName,
        lastName:signUpLastName,
        email:signUpEmail,
        password:signUpPassword
      })
    })
    .then(res => res.json())
    .then(json=>{
      if(json.success){
        this.setState({
          signUpError:json.message,
          isLoading:false,
          signUpFirstName:'',
          signUpLastName:'',
          signUpEmail:'',
          signUpPassword:'',
        });
      }else{
        this.setState({
          signUpError:json.message,
          isLoading:false,
        });
      }
    });
  }

  onSignIn(){
    // Grab state
    const{
      signInEmail,
      signInPassword,
    } = this.state

    this.setState({
      isloading:true
    })

    //post request to backend
    fetch('/api/account/signin',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({     
        email:signInEmail,
        password:signInPassword
      })
    })
    .then(res => res.json())
    .then(json=>{
      if(json.success){ // sign in success         

        // set token in storage
        setInStorage('the_main_app',{token:json.token,email:signInEmail});
        this.setState({
          signInError:json.message,
          isLoading:false,
          signInEmail:'',
          signInPassword:'',
          token:json.token
        });
          


      }else{
        this.setState({
          signInError:json.message,
          isLoading:false,
        });
      }
    });

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
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
      
    } = this.state;

    if (isLoading){
      return (<div><p>Loading...</p></div>)
    }

    if (!token){
      return (
      <div className="row container-fluid p-3">

        <div className="col-sm-12 col-lg-6"> 
              
          <h3>Sign In</h3>
          <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input 
            className="form-control"
            type="email" 
            placeholder="Email" 
            value={signInEmail}
            onChange={this.onTextboxChangeSignInEmail}/>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Password</label>
            <input 
            className="form-control"
            type="password" 
            placeholder="Password" 
            value={signInPassword}
            onChange={this.onTextboxChangeSignInPassword}/>
          </div>
          <button className="btn btn-primary" onClick={this.onSignIn}>Sign In</button>
          </form>
          {
            (signInError) ?(
              <p>{signInError}</p>
            ) :(null)
          }
        </div>

        <br></br>

        <div className="col-sm-12 col-lg-6">    
        
          <h3>Sign Up</h3>
          <form>
          <div className="form-group">
            <label for="First Name">First Name</label>
            <input type="text" placeholder="First Name"
            value={signUpFirstName} className="form-control"
            onChange={this.onTextboxChangeSignUpFirstName}/>
          </div>
          <div className="form-group">
            <label for="Last Name">Last Name</label>
            <input type="text" placeholder="Last Name"
            value={signUpLastName} className="form-control"
            onChange={this.onTextboxChangeSignUpLastName}/>
          </div>
          <div className="form-group">
            <label for="Email address">Email address</label>
            <input type="email" placeholder="Email"
            value={signUpEmail} className="form-control"
            onChange={this.onTextboxChangeSignUpEmail}/>
          </div>
          <div className="form-group">
            <label for="Password">Password</label>
            <input type="password" placeholder="Password"
            value={signUpPassword} className="form-control"
            onChange={this.onTextboxChangeSignUpPassword}/>
          </div>
          <button className="btn btn-primary" onClick={this.onSignUp}>Sign Up</button>
          </form>
          {
            (signUpError) ?(
              <p>{signUpError}</p>
            ) :(null)
          } 
      
        </div>
       
      </div>
      
      
      );
    }
    return (
      <div>
        <p>Already Sign In</p>
          
      </div>
      // <>
      //   <p>Counters:</p>

      //   <ul>
      //     { this.state.counters.map((counter, i) => (
      //       <li key={i}>
      //         <span>{counter.count} </span>
      //         <button onClick={() => this.incrementCounter(i)}>+</button>
      //         <button onClick={() => this.decrementCounter(i)}>-</button>
      //         <button onClick={() => this.deleteCounter(i)}>x</button>
      //       </li>
      //     )) }
      //   </ul>

      //   <button onClick={this.newCounter}>New counter</button>
      // </>
    );
  }
}

export default Home;