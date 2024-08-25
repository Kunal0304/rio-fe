import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/app-context';
import { formatPrice } from '../../Utils';

class WishList extends Component {
    static contextType = AppContext;

    moveTocart=(p)=>{
        this.context.removeFromWishlist(p);
        this.context.addToCart(p)
    }

    render() {

        const {getWishListItems, removeFromWishlist} = this.context;
        const wishListItems = getWishListItems() || [];

        return (
            <div>
                <div className="section breedcrumb">
                    <div className="breedcrumb__img-wrapper">
                        <img src="assets/images/banner/breedcrumb.jpg" alt="breedcrumb" />
                        <div className="container">
                        <ul className="breedcrumb__content">
                            <li>
                            <Link to="index.html">
                            <i className="fa fa-home iconss"></i>
                                <span> {'>'} </span>
                            </Link>
                            </li>
                            <li className="active"><Link to="wishlist.html">Wishlist</Link></li>
                        </ul>
                        </div>
                    </div>
                </div>
                <section className="shoping-cart section section--xl">
                    <div className="container">
                        <div className="section__head justify-content-center">
                        <h2 className="section--title-four font-title--sm">My Wishlist</h2>
                        </div>
                        <div className="shoping-cart__content">
                        <div className="cart-table">
                            <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col" className="cart-table-title">Product</th>
                                    <th scope="col" className="cart-table-title">Price</th>
                                    {/*<th scope="col" className="cart-table-title">Stock Status</th>*/}
                                    <th scope="col" className="cart-table-title"></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        wishListItems.map((p,i)=>{
                                            const d = p[1];
                                            return (
                                                
                                                <tr key={i}>
                                                    <td className="cart-table-item align-middle">
                                                    <Link to="product-details.html" className="cart-table__product-item">
                                                        <div className="cart-table__product-item-img">
                                                            <img src={d.image_web} alt={d.title}/>
                                                        </div>
                                                        <h5 className="font-body--lg-400">{d.title}</h5>
                                                    </Link>
                                                    </td>
                                                    <td className="cart-table-item order-date align-middle">
                                                    <p className="font-body--lg-500">{formatPrice(d.price)} <del>{formatPrice(d.mrp_price)}</del></p>
                                                    </td>
                                                    {/*
                                                    <td className="cart-table-item stock-status align-middle">
                                                    <span className="font-body--md-400 in"> in Stock</span>
                                                    </td>
                                                    */}
                                                    <td className="cart-table-item add-cart align-middle">
                                                    <div className="add-cart__wrapper">
                                                        <button className="button button--md" onClick={()=>{this.moveTocart(d)}} >Add to Cart</button>
                                                        <button className="delete-item" onClick={()=>{removeFromWishlist(d.id)}} >
                                                            <i className="fa fa-trash bags" aria-hidden="true" ></i>
                                                        </button>
                                                    </div>
                                                    </td>
                                                </tr>


                                            )
                                        })


                                    }
                                

                                </tbody>
                            </table>
                            </div>

                            <div className="cart-table__share-content d-flex align-items-center">
                            <span
                                className="font-body--md-400">Share:
                            </span>
                            <ul className="newsletter__social-icon">
                                            <li>
                                                <Link to="#">
                                                <i className="fa fa-facebook socialico"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                <i className="fa fa-twitter socialico"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fa fa-pinterest socialico"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fa fa-instagram socialico"></i>
                                                </Link>
                                            </li>
                                        </ul>
                            </div>
                        </div>
                        <div className="shoping-cart__mobile">

                            {
                                wishListItems.map((p,i)=>{
                                    const d = p[1];
                                    return (

                                        <div className="shoping-card" key={i}>
                                            <div className="shoping-card__img-wrapper">
                                                <img src={d.image_web} alt={d.title}/>
                                            </div>
                                            <h5 className="shoping-card__product-caption font-body--lg-400">
                                                {d.title}
                                                
                                            </h5>
                                            <h6 className="shoping-card__product-price font-body--lg-600">
                                            <span className="sale-percent" style={{display:(d.mrp_price>0)?'':'none'}}>-{((d.mrp_price-d.price)/d.mrp_price)*100}%</span>
                                                {formatPrice(d.price)} <sup >00</sup> <del>{formatPrice(d.mrp_price)}</del>
                                            </h6>

                                            <button className="button button--md" onClick={()=>{this.moveTocart(d)}} >Add to Cart</button>
                                            <button className="close-btn" onClick={()=>{removeFromWishlist(d.id)}} >
                                                <i className="fa fa-trash bags" aria-hidden="true" ></i>
                                            </button>
                                            </div>


                                    )
                                })
                            }
                            

                            
                            <div className="cart-table__share-content d-flex align-items-center">
                            <span
                                className="font-body--md-400">Share:
                            </span>
                            <ul className="newsletter__social-icon">
                                            <li>
                                                <Link to="#">
                                                <i className="fa fa-facebook socialico"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                <i className="fa fa-twitter socialico"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fa fa-pinterest socialico"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fa fa-instagram socialico"></i>
                                                </Link>
                                            </li>
                                        </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                 </section>
            </div>
        );
    }
}

export default WishList;



                              /*
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
                                    <p className="font-body--lg-500">$14.99 <del>20.99</del></p>
                                    </td>
                                    <td className="cart-table-item stock-status align-middle">
                                    <span className="font-body--md-400 in"> in Stock</span>
                                    </td>
                                    <td className="cart-table-item add-cart align-middle">
                                    <div className="add-cart__wrapper">
                                        <button className="button button--md">Add to Cart</button>
                                        <button className="delete-item">
                                        <i className="fa fa-octagon-xmark bags">X</i>
                                        </button>
                                    </div>
                                    </td>
                                </tr>
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
                                    <p className="font-body--lg-500">$14.99 <del>20.99</del></p>
                                    </td>
                                    <td className="cart-table-item stock-status align-middle">
                                    <span className="font-body--md-400 out"> out of stock</span>
                                    </td>
                                    <td className="cart-table-item add-cart align-middle">
                                    <div className="add-cart__wrapper">
                                        <button className="button button--md button--disable">
                                        Add to Cart
                                        </button>
                                        <button className="delete-item">
                                        <i className="fa fa-octagon-xmark bags">X</i>
                                        </button>
                                    </div>
                                    </td>
                                </tr>



<div className="shoping-card">
                            <div className="shoping-card__img-wrapper">
                                <img src="assets/images/products/img-02.png" alt="product-item" />
                            </div>
                            <h5 className="shoping-card__product-caption font-body--lg-400">
                                Rio Lock

                                <span className="tag tag--in">In Stock</span>
                            </h5>

                            <h6 className="shoping-card__product-price font-body--lg-600">
                                $45.00
                                <del className="prev-price">$20.99</del>
                            </h6>

                            <button className="button button--md">Add to Cart</button>
                            <button className="close-btn">
                                <i className="fa fa-octagon-xmark bags">X</i>
                            </button>
                            </div>
                            <div className="shoping-card">
                            <div className="shoping-card__img-wrapper">
                                <img src="assets/images/products/img-03.png" alt="product-item" />
                            </div>
                            <h5 className="shoping-card__product-caption font-body--lg-400">
                            Dummy

                                <span className="tag tag--out">Out of Stock</span>
                            </h5>

                            <h6 className="shoping-card__product-price font-body--lg-600">
                                $45.00
                                <del className="prev-price">$20.99</del>
                            </h6>

                            <button className="button button--md">Add to Cart</button>
                            <button className="close-btn">
                            <i className="fa fa-octagon-xmark bags">X</i>
                            </button>
                            </div>
                            */
