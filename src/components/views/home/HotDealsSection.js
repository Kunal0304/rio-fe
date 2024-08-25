import { Link } from "react-router-dom";
import { UserType } from "../../../Constants";
import StartRatings from "../misc/StartRatings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCardView from "../misc/product-cardview";
import BaseAppComponent from "../../base-app-component";
import { formatPrice } from "../../../Utils";

const sliderConfig = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
};


export default class HotDealsSection extends BaseAppComponent{

    constructor(props){
        super(props)
        this.userType = props.user?.registerAs || UserType.UNREGISTERED;
        
        //console.log("productList", this.props.productList, this.products)
        /*
        for(let i=1; i<=15; i++){
            let mrp = 300 + Math.round(Math.random()*300),
            srp = mrp - Math.round(Math.random()*200)
           let p = {
                "id": 3 + i,
                "title": `Sample Product ${i}`,
                "image_web": "https://rentals3.s3.me-south-1.amazonaws.com/images/website_en_10034229551649908437.png",
                "wholeseller_mrp_price": mrp,
                "wholeseller_price": srp,
                "wholeseller_discount": 0,
                "retailer_price": srp,
                "retailer_mrp_price": mrp,
                "retailer_discount": 0
            }
            this.products.push(p)
        }
        */

    }

    componentDidMount(){
        //console.log("Hot deals mounted");
    }

    render(){

        this.products = [...this.props.productList];
        this.products?.map((d,i)=>{
            d.sp = Math.floor((1-(d.price/d.mrp_price)) * 100);
            return d;
        })
        
        this.products?.sort((a,b)=>{
            return (a.sp<b.sp)?1:-1;
        })
        if(this.products && this.products.length>12)this.products = this.products.slice(0,12);


        const gridItemClass = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
        const {addToCart, isInCart} = this.context;
        return (
            <section className="deals section--gray section--lg">
            <div className="container">
                <div className="section__head">
                    <h2 className="section--title-one font-title--sm">Hot Deals</h2>
                    <Link to="/category">
                        View All
                        <span>
                            <i className="fa fa-arrow-right"></i>
                        </span>
                    </Link>
                </div>

                <div className="deals-products__wrapper">
                {
                    this.products.map((d,i)=>{
                        const isFav = this.itemInWishList(d.id)
                        if(i===0){
                            /** large thumbnail, 1st item */
                            return (
                                <div key={i} className={"cards-lg deals-products__wrapper-item deals-products__wrapper-item--"+gridItemClass[i]}>
                                    <div className="cards-lg__img-wrapper">
                                        <Link to={{pathname:"/product-detail/"+d.id, pid:d.id }}>
                                            <img src={d.image_web} alt={d.title} />
                                        </Link>
                                        <div className="tag-group">
                                            <span className="tag danger">Sale {d.sp}%</span>
                                            <span className="tag blue">Best Sale</span>
                                        </div>
                                        <div action="#">
                                            <div className="cards-lg__group-action">
                                                <button className={"action-btn" + (isFav?" item-in-wishlist":"")} onClick={()=>{(!isFav)?this.addToWishList(d):this.removeFromWishlist(d)}}>
                                                    <i className="fa fa-heart"></i>
                                                </button>
                                                <div className="counter-btn-wrapper products__content-action-item" style={{width:'40%', minWidth:'125px', display:isInCart(d.id)?'':'none'}}>
                                                    {/** */}
                                                    <button onClick={()=>{this.removeFromCart(d.id, false)}} 
                                                        className="counter-btn-dec counter-btn">
                                                        -
                                                    </button>
                                                    {/** */}
                                                    <input readOnly value={this.cartItemCountByPid(d.id)} 
                                                    type="number" id="counter-btn-counter"
                                                    className="counter-btn-counter" 
                                                    style={{background:'transparent', color:'#fff', fontWeight:'700'}}
                                                    min="0" max="1000" placeholder="0" />
                                                    {/**  */}
                                                    <button onClick={()=>{this.addToCartById(d.id)}}
                                                        className="counter-btn-inc counter-btn">
                                                        +
                                                    </button>
                                                </div>

                                                <button onClick={()=>addToCart(d)} className={"button button--md w-75" + (isInCart(d.id)?" hide":"")}>
                                                    Add to cart
                                                    <span>
                                                        <i className="fa fa-shopping-bag bagss"></i>
                                                    </span>
                                                </button>
                                                
                                                <button className="action-btn" onClick={()=>{this.openProductPreview(d.id)}}>
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="cards-lg__info text-center">
                                        <h6 className="font-body--xl-400">{d.title}</h6>
                                        <div className="cards-lg__info-price">
                                            <span className="font-body--xxxl-500">{formatPrice(d.price)}</span>
                                            <del className="font-body--xxxl-400">{formatPrice(d.mrp_price)}</del>
                                        </div>
                                        <StartRatings 
                                            showToast={this.showToast} 
                                            pid={d.id} 
                                            addRatings={this.addRatings} 
                                        />
                                        <div className="cards-lg__info-countdown">
                                            <h5 style={{color:'red'}} className="font-body--md-400">Limited time deal!</h5>
                                            <h6 className="font-body--md-400">Hurry up! Order before the offer ends.</h6>
                                            <div id="countdownOne" className="info-countdown__card"></div>
                                        </div>
                                    </div>
                                </div>
                            )

                        }else{
                            /** small thumbnails, other items */
                            return (

                                <ProductCardView
                                    key={i}
                                    inCart={this.itemInCart(d.id)}
                                    addCart={this.addToCart} 
                                    isUserLoggedIn={this.isUserLoggedIn}
                                    data={d} 
                                    showPreview={this.openProductPreview}
                                    isFav={this.itemInWishList(d.id)}
                                    addToFav={this.addToWishList}
                                    removeFromFav={this.removeFromWishlist}
                                    addRatings={this.addRatings}
                                    showToast={this.showToast}
                                    removeFromCart={this.removeFromCart}
                                    cartItemCountByPid={this.cartItemCountByPid}
                                    addToCartById={this.addToCartById}
                                    addClass={"deals-products__wrapper-item deals-products__wrapper-item--"+gridItemClass[i]}
                                />

                            )

                        }
                    })
                }
                </div>
                {/** mobile view */}
                <Slider className="popular-categories--slider" {...sliderConfig}>
                    {
                        this.products.map((d,i)=>{
                            const isFav = this.itemInWishList(d.id)
                            return (
                                <div key={i} className="swiper-slide">
                                    <div className="cards-md">
                                        <div className="cards-md__img-wrapper">
                                            <Link to={{pathname:"/product-detail/"+d.id, pid:d.id }}>
                                                <img src={d.image_web} alt={d.title} />
                                            </Link>
                                            <span className="tag danger font-body--md-400">Sale {d.sp}%</span>
                                            <div className="cards-md__favs-list">
                                                <button className={"action-btn" + (isFav?" item-in-wishlist":"")} onClick={()=>{(!isFav)?this.addToWishList(d):this.removeFromWishlist(d)}}>
                                                    <i className="fa fa-heart"></i>
                                                </button>
                                                <button className="action-btn" onClick={()=>{this.openProductPreview(d.id)}}>
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cards-md__info d-flex justify-content-between align-items-center">
                                            <a href="product-details.html" className="cards-md__info-left">
                                                <h6 className="font-body--md-400">{d.title}</h6>
                                                <div className="cards-md__info-price">
                                                    <span className="font-body--lg-500">{formatPrice(d.price)}</span>
                                                    <del className="font-body--lg-400">{formatPrice(d.mrp_price)}</del>
                                                </div>
                                                <StartRatings 
                                                    showToast={this.showToast} 
                                                    pid={d.id} 
                                                    addRatings={this.addRatings} 
                                                />
                                            </a>
                                            <div onClick={()=>addToCart(d)} className="cards-md__info-right text-center">
                                                <p className="text-black">Add to Cart</p>
                                                <span className={"action-btn" + (isInCart(d.id)?" item-in-cart":"")} >
                                                    <i className="fa fa-shopping-bag bags"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </section>
        )
    }



}