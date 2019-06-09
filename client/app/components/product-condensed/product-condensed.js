import React , {Component} from 'react'
import DataService from '../../services/data_service'

let ds = new DataService();

class ProductCondensed extends Component {
    constructor(props) {
        super(props);
        
        this.deleteWishListItem = this.deleteWishListItem.bind(this);   
    }
    deleteWishListItem(){
        ds.removeWishListItem(this.props.product);
    }

    render(){
        return(
            
            <li className="list-group-item pc-condensed">
                <a  className="btn btn-outline-danger m-3" onClick={()=>this.deleteWishListItem()}>x</a>
                <span>{this.props.product.title} | <b>{this.props.product.price}</b> </span>              
            </li>
        );
    }
}

export default ProductCondensed;