import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    getFromStorage,
    setInStorage
  } from '../../utils/storage'

import 'whatwg-fetch';

class OrderList extends Component {
    constructor(props) {
        super(props);
        // this.loadData = this.loadData.bind(this);
        this.orderList = this.orderList.bind(this);
        this.state = {
            orders:[]
        };

        // this.loadData();
       
        
    }

    componentDidMount() {        
        const obj = getFromStorage('the_main_app');
        if(obj && obj.email){
             // read user data
     
            fetch('http://localhost:3003/orders/'+ obj.email)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.setState({
                        orders:json.order,                                                                         
                    });                    
                }
                else{
                    console.log("user fetch fail");
                }
            });
        }
    }

  
    orderList() {
        const list=  this.state.orders.map((order) =>
            <div className="col-sm-4" key={order._id}>
                <p>{order._id}</p>
                

                <p>{order.orderProduct}</p>
                <p>{order.orderStatus}</p>
                <p>{order.orderEmail}</p>
                <p>{order.orderDate}</p>
            </div>           
        );
        return (list);
           
    }
    


    render(){
        return(
           // <p>example</p>
      
        <div className="container App-main ">   
               {this.orderList()}
        </div>
        )
    }
}

export default OrderList;
