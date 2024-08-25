import { Component } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../contexts/app-context";
import { formatPrice } from "../../../Utils";

export default class HeaderCart extends Component{

    static contextType = AppContext;

    componentDidMount(){
       // console.log("Header cart is mounted");
    }

    render(){
        const {cartDetails, wishListHasItems} = this.context;
        return (
            <div className="header__cart">
                <div className="header__cart-item text-center">
                    <Link className="fav" to="/wishlist">
                        <p className="text-black">Wishlist</p>
                        <span className={((wishListHasItems())?"item-in-wishlist ":"") + "action-btn"}>
                            <i className="fa fa-heart"></i>
                        </span>
                    </Link>
                </div>
                <div className="header__cart-item" onClick={()=>{this.props.toggleCart()}}>
                    <div className="header__cart-item-content">
                        {/**
                        <Link to="/cart">
                            <button className="cart-bag">
                            <img src="" alt=""></img>
                                <span className="item-number">{cartDetails.totalItems}</span>
                            </button>
                        </Link>cl
                         */}
                        <button className="cart-bag">
                                <i className="fa fa-shopping-bag fa-2x bags"></i>
                                <span className="item-number">{cartDetails.totalItems}</span>
                            </button>
                        <div className="header__cart-item-content-info">
                            <h5>Shopping cart:</h5>
                            <span className="price">{ formatPrice(cartDetails.subtotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}