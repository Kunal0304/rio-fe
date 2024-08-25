import ProductCardView from "../misc/product-cardview";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BaseAppComponent from "../../base-app-component";
import { Link } from "react-router-dom";

const sliderConfig = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
};


export default class OurProductsSection extends BaseAppComponent{

    componentDidMount(){
        console.log("Loading our products section")
    }

    render(){

        this.products = (this.props.productList)?[...this.props.productList]:[];
        this.products?.map((d,i)=>{
            d.sp = Math.floor((1-(d.price/d.mrp_price)) * 100);
            return d;
        })

        return (

            <section className="popular-products section section--md">
            <div className="container">
                <div className="section__head">
                    <h2 className="section--title-one font-title--sm">Our products</h2>
                    <Link to="/category">
                        View All
                        <span>
                            <i className="fa fa-arrow-right"></i>
                        </span>
                    </Link>
                </div>




                <div className="popular-products__wrapper">
                    
                {
                    this.products.map((d,i)=>{
                        return (
                            <ProductCardView 
                            key={i}
                            inCart={this.itemInCart(d.id)}
                            addCart={this.addToCart} 
                            isUserLoggedIn={this.isUserLoggedIn}
                            showPreview={this.openProductPreview}
                            isFav={this.itemInWishList(d.id)}
                            addToFav={this.addToWishList}
                            removeFromFav={this.removeFromWishlist}
                            addRatings={this.addRatings}
                            showToast={this.showToast}
                            removeFromCart={this.removeFromCart}
                            cartItemCountByPid={this.cartItemCountByPid}
                            addToCartById={this.addToCartById}
                            data={d} 
                        />
                                
                        )
                    })
                }
                </div>

                
                <Slider className="popular-categories--slider" {...sliderConfig}>
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
                                removeFromCart={this.context.removeFromCart}
                                cartItemCountByPid={this.context.cartItemCountByPid}
                                addToCartById={this.context.addToCartById}
                                addClass={"w-100"}
                            />
                                    
                            )
                        })
                    }
                    </Slider>
            </div>
        </section>



        );
    }


}