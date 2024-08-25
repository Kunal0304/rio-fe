import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from '../../routed-component-wrapper';
import { formatPrice } from '../../Utils';
import StartRatings from '../views/misc/StartRatings';
import LoadingScreen from '../views/loading-screen';
import BaseAppComponent from '../base-app-component';
import ProductTestimonials from '../views/misc/product-testimonials';
import SocialBar from '../views/misc/social-bar'
import Slider from 'react-slick';
import { SaticAssets } from '../../Constants';

/*
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return ( <
        div className = { className }
        style = {
            {...style, display: "block", background:"transparent" } }
        onClick = { onClick }
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return ( <
        div className = { className }
        style = {
            {...style, display: "block",background:"transparent"   } }
        onClick = { onClick }
        />
    );
}
*/

class ProductDetails extends BaseAppComponent {

    productDetails=null;
    lastId=-1000;
    state={
        loading:true
    }
    constructor(props){
        super(props)
        setTimeout(()=>{this.getProductDetails()},0);
    }

    componentDidUpdate(){
        setTimeout(()=>{this.getProductDetails()},0);
    }

   componentWillUnmount(){
        this.productDetails = null;
        this.lastId=-1000;
   }

   setErrorImg=(el)=>{
        el.src = '.'+SaticAssets.IMG_ERROR_PLACEHOLDER
        console.log(el.src)
    }

   getProductDetails = ()=>{
        if(this.props.params && this.props.params.id!==this.lastId && this.context){
            this.lastId=this.props.params.id;
            this.productDetails=null;
            window.scrollTo(0,0);
            this.setState({loading:true})
            this.context.getAuthService().getProductDetails(this.props.params.id)
            .then(req =>{
                const {data} = req
                console.log(data)
                this.productDetails = Object.assign({}, data);
            })
            .catch(err=>{
                this.showToast(err.message, 'danger')
            })
            .finally(()=>{this.setState({loading:false})})
        }
   }

    render() {
        
        if(this.state.loading || this.lastId===-1000)return <LoadingScreen show={true}/>
        const user = this.context.getUser();
        let hasDetails = this.productDetails!==null;
        let pd = {};
        let posterImg = ""
        if(hasDetails){
            pd = Object.assign({},this.productDetails.data)
            posterImg = this.state.posterImg || pd.image_web || '';
        }

        if(pd.gallery && !pd.gallery.length){
            pd.gallery.push({image:(pd.img_web)?pd.img_web:SaticAssets.IMG_ERROR_PLACEHOLDER})
        }

        console.log(pd)

        const testimonials = pd.reviewListing || [];
        const {addToCart, isInCart,removeFromCart, addToCartById, showToast, cartItemCountByPid, addToWishlist, removeFromWishlist, isInWisthList} = this.context;
        const isFav = isInWisthList(pd.id)
        
        const sliderConfig = {
            customPaging: function(i) {
                return (
                    <img src={pd.gallery[i].image} alt={`Slide ${i}`} onError={e=>{e.target.src=SaticAssets.IMG_ERROR_PLACEHOLDER}}/>
                );
            },
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            lazyLoad: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false,
        };

        return (
            <div>
               
                <div className="section breedcrumb">
                    <div className="breedcrumb__img-wrapper">
                        <img src="/assets/images/banner/breedcrumb.jpg" alt="" />
                        <div className="container">
                            <ul className="breedcrumb__content">
                                <li>
                                    <Link to="/">
                                    <i className="fa fa-home iconss"></i>
                                        <span> {'>'} </span>
                                    </Link>
                                </li>
                                <li className="active"><span className="breadcrumb-target">Product Details</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {
                    (hasDetails)
                    ?(
                        <div>
                        <section className="products section" style={{paddingTop:'40px'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">

                                <Slider className="product-preview-carousal" style={{maxWidth:'90%'}} {...sliderConfig}>
                                    {
                                        pd.gallery.map((d,i)=>{
                                            return (<img key={i} src={d.image} alt={`Slide ${i}`} onError={e=>{e.target.src=SaticAssets.IMG_ERROR_PLACEHOLDER}}/>)
                                        })
                                    }
                                </Slider>

   

                                </div>
                                <div className="col-lg-6">
                                    <div className="products__content">
                                        <div className="products__content-title">
                                            <h2 className="font-title--md">{pd.title}</h2>
                                            {/*<span className="label stock-in">in Stock</span>*/}
                                        </div>
                                        {/* style={{display:(pd.mrp_price>0)?'':'none'}} */}
                                        <div className="products__content-price" >
                                            <h2 className="font-body--xxxl-500">
                                                <del className="font-body--xxl-400">{formatPrice(pd.mrp_price)}</del> 
                                                { " "  + formatPrice(pd.price) } 
                                            </h2>
                                            <h4>{"/ "  + ((pd.user_type==="sup_pre_wholeseller")?pd.wholeseller_alternativ_unit:pd.retailer_alternativ_unit)} {pd.item_main_unit}</h4>    
                                            <span className="label sale-off"> {(pd.mrp_price>0)?Math.round(1-pd.price/pd.mrp_price*100):0}% off </span>
                                            
                                        </div>
                                        
                                        <div className="products__content-info">
                                            Product Rating:&nbsp;
                                            <StartRatings 
                                            showToast={showToast}
                                            addRatings={this.addRatings} 
                                            rating={pd.rating}
                                            pid={pd.id}
                                            />
                                            
                                            {/*<span className="dot">.</span><h5 className="font-body--md-500">Sku: <span className="counting font-body--md-400">2,51,594</span></h5>*/}
                                        </div>
                                        {/*
                                        <div className="label"><strong>Confactor: </strong>{pd.confactor}</div>
                                        <div className="label"><strong>Unit: </strong>{pd.item_main_unit}</div>
                                        <div className="label"><strong>Alternative Unit: </strong>{(pd.user_type==="sup_pre_wholeseller")?pd.wholeseller_alternativ_unit:pd.retailer_alternativ_unit}</div>
                                        */}
                                        <p className="products__content-brand-info font-body--md-400">
                                            {pd.description}
                                        </p>
                                    </div>
                                    <div className="products__content">
                                        <div className="products__content-brand">
                                            <div className="brand-name">
                                                <h2 className="font-body--md-400">Tags:</h2>
                                                {Array.isArray(pd.categoryList)
                                                    ?pd.categoryList.map((n,z)=>{
                                                        if(!(n!==null && n.id!==null && n.name!==null && n.id!=='' && n.name!==''))return ''
                                                        return <Link key={z} to={"/categoryproducts/"+n.id} className="brand-name-logo">{n.name}</Link>
                                                    }) 
                                                    :'Unknown'
                                                }
                                            </div>
                                            <div className="social-site">
                                                <h2 className="font-body--md-400">Share item:</h2>
                                                <SocialBar />
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="products__content">
                                        <div className="products__content-action">
                                            <div className="counter-btn-wrapper products__content-action-item" style={{display:isInCart(pd.id)?'':'none'}}>
                                                <button onClick={()=>removeFromCart(pd.id, false)} 
                                                    className="counter-btn-dec counter-btn">
                                                    -
                                                </button>
                                                <input readOnly value={cartItemCountByPid(pd.id)} type="number" id="counter-btn-counter" className="counter-btn-counter" min="0" max="1000" placeholder="0" />
                                                <button onClick={()=>addToCartById(pd.id)}
                                                    className="counter-btn-inc counter-btn">
                                                    +
                                                </button>
                                            </div>
                                            <button onClick={()=>addToCart(pd)} className={"button button--md products__content-action-item"+ (isInCart(pd.id)?" item-in-cart":"")}>
                                                Add to Cart
                                                <span>
                                                <i className="fa fa-shopping-bag bagss"></i>
                                                </span>
                                            </button>
    
                                            <button 
                                                className={"button-fav products__content-action-item" + (isFav?" item-in-wishlist":"")} 
                                                onClick={()=>{(!isFav)?addToWishlist(pd):removeFromWishlist(pd)}}
                                            >
                                            <i className="fa fa-heart"></i>
                                            </button>
                                        </div>
                                    </div>
                                    {/** 
                                    <div className="products__content">
                                        <div className="products__content-item"><strong>Confactor:</strong> {pd.confactor}</div>
                                        <div className="products__content-item"><strong>Main Unit:</strong> {pd.item_main_unit}</div>
                                        <div className="products__content-item"><strong>Alternative Unit:</strong> {(pd.user_type==="sup_pre_wholeseller")?pd.wholeseller_alternativ_unit:pd.retailer_alternativ_unit}</div>
                                    </div>
                                    */}


                                    {/* <div className="products__content">
                                        <h5 className="products__content-category font-body--md-500">Category: <Link to="/">Vegetables</Link></h5>
                                        <div className="products__content-tags">
                                            <h5 className="font-body--md-500">Tag :</h5>
                                            <div className="products__content-tags-item">
                                                <Link to="/" className="font-body--md-400">Vegetables</Link>
                                                <Link to="/" className="font-body--md-400">Healthy</Link>
                                                <Link to="/" className="font-body--md-400">Chinese</Link>
                                                <Link to="/" className="font-body--md-400">Cabbage</Link>
                                                <Link to="/" className="font-body--md-400">Green Cabbage </Link>
                                            </div>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                        </section>

        
                        <ProductTestimonials testimonials={[...testimonials]} user={user} />
                        </div>
                    )
                    :(
                        <div>
                            <h3>Product details not found.</h3>
                            <Link to="/">
                                Continue shopping
                            </Link>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default withRouter(ProductDetails);


                                 /* <div className="gallery-view">
                                        <div className="gallery-items">
                                            <div className="swiper-container gallery-items-slider">
                                                <div className="swiper-wrapper">
                                                    {
                                                        pd?.gallery?.map((d,i)=>{
                                                            const {image, id} = d;
                                                            return (
                                                                <div key={id} className="gallery-item swiper-slide">
                                                                    <img 
                                                                        onClick={(e)=>this.setState({posterImg:e.target.src})}
                                                                         src={image} alt={"Slide" + id}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                     }
                                                </div>
                                            </div>
                                            <div className="gallery-prev-item">
                                                <div className="gallery-icon">
                                                <i className="fa fa-arrow-up"></i>
                                                </div>
                                            </div>
                                            <div className="gallery-next-item">
                                                <div className="gallery-icon">
                                                <i className="fa fa-arrow-down"></i>
                                                </div>
                                            </div>
                                        </div>
    
                                        <div className="gallery-main-image products__gallery-img--lg">
                                            <img className="product-main-image" src={posterImg} alt={pd.title} />
                                        </div>
                                    </div> */




                                                /**
                                                    <div className="gallery-item swiper-slide">
                                                        <img src="assets/images/product-details/img-01.png" alt="Slide 01" />
                                                    </div>
                                                    <div className="gallery-item swiper-slide">
                                                        <img src="assets/images/product-details/img-02.png" alt="Slide 02" />
                                                    </div>
                                                    <div className="gallery-item swiper-slide">
                                                        <img src="assets/images/product-details/img-03.png" alt="Slide 03" />
                                                    </div>
                                                    <div className="gallery-item swiper-slide">
                                                        <img src="assets/images/product-details/img-04.png" alt="Slide 04" />
                                                    </div>
                                                */



                                                                            /*
                        <section className="products-tab section section--xl">
                        <div className="products-tab__btn">
                            <div className="container">
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-description-tab" data-bs-toggle="pill" data-bs-target="#pills-description" type="button" role="tab" aria-controls="pills-description" aria-selected="true">
                                            Description
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-information-tab" data-bs-toggle="pill" data-bs-target="#pills-information" type="button" role="tab" aria-controls="pills-information" aria-selected="false">
                                            Aditional information
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-customer-tab" data-bs-toggle="pill" data-bs-target="#pills-customer" type="button" role="tab" aria-controls="pills-customer" aria-selected="false">
                                            customer feedback
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="products-tab__content">
                            <div className="container">
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                                        <div className="row products-tab__description">
                                            <div className="col-lg-7 order-lg-0 order-2">
                                                <p className="products-tab__description--text">
                                                    Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet nisi
                                                    porttitor vel. Etiam tincidunt metus vel dui interdum sollicitudin. Mauris sem ante, vestibulum nec orci vitae, aliquam mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla facilisi. Nam
                                                    scelerisque vitae justo a convallis. Morbi urna ipsum, placerat quis commodo quis, egestas elementum leo. Donec convallis mollis enim. Aliquam id mi quam. Phasellus nec fringilla elit.
                                                </p>
                                                <p className="products-tab__description--text">
                                                    Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui. Sed iaculis, metus faucibus elementum tincidunt, turpis mi viverra velit, pellentesque tristique neque mi eget nulla. Proin luctus
                                                    elementum neque et pharetra.
                                                </p>
    
                                                <ul className="products-tab__description--list">
                                                    <li>
                                                        <span className="icon">
                                                        <i className="fa fa-check bags"></i>
                                                        </span>
                                                        <p>100 g of fresh leaves provides.</p>
                                                    </li>
                                                    <li>
                                                        <span className="icon">
                                                        <i className="fa fa-check bags"></i>
                                                        </span>
                                                        <p>100 g of fresh leaves provides.</p>
                                                    </li>
                                                    <li>
                                                        <span className="icon">
                                                        <i className="fa fa-check bags"></i>
                                                        </span>
                                                        <p>100 g of fresh leaves provides.</p>
                                                    </li>
                                                    <li>
                                                        <span className="icon">
                                                            <i className="fa fa-check bags"></i>
                                                        </span>
                                                        <p>100 g of fresh leaves provides.</p>
                                                    </li>
                                                </ul>
    
                                                <p className="products-tab__description--text">
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae totam eos nostrum suscipit molestiae dolorem maxime, reprehenderit labore praesentium repudiandae a? Minus consequuntur ad dignissimos
                                                    error corporis tenetur ducimus odit.
                                                </p>
                                            </div>
                                            <div className="col-lg-5 order-lg-0 order-1">
                                                <div className="products-video">
                                                    <img src="assets/images/members/img-10.png" alt="img-src" />
                                                    <Link to="https://youtu.be/JkaxUblCGz0" className="play-icon venobox" data-autoplay="true" data-vbtype="video">
                                                        <i className="fa fa-play bagss"></i>
                                                    </Link>
                                                </div>
                                                <div className="products-video__card">
                                                    <div className="products-video__card-item">
                                                        <span className="icon">
                                                        <i className="fa fa-check icons"></i>
                                                        </span>
                                                        <div className="text__info">
                                                            <h5>64% Discount</h5>
                                                            <p>Save your 64% money with us</p>
                                                        </div>
                                                    </div>
                                                    <div className="products-video__card-item">
                                                        <span className="icon">
                                                            <i className="fa fa-check icons"></i>
                                                        </span>
                                                        <div className="text__info">
                                                            <h5>100% Organic</h5>
                                                            <p>100% Organic Vegetables</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-information" role="tabpanel" aria-labelledby="pills-information-tab">
                                        <div className="row products-tab__information">
                                            <div className="col-lg-7 order-lg-0 order-2">
                                                <ul className="products-tab__information-list">
                                                    <li>
                                                        <h5 className="title">Weight:</h5>
                                                        <p className="title-description">03</p>
                                                    </li>
                                                    <li>
                                                        <h5 className="title">Color:</h5>
                                                        <p className="title-description">Green</p>
                                                    </li>
                                                    <li>
                                                        <h5 className="title">Type:</h5>
                                                        <p className="title-description">Organic</p>
                                                    </li>
                                                    <li>
                                                        <h5 className="title">Category:</h5>
                                                        <p className="title-description">Vegetables</p>
                                                    </li>
                                                    <li>
                                                        <h5 className="title">Stock Status:</h5>
                                                        <p className="title-description">Available <span>(5,413)</span></p>
                                                    </li>
                                                    <li>
                                                        <h5 className="title">Tags:</h5>
                                                        <div className="title-description title-description__tags">
                                                            <Link to="/" className="title-description__tags-item">
                                                                Vegetables,
                                                            </Link>
                                                            <Link to="/" className="title-description__tags-item">
                                                                Healthy,
                                                            </Link>
                                                            <Link to="/" className="title-description__tags-item">
                                                                Chinese,
                                                            </Link>
                                                            <Link to="/" className="title-description__tags-item">
                                                                Cabbage,
                                                            </Link>
                                                            <Link to="/" className="title-description__tags-item">
                                                                Green Cabbage,
                                                            </Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-5 order-lg-0 order-1">
                                                <div className="products-video">
                                                    <img src="assets/images/members/img-10.png" alt="img-src" />
                                                    <Link to="https://youtu.be/JkaxUblCGz0" className="play-icon venobox" data-autoplay="true" data-vbtype="video">
                                                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 0V18L14 9L0 0Z" fill="currentColor" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                                <div className="products-video__card">
                                                    <div className="products-video__card-item">
                                                        <span className="icon">
                                                            <i className="fa fa-check icons"></i>
                                                        </span>
                                                        <div className="text__info">
                                                            <h5>64% Discount</h5>
                                                            <p>Save your 64% money with us</p>
                                                        </div>
                                                    </div>
                                                    <div className="products-video__card-item">
                                                        <span className="icon">
                                                        <i className="fa fa-check icons"></i>
                                                        </span>
                                                        <div className="text__info">
                                                            <h5>100% Organic</h5>
                                                            <p>100% Organic Vegetables</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="tab-pane fade" id="pills-customer" role="tabpanel" aria-labelledby="pills-customer-tab">
                                        <div className="row products-tab__feedback">
                                            <div className="col-lg-7 order-lg-0 order-2">
                                                <div className="feedback">
                                                    <div className="products-tab__feedback-content">
                                                        <div className="products-tab__feedback-content-top">
                                                            <div className="user-details">
                                                                <div className="user-details__img">
                                                                    <img src="assets/images/user/img-02.png" alt="user-img" />
                                                                </div>
                                                                <div className="user-details__info">
                                                                    <h2 className="user-name">Jane Cooper</h2>
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
                                                <i className="fa fa-star star-small"></i>
                                                </li>
                                            </ul>
                                                                </div>
                                                            </div>
                                                            <div className="user-published__info">
                                                                <p>2 min ago</p>
                                                            </div>
                                                        </div>
                                                        <p className="products-tab__feedback-comments">
                                                            Duis at ullamcorper nulla, eu dictum eros.
                                                        </p>
                                                    </div>
                                                    <div className="products-tab__feedback-content">
                                                        <div className="products-tab__feedback-content-top">
                                                            <div className="user-details">
                                                                <div className="user-details__img">
                                                                    <img src="assets/images/user/img-01.png" alt="user-img" />
                                                                </div>
                                                                <div className="user-details__info">
                                                                    <h2 className="user-name">Kristin Watson</h2>
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
                                                <i className="fa fa-star star-small"></i>
                                                </li>
                                            </ul>
                                                                </div>
                                                            </div>
                                                            <div className="user-published__info">
                                                                <p>30 Apr, 2021</p>
                                                            </div>
                                                        </div>
                                                        <p className="products-tab__feedback-comments">
                                                            Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Door Magnet tends to "bolt" or go to seed; in long periods of heat, some kind of shade may be helpful. Watch
                                                            out for snails, as they will harm the plants.
                                                        </p>
                                                    </div>
                                                    <div className="products-tab__feedback-content">
                                                        <div className="products-tab__feedback-content-top">
                                                            <div className="user-details">
                                                                <div className="user-details__img">
                                                                    <img src="assets/images/user/img-03.png" alt="user-img" />
                                                                </div>
                                                                <div className="user-details__info">
                                                                    <h2 className="user-name">Jacob Jones</h2>
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
                                                <i className="fa fa-star star-small"></i>
                                                </li>
                                            </ul>
                                                                </div>
                                                            </div>
                                                            <div className="user-published__info">
                                                                <p>2 min ago</p>
                                                            </div>
                                                        </div>
                                                        <p className="products-tab__feedback-comments">
                                                            Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.
                                                        </p>
                                                    </div>
                                                    <div className="products-tab__feedback-content">
                                                        <div className="products-tab__feedback-content-top">
                                                            <div className="user-details">
                                                                <div className="user-details__img">
                                                                    <img src="assets/images/user/img-04.png" alt="user-img" />
                                                                </div>
                                                                <div className="user-details__info">
                                                                    <h2 className="user-name">Ralph Edwards</h2>
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
                                                <i className="fa fa-star star-small"></i>
                                                </li>
                                            </ul>
                                                                </div>
                                                            </div>
                                                            <div className="user-published__info">
                                                                <p>2 min ago</p>
                                                            </div>
                                                        </div>
                                                        <p className="products-tab__feedback-comments">
                                                            200+ Canton Pak Choi Bok Choy Door Magnet Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choi, from USA
                                                        </p>
                                                    </div>
    
                                                    <form action="#">
                                                        <button className="button button--md button--disable feedback__loadbtn">
                                                            Load more
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 order-lg-0 order-1">
                                                <div className="products-video">
                                                    <img src="assets/images/members/img-10.png" alt="img-src" />
                                                    <Link to="https://youtu.be/JkaxUblCGz0" className="play-icon venobox" data-autoplay="true" data-vbtype="video">
                                                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 0V18L14 9L0 0Z" fill="currentColor" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                                <div className="products-video__card">
                                                    <div className="products-video__card-item">
                                                        <span className="icon">
                                                        <i className="fa fa-check icons"></i>
                                                        </span>
                                                        <div className="text__info">
                                                            <h5>64% Discount</h5>
                                                            <p>Save your 64% money with us</p>
                                                        </div>
                                                    </div>
                                                    <div className="products-video__card-item">
                                                        <span className="icon">
                                                            <i className="fa fa-check icons"></i>
                                                        </span>
                                                        <div className="text__info">
                                                            <h5>100% Organic</h5>
                                                            <p>100% Organic Vegetables</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    */