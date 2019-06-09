import React , {Component} from 'react'
import './ProductItem.css';
import DataService from '../../services/data_service'
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../../services/notification_service'

let ds = new DataService();
let ns = new NotificationService();

class ProductItem extends Component {

    constructor(props){
        super(props);

        this.state = {onWishList:ds.itemOnWishList()};
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);

    }

    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED,this,this.onWishListChanged)
    }

    componentWillUnmount(){
        ns.removeObserver(this,NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList){
        this.setState({onWishList:ds.itemOnWishList(this.props.product)});
    }

    onButtonClicked (){
        if (this.state.onWishList){
            ds.removeWishListItem(this.props.product);
        }else{
            ds.addWishListItem(this.props.product)
        }
        
    }

    render(){
        const imgStyle={
            height:'300px',
            padding:'50px'
        }

        var btnClass;

        if(this.state.onWishList){
            btnClass ="btn btn-danger col-12";
        }else{
            btnClass ="btn btn-primary  col-12";
        }
        return(
            <div className="card product">
                <img src={this.props.product.imgUrl} className="card-img-top img-thumbnail" style={imgStyle} alt="Product" />
                <div className="card-block">
                    <h4 className="card-title ">{this.props.product.title} </h4>
                    <p className="card-text ">Price: ${this.props.product.price}</p>
                    <a href="#"  className={btnClass} onClick={()=>this.onButtonClicked()}>
                    {this.state.onWishList ? "Remove from Cart" : "Add to Cart"}</a>
                </div>
            </div>
        );
    }
}

export default ProductItem;