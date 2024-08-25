import { Component } from 'react';
import { CURRENCY } from '../../../AppConfig';
import { InfoStrings } from '../../../Constants';
import { AppContext } from '../../../contexts/app-context';
import { withRouter } from '../../../routed-component-wrapper';
import { formatPrice } from '../../../Utils';

class ShoppingCart extends Component{

    static contextType = AppContext;


    checkOut=()=>{
        this.props?.navigate("/cart");
        this.props?.toggleCart();
    }



    componenDidMount(){
        
    }
    
    render(){
        const {cartDetails, getCartItems,removeFromCart} = this.context;
        return (
            <div className="shopping-cart" style={{right:(this.props.view)?0:'-150%'}}>
            
            <div className="shopping-cart-top">
                <div className="shopping-cart-header">
                <button onClick={()=>{this.props.toggleCart()}} title='Close cart' className="cart-header-btn close-cart">
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
                <h5 className="font-body--xxl-500">Shopping Cart (<span className="count">{cartDetails.totalItems}</span>)</h5>
                    <button title='Clear cart' className="cart-header-btn" disabled={true}>
                        <i className="fa fa-trash" aria-hidden="true" onClick={()=>removeFromCart()}></i>
                    </button>
                </div>
                {
                    (cartDetails.totalItems>0)?(
                    getCartItems().map((p,i)=>{
                        const item = p[1];
                        const d = item.product;
                        return (
                            <div className="shopping-cart__product-content" key={d.id}>
                                <div className="shopping-cart__product-content-item">
                                    <div className="img-wrapper">
                                        <img src={d.image_web} alt={d.title}/>
                                    </div>
                                    <div className="text-content">
                                        <h5 className="font-body--md-400">{d.title}</h5>
                                        <p className="font-body--md-400">{item.count} x <span className="font-body--md-500">{formatPrice(d.price)}</span></p>
                                    </div>
                                </div>
                                <button title='Remove item' className="cart-header-btn delete-item">
                                    <i className="fa fa-trash" aria-hidden="true"  onClick={()=>removeFromCart(d.id, true)}></i>
                                </button>
                            </div>
                        )
                    }))
                    :<h5 className='cart-empty'>{InfoStrings.CART_EMPTY}</h5>
                }
                </div>
                {/** 
                <div className="shopping-cart__product-content">
                    <div className="shopping-cart__product-content-item">
                        <div className="img-wrapper">
                            <img src="assets/images/products/img-01.png" alt="product" />
                        </div>
                        <div className="text-content">
                            <h5 className="font-body--md-400">Fresh Indian Orange</h5>
                            <p className="font-body--md-400">1kg x <span className="font-body--md-500">12.00</span></p>
                        </div>
                    </div>
                    <button className="delete-item">
                    <i className="fa fa-octagon-xmark bags">X</i>
                    </button>
                </div>
            */}
            <div className="shopping-cart-bottom">
                <div className="shopping-cart-product-info">
                    <p className="product-count font-body--lg-400">{cartDetails.totalItems} Product{(cartDetails.totalItems>1)?"s":""}</p>
                    <span className="product-price font-body--lg-500">{CURRENCY+cartDetails.subtotal}</span>
                </div>

                    <div 
                    onClick={()=>{this.checkOut()}}
                    className="button button--lg w-100">Checkout</div>
                {/*<button className="button button--lg button--disable w-100">Go to cart</button>*/}
            </div>
        </div>
        )
    }

}

export default withRouter(ShoppingCart)