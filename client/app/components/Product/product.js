import React, { Component } from 'react';
import ProductItem from '../ProductItem/productItem';
import 'whatwg-fetch';
import WishList from '../wishlist/wishlist'

class Product extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.productList = this.productList.bind(this);
        this.state = {
            products:[]
        };

        this.loadData();
        
        
    }

    loadData(){
        fetch('http://localhost:3001/product')
        .then(res => res.json())
        .then(json => {
            if(json.success){         
                this.setState({
                    products:json.data.products,               
                });
            }
            else{
                console.log("product fetch fail");
            }
        });    
    }

    componentDidMount() {        
        
    }

    productList() {
        const list=  this.state.products.map((product) =>
            <div className="col-sm-4" key={product._id}>
                <ProductItem product={product}/>
            </div>           
        );
        return (list);
           
    }

    render(){
        return(
           // <p>example</p>
        <div>
            <div className="container-fluid App-main">
                    <div className="row  m-3">

                      <div className="col-sm-8 "> 
                      <div className="row">
                        {this.productList()}
                      </div>
                      </div>

                      <div className="col-sm-4"> 
                        <WishList/>
                      </div>
                      
                    </div>
                </div>
        </div>
        )
    }
}

export default Product;
