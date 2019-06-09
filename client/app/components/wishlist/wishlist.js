import React, { Component } from 'react'
import DataService from '../../services/data_service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../../services/notification_service'
import ProductCondensed from '../product-condensed/product-condensed'

import {
    getFromStorage,
  } from '../../utils/storage'

let ns = new NotificationService();

class WishList extends Component {

    constructor(props) {
        super(props);
        this.state = {wishList: []}
        this.createWishList = this.createWishList.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    
    }

    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED,this,this.onWishListChanged)
    }

    componentWillUnmount(){
        ns.removeObserver(this,NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList){
        this.setState({wishList:newWishList})
    }

    createWishList () {
        const list = this.state.wishList.map((product) =>
            <ProductCondensed product={product} key={product._id} />
        );

        return (list);
    }

    onButtonClicked (){

        const obj = getFromStorage('the_main_app');
        const productsid = [];
        const today = new Date();
        const list = this.state.wishList.map((product) =>{
            productsid.push(product._id);
        }            
        );
        
        fetch('http://localhost:3003/order/',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({     
                orderEmail:obj.email,
                orderProduct:productsid,
                orderDate:today.getDate(),                
            })
          })
          .then(res => res.json())
          .then(json=>{
            if(json.success){ // sign in success         
                this.setState({wishList:[]})
      
            }else{
              
            }
          });

        // if (this.state.onWishList){
        //     ds.removeWishListItem(this.props.product);
        // }else{
        //     ds.addWishListItem(this.props.product)
        // }
        
    }

    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Cart</h4>
                    <ul className="list-group">
                        {this.createWishList()}
                    </ul>
                    <button className="btn btn-danger col-12" onClick={()=>this.onButtonClicked()}>Checkout</button>
                </div>
            </div>
        );
    }
}

export default WishList;