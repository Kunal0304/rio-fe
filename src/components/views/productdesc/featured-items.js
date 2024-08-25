import { Component } from "react";
import StartRatings from "../misc/StartRatings";
import Slider from "react-slick";
import { formatPrice } from "../../../Utils";
import { Link } from "react-router-dom";



export class FeaturedItems extends Component{
    render(){ 
        this.products = this.props.productList || [];
        this.products?.map((d,i)=>{
            d.sp = Math.floor((1-d.price/d.mrp_price) * 100);
            return d;
        })

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            initialSlide: 0,
            prevArrow: false,
            nextArrow: false,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
        <section className="section section--xl related pt-0">
        <div className="container">
            <div className="section__head justify-content-center">
                <h2 className="section--title-four font-title--sm">BEST DEALS</h2>
            </div>
            <div className="swiper-container featured-slider--one">
                <div className="swiper-wrapper">
                    <Slider {...settings}>
                        {
                            this.products?.map((d,i)=>{
                                return (
                                    <div key={d.id} className="swiper-slide">
                                        <div className="cards-md w-100">
                                            <div className="cards-md__img-wrapper">
                                                <Link to={{pathname:"/product-detail/"+d.id, pid:d.id }}>
                                                    <img src={d.image_web} alt={d.title} />
                                                </Link>
                                                <span className="tag danger font-body--md-400" style={{display:(!isNaN(d.sp) && d.sp>50)}}>Sale {d.sp}%</span>
                                                <div className="cards-md__favs-list">
                                            <span className="action-btn">
                                                <i className="fa fa-heart"></i>
                                            </span>
                                            <span className="action-btn" data-bs-toggle="modal" data-bs-target="#productView">
                                                <i className="fa fa-eye"></i>
                                            </span>
                                        </div>
                                            </div>
                                            <div className="cards-md__info d-flex justify-content-between align-items-center">
                                                <a href="product-details.html" className="cards-md__info-left">
                                                    <h6 className="font-body--md-400">{d.title}</h6>
                                                    <div className="cards-md__info-price">
                                                        <span className="font-body--lg-500">{formatPrice(d.mrp_price)}</span>
                                                        <del className="font-body--lg-400">{formatPrice(d.price)}</del>
                                                    </div>
                                                    <StartRatings />
                                                </a>
                                                <div className="cards-md__info-right text-center">
                                            <p className="text-black">Add to Cart</p>
                                            <span className="action-btn">
                                                <i className="fa fa-shopping-bag bags"></i>
                                            </span>
                                        </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        
                        
                        /**
                        <div className="swiper-slide">
                            <div className="cards-md w-100">
                                <div className="cards-md__img-wrapper">
                                    <a href="product-details.html">
                                        <img src="assets/images/products/img-01.png" alt="products" />
                                    </a>
                                    
                                    <div className="cards-md__favs-list">
                                <span className="action-btn">
                                    <i className="fa fa-heart"></i>
                                </span>
                                <span className="action-btn" data-bs-toggle="modal" data-bs-target="#productView">
                                    <i className="fa fa-eye"></i>
                                </span>
                            </div>
                                </div>
                                <div className="cards-md__info d-flex justify-content-between align-items-center">
                                    <a href="product-details.html" className="cards-md__info-left">
                                        <h6 className="font-body--md-400">Dummy</h6>
                                        <div className="cards-md__info-price">
                                            <span className="font-body--lg-500">$14.99</span>
                                            <del className="font-body--lg-400">$14.99</del>
                                        </div>
                                        <ul className="cards-md__info-rating d-flex">
                                    <li>
                                        <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-smalls"></i>
                                    </li>
                                </ul>
                                    </a>
                                    <div className="cards-md__info-right text-center">
                                <p className="text-black">Add to Cart</p>
                                <span className="action-btn">
                                    <i className="fa fa-shopping-bag bags"></i>
                                </span>
                            </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="cards-md w-100">
                                <div className="cards-md__img-wrapper">
                                    <a href="product-details.html">
                                        <img src="assets/images/products/img-03.png" alt="products" />
                                    </a>
                                    
                                    <div className="cards-md__favs-list">
                                <span className="action-btn">
                                    <i className="fa fa-heart"></i>
                                </span>
                                <span className="action-btn" data-bs-toggle="modal" data-bs-target="#productView">
                                    <i className="fa fa-eye"></i>
                                </span>
                            </div>
                                </div>
                                <div className="cards-md__info d-flex justify-content-between align-items-center">
                                    <a href="product-details.html" className="cards-md__info-left">
                                        <h6 className="font-body--md-400">Dummy</h6>
                                        <div className="cards-md__info-price">
                                            <span className="font-body--lg-500">$14.99</span>
                                            <del className="font-body--lg-400">$14.99</del>
                                        </div>
                                        <ul className="cards-md__info-rating d-flex">
                                    <li>
                                        <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-smalls"></i>
                                    </li>
                                </ul>
                                    </a>
                                <div className="cards-md__info-right text-center">
                                <p className="text-black">Add to Cart</p>
                                <span className="action-btn">
                                    <i className="fa fa-shopping-bag bags"></i>
                                </span>
                            </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="cards-md w-100">
                                <div className="cards-md__img-wrapper">
                                    <a href="product-details.html">
                                        <img src="assets/images/products/img-04.png" alt="products" />
                                    </a>
                                    
                                    <div className="cards-md__favs-list">
                                <span className="action-btn">
                                    <i className="fa fa-heart"></i>
                                </span>
                                <span className="action-btn" data-bs-toggle="modal" data-bs-target="#productView">
                                    <i className="fa fa-eye"></i>
                                </span>
                            </div>
                                </div>
                                <div className="cards-md__info d-flex justify-content-between align-items-center">
                                    <a href="product-details.html" className="cards-md__info-left">
                                        <h6 className="font-body--md-400">Dummy</h6>
                                        <div className="cards-md__info-price">
                                            <span className="font-body--lg-500">$14.99</span>
                                            <del className="font-body--lg-400">$14.99</del>
                                        </div>
                                        <ul className="cards-md__info-rating d-flex">
                                    <li>
                                        <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-smalls"></i>
                                    </li>
                                </ul>
                                    </a>
                                    <div className="cards-md__info-right text-center">
                                <p className="text-black">Add to Cart</p>
                                <span className="action-btn">
                                    <i className="fa fa-shopping-bag bags"></i>
                                </span>
                            </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="cards-md w-100">
                                <div className="cards-md__img-wrapper">
                                    <a href="product-details.html">
                                        <img src="assets/images/products/img-05.png" alt="products" />
                                    </a>
                                    
                                    <div className="cards-md__favs-list">
                                <span className="action-btn">
                                    <i className="fa fa-heart"></i>
                                </span>
                                <span className="action-btn" data-bs-toggle="modal" data-bs-target="#productView">
                                    <i className="fa fa-eye"></i>
                                </span>
                            </div>
                                </div>
                                <div className="cards-md__info d-flex justify-content-between align-items-center">
                                    <a href="product-details.html" className="cards-md__info-left">
                                        <h6 className="font-body--md-400">Dummy</h6>
                                        <div className="cards-md__info-price">
                                            <span className="font-body--lg-500">$14.99</span>
                                            <del className="font-body--lg-400">$14.99</del>
                                        </div>
                                        <ul className="cards-md__info-rating d-flex">
                                    <li>
                                        <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-smalls"></i>
                                    </li>
                                </ul>
                                    </a>
                                    <div className="cards-md__info-right text-center">
                                <p className="text-black">Add to Cart</p>
                                <span className="action-btn">
                                    <i className="fa fa-shopping-bag bags"></i>
                                </span>
                            </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="cards-md w-100">
                                <div className="cards-md__img-wrapper">
                                    <a href="product-details.html">
                                        <img src="assets/images/products/img-06.png" alt="products" />
                                    </a>
                                    
                                    <div className="cards-md__favs-list">
                                <span className="action-btn">
                                    <i className="fa fa-heart"></i>
                                </span>
                                <span className="action-btn" data-bs-toggle="modal" data-bs-target="#productView">
                                    <i className="fa fa-eye"></i>
                                </span>
                            </div>
                                </div>
                                <div className="cards-md__info d-flex justify-content-between align-items-center">
                                    <a href="product-details.html" className="cards-md__info-left">
                                        <h6 className="font-body--md-400">Dummy</h6>
                                        <div className="cards-md__info-price">
                                            <span className="font-body--lg-500">$14.99</span>
                                            <del className="font-body--lg-400">$14.99</del>
                                        </div>
                                        <ul className="cards-md__info-rating d-flex">
                                    <li>
                                        <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-small"></i>
                                    </li>
                                    <li>
                                    <i className="fa fa-star star-smalls"></i>
                                    </li>
                                </ul>
                                    </a>
                                <div className="cards-md__info-right text-center">
                                <p className="text-black">Add to Cart</p>
                                <span className="action-btn">
                                    <i className="fa fa-shopping-bag bags"></i>
                                </span>
                            </div>
                                </div>
                            </div>
                        </div>
                        */
                    }
                    </Slider>
                </div>
                <div className="swiper-pagination featured-pagination"></div>
            </div>
        </div>
        </section>
        )
        }
}