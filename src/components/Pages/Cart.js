import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CURRENCY } from '../../AppConfig';
import { InfoStrings } from '../../Constants';
import { AppContext } from '../../contexts/app-context';
import { formatPrice } from '../../Utils';

class Cart extends Component {
   static contextType = AppContext;
   componentDidMount(){
      window.scrollTo(0,0);
   }

   applyCoupon = (code)=>{

   }



render() {
   const {cartDetails, getCartItems,removeFromCart, addToCartById,orderId,createOrder} = this.context;
return (
<div>
   <div className="section breedcrumb">
      <div className="breedcrumb__img-wrapper">
         <img src="assets/images/banner/breedcrumb.jpg" alt="breedcrumb" />
         <div className="container">
            <ul className="breedcrumb__content">
            <li>
               <Link to="/">
               <i className="fa fa-home iconss"></i>
                     <span> {'>'} </span>
               </Link>
            </li>
            <li className="active"><span className="breadcrumb-target">Shopping Cart</span></li>
            </ul>
         </div>
      </div>
   </div>
   <section className="shoping-cart section section--xl">
      <div className="container">
         <div className="section__head justify-content-center">
            <h2 className="section--title-four font-title--sm">My Shopping Cart</h2>
         </div>
         {orderId>-1
            ?(<div className="col-lg-12" style={{textAlign:'center'}}>
                  <h2>Order created successfully.</h2>
                  <p>Order: {orderId}</p>
                  <Link to="/category">
                     Continue shopping
                  </Link>
            </div>)
            :(<div className="row shoping-cart__content">
            <div className="col-lg-8">
               <div className="cart-table">
                  <div className="table-responsive">
                     <table className="table">
                        <thead>
                           <tr>
                              <th scope="col" className="cart-table-title">Product</th>
                              <th scope="col" className="cart-table-title">Price</th>
                              <th scope="col" className="cart-table-title">quantity</th>
                              <th scope="col" className="cart-table-title">Subtotal</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              (cartDetails.totalItems>0)?(
                                 getCartItems().map((p,i)=>{
                                    const item = p[1];
                                    const d = item.product;
                                    return (
                                       <tr key={d.id}>
                                       <td className="cart-table-item align-middle">
                                          <Link
                                             to={"/product-detail/"+d.id}
                                             className="cart-table__product-item"
                                             >
                                          <div className="cart-table__product-item-img">
                                             <img
                                                src={d.image_web}
                                                alt={d.title}
                                                />
                                          </div>
                                          <h5 className="font-body--lg-400">{d.title}</h5>
                                          </Link>
                                       </td>
                                       <td className="cart-table-item order-date align-middle">
                                       {formatPrice(d.price)}
                                       </td>
                                       <td className="cart-table-item order-total align-middle">
                                          <div className="counter-btn-wrapper">
                                             <button className="counter-btn-dec counter-btn" 
                                             onClick={()=>removeFromCart(d.id, false)}>
                                             -
                                             </button>
                                             <span className="item-count-product">{item.count}</span>
                                             <button onClick={()=>addToCartById(d.id)}
                                                className="counter-btn-inc counter-btn">
                                             +
                                             </button>
                                          </div>
                                       </td>
                                       <td className="cart-table-item order-subtotal align-middle">
                                          <div className="d-flex justify-content-between align-items-center">
                                             <p className="font-body--md-500">{formatPrice(d.price*item.count)}</p>
                                             <button className="delete-item" onClick={()=>removeFromCart(d.id, true)}>
                                             <i className="fa fa-trash"></i>
                                             </button>
                                          </div>
                                       </td>
                                    </tr>
                                    )
                                    
                                 })) 
                                 :<tr><td colSpan="4"><h5 style={{display:'block', textAlign:'center', padding:'50px 10px'}}>{InfoStrings.CART_EMPTY}</h5></td></tr>
                           }

                           {/** 
                           <tr>
                              <td className="cart-table-item align-middle">
                                 <Link
                                    to="product-details.html"
                                    className="cart-table__product-item"
                                    >
                                 <div className="cart-table__product-item-img">
                                    <img
                                       src="assets/images/products/img-02.png"
                                       alt="product"
                                       />
                                 </div>
                                 <h5 className="font-body--lg-400">Fresh Orrange</h5>
                                 </Link>
                              </td>
                              <td className="cart-table-item order-date align-middle">
                                 $14.00
                              </td>
                              <td className="cart-table-item order-total align-middle">
                                 <div className="counter-btn-wrapper">
                                    <button
                                       className="counter-btn-dec counter-btn"
                                       >
                                    -
                                    </button>
                                    <input
                                       type="number"
                                       id="counter-btn-counter"
                                       className="counter-btn-counter"
                                       min="0"
                                       max="1000"
                                       placeholder="0"
                                       />
                                    <button
                                       className="counter-btn-inc counter-btn"
                                       >
                                    +
                                    </button>
                                 </div>
                              </td>
                              <td className="cart-table-item order-subtotal align-middle">
                                 <div
                                    className="
                                    d-flex
                                    justify-content-between
                                    align-items-center
                                    "
                                    >
                                    <p className="font-body--md-500">$70.00</p>
                                    <button className="delete-item">
                                    <i className="fa fa iconsss">x</i>
                                    </button>
                                 </div>
                              </td>
                           </tr>
                           */}
                        </tbody>
                     </table>
                  </div>
                 
               </div>
               {/** IMMIDIATE TODO: add code for mobile */}
               <div className="shoping-cart__mobile">
               {
                  (cartDetails.totalItems>0)?(
                     getCartItems().map((p,i)=>{
                        const item = p[1];
                        const d = item.product;
                        return (
                        <div key={d.id+"_"+i} className="shoping-card">
                           <Link to="">
                           <div className="shoping-card__img-wrapper">
                              <img src={d.image_web} alt={d.title}/>
                           </div>
                           <h5 className="shoping-card__product-caption font-body--lg-400">{d.title}</h5>
                           </Link>
                           <h6 className="shoping-card__product-price font-body--lg-400">{CURRENCY + d.srp}</h6>
                           <div className="counter-btn-wrapper">
                              <button className="counter-btn-dec counter-btn" 
                                 onClick={()=>removeFromCart(d.id, false)}>-</button>
                              <span className="item-count-product">{item.count}</span>
                              <button onClick={()=>addToCartById(d.id)}
                                 className="counter-btn-inc counter-btn">+</button>
                           </div>
                           <h6 className="shoping-card__product-totalprice font-body--lg-600">
                              {formatPrice(d.price*item.count)}
                           </h6>
                           <button className="close-btn" onClick={()=>removeFromCart(d.id, true)}>
                              <i className="fa fa-trash"></i>
                           </button>
                        </div>)
                     }))
                     :<h5 style={{display:'table-cell', textAlign:'center', maxWidth:'200px', padding:'50px 10px'}}>{InfoStrings.CART_EMPTY}</h5>  
               }
                  {/**
                  <div className="shoping-card">
                     <div className="shoping-card__img-wrapper">
                        <img
                           src="assets/images/products/img-02.png"
                           alt="product-item"
                           />
                     </div>
                     <h5 className="shoping-card__product-caption font-body--lg-400">
                        Fresh orange
                     </h5>
                     <h6 className="shoping-card__product-price font-body--lg-400">
                        $45.00
                     </h6>
                     <div className="counter-btn-wrapper">
                        <button className="counter-btn-dec counter-btn">
                        -
                        </button>
                        <input
                           type="number"
                           id="counter-btn-counter"
                           className="counter-btn-counter"
                           min="0"
                           max="1000"
                           placeholder="0"
                           />
                        <button className="counter-btn-inc counter-btn">
                        +
                        </button>
                     </div>
                     <h6 className="shoping-card__product-totalprice font-body--lg-600">
                        $225.00
                     </h6>
                     <button className="close-btn">
                     <i className="fa fa iconsss">x</i>
                     </button>
                  </div>
                  */}
                  <div>
                     <div className="cart-table-action-btn d-flex">
                        <Link
                           to="/category"
                           className="button button--md button--disable shop"
                        >
                           Return to Shop
                        </Link>
                        {/*
                        <Link to="#" className="button button--md button--disable update">
                           Update to Cart
                        </Link>
                        */}
                     </div>
                  </div>
               </div>
               {/* add class: coupon-applied */}
               <div className="newsletter-card coupon-box">
                  <h5 className="newsletter-card-title font-body--xxl-500">
                     Coupon Code
                  </h5>
                  <form action="#">
                     <div className="newsletter-card__input">
                        <input type="text" placeholder="Enter Code" maxLength={30}/>
                        <div className="coupon-info">
                           <p>Coupon Applied</p>
                           <h3>CUP100 <sup> Discount 10% upto Rs 1500</sup></h3>
                        </div>
                        <button className="button button--lg" type="submit">
                        Apply
                        </button>
                     </div>
                  </form>
               </div>
            </div>
            <div className="col-lg-4">
               <div className="bill-card">
                  <div className="bill-card__content">
                     <div className="bill-card__header">
                        <h2 className="bill-card__header-title font-body--xxl-500">
                           Order Summery
                        </h2>
                     </div>
                     <div className="bill-card__body">
                        <div className="bill-card__memo">
                           <div className="bill-card__memo-item subtotal">
                              <p className="font-body--md-400">Total MRP:</p>
                              <span className="font-body--md-500">{CURRENCY+cartDetails.totalAmt}</span>
                           </div>
                           <div className="bill-card__memo-item total">
                              <p className="font-body--lg-400">Discount:</p>
                              <span className="font-body--xl-500">{CURRENCY+cartDetails.discount_amt}</span>
                           </div>
                           <div className="bill-card__memo-item total">
                              <p className="font-body--lg-400">Coupon Discount:</p>
                              <span className="font-body--xl-500">{CURRENCY+cartDetails.couponAmount}</span>
                           </div>
                           <div className="bill-card__memo-item shipping">
                              <p className="font-body--md-400">Shipping:</p>
                              <span className="font-body--md-500">{CURRENCY+cartDetails.shipping_amt}</span>
                           </div>
                           <div className="bill-card__memo-item total">
                              <p className="font-body--lg-400">Total:</p>
                              <span className="font-body--xl-500">{CURRENCY+cartDetails.subtotal}</span>
                           </div>
                        </div>
                        <div action="#">
                           <button className="button button--lg w-100"
                              onClick={()=>{createOrder()}}
                              >
                           Raise Request
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>)
         }


         
      </div>
   </section>
</div>
);
}
}
export default Cart;