import { UserType } from "../../../Constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCardView from "../misc/product-cardview";
import BaseAppComponent from "../../base-app-component";

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows:false,
    centerMode:false,
    padSlides:true,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
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

class FeaturedProductsSection extends BaseAppComponent{

    constructor(props){
        super(props)
        this.products = [...this.props.productList]  || [];
        this.userType = props.user?.registerAs || UserType.UNREGISTERED;

        /*
        for(let i=0; i<10; i++){
            let mrp = 300 + Math.round(Math.random()*300),
            srp = mrp - Math.round(Math.random()*200)
            let p = {"id": 3,
                "title": "Test Featured Product",
                "image_web": "https://rentals3.s3.me-south-1.amazonaws.com/images/website_en_10215348181649908510.png",
                "wholeseller_price": srp,
                "wholeseller_mrp_price": mrp,
                "wholeseller_discount": 20,
                "retailer_price": srp,
                "retailer_mrp_price": mrp,
                "retailer_discount": 9
            }
            this.products.push(p)
        }
        */
        this.products.map((d,i)=>{
            d.sp = Math.floor((1-(d.price/d.mrp_price)) * 100);
            return d;
        })

    }


    render(){
        return (

            <section className="section section--lg featured pb-0">
            <div className="container">
                <div className="section__head">
                    <h2 className="section--title-one font-title--sm">Featured Products</h2>
                    <a href="shop-01.html">
                        View All
                        <span>
                            <i className="fa fa-arrow-right"></i>
                        </span>
                    </a>
                
                </div>
                <Slider {...settings}>

                    {
                        this.products.map((d,i)=>{
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
                                addClass={"w-100"}
                            />
                                    
                            )
                        })
                    }
                </Slider>
            </div>


                            {/**
                                            <div className="swiper-slide" key={i}>
                                                <div className="cards-md w-100">
                                                    <div className="cards-md__img-wrapper">
                                                    <Link to={{pathname:"/product-detail/"+d.id, pid:d.id }}>
                                                        <img src={d.image_web} alt={d.title} />
                                                    </Link>
                                                        <span className="tag danger font-body--md-400">sale {d.sp}%</span>
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
                                                                <span className="font-body--lg-500">{CURRENCY + d.srp}</span>
                                                                <del className="font-body--lg-400">{CURRENCY + d.mrp}</del>
                                                            </div>
                                                            <StartRatings />
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
                                            */}


        </section>

        )
    }

}

export default FeaturedProductsSection