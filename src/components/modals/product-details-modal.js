import { SaticAssets } from "../../Constants";
import StartRatings from "../views/misc/StartRatings";
import Slider from "react-slick";
import { Component } from "react";
import { CURRENCY } from "../../AppConfig";
import { AppContext } from "../../contexts/app-context";
import { Link } from "react-router-dom";
import SocialBar from "../views/misc/social-bar";



export default class ProductDetailsModal extends Component{

    static contextType = AppContext

    state={
        data:null
    }

    setErrorImg=(el)=>{
        el.src = SaticAssets.IMG_ERROR_PLACEHOLDER
    }

    hide=()=>{
        this.setState({"data":null})
        if(this.props.setProductPreviewParams)this.props.setProductPreviewParams({show:false,pid:null})
    }

    lastOpen=null;

    componentDidUpdate(){
        if(this.props.productPreviewParams.pid && this.lastOpen!==this.props.tt){
            this.lastOpen=this.props.tt
            if(this.props && this.props.productPreviewParams && this.props.productPreviewParams.pid){
                this.props.rootHook.authService.getProductDetails(this.props.productPreviewParams.pid)
                .then(req =>{
                    const {data} = req
                    if(data.status){
                        this.setState({"data":data.data})
                    }else throw new Error(data.message)
                })
                .catch(err=>{
                    this.hide();
                    this.props?.rootHook?.showToast(err.message, 'danger')
                })
            }
        }
    }

    shouldShow=()=>{
        return  this.props 
                && this.props.productPreviewParams 
                && this.props.productPreviewParams.show 
                && this.props.productPreviewParams.pid!=null;
    }


    render(){

        if(!this.shouldShow())return null

        const {addToCart, isInCart,removeFromCart, addToCartById, 
                            cartItemCountByPid, isInWisthList, removeFromWishlist, addToWishlist} = this.context;

        if(!this.state.data){
            return (
                <div className="modal fade products show" tabIndex="-1" aria-labelledby="productViewLabel" aria-modal="true" role="dialog" style={{display: 'block'}}>
                <div className="modal-dialog modal-xl modal-dialog-centered preview">
                    <div className="modal-content">
                        <div className="modal-body">
                        <button className="btn pull-right" onClick={()=>{this.hide()}}>
                            <i className="fa fa-times"></i>
                        </button>
                            <div className="loader-productdetails-modal">
                            <img style={{height:'50%',maxHeight:'100px'}} src={SaticAssets.LOADER_IMG_LINK} alt="preload"/>
                            <h3>Loading Preview...</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        const sliderConfig = {
            customPaging: function(i) {
                return (
                    <img src={data.gallery[i].image} alt={`Slide ${i}`} onError={e=>{e.target.src = SaticAssets.IMG_ERROR_PLACEHOLDER}}/>
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
        const {data} = this.state;
        const isFav = isInWisthList(data.id)
        
        if(data.gallery && !data.gallery.length){
            data.gallery.push({image:(data.img_web)?data.img_web:SaticAssets.IMG_ERROR_PLACEHOLDER})
        }
        

        return (
            <div className="modal fade products show" tabIndex="-1" aria-labelledby="productViewLabel" aria-modal="true" role="dialog" style={{display: 'block'}}>
            <div className="modal-dialog modal-xl modal-dialog-centered preview">
                <div className="modal-content">
                    <div className="modal-body">
                    <button className="btn pull-right" onClick={()=>{this.hide()}}>
                        <i className="fa fa-times"></i>
                    </button>
                        <div className="row productsView" style={{marginTop:'0px'}}>
                        
                            <div className="col-xl-6">
                                {/*<!-- Product View Slider -->*/}

                                <Slider className="product-preview-carousal" {...sliderConfig}>
                                    {
                                        data.gallery.map((d,i)=>{
                                            return (<img key={i} src={d.image} alt={`Slide ${i}`} onError={e=>{e.target.src = SaticAssets.IMG_ERROR_PLACEHOLDER}}/>)
                                        })
                                    }
                                </Slider>


                            </div>
                            <div className="col-xl-6" style={{padding:'32px 10px 10px 10px'}}>
                                {/*<!-- Products information -->*/}
                                <div className="products__content">
                                    <div className="products__content-title">
                                        <h2 className="font-title--md">{data.title}</h2>
                                        {/*<!--<span className="label stock-in">in Stock</span>-->*/}
                                        {/*<!-- <span className="label stock-out">Stock out</span> -->*/}
                                    </div>
                                    
                                    <div className="products__content-price">
                                        <h2 className="font-body--xxxl-500">
                                            <del className="font-body--xxl-400">{CURRENCY + Number(data.mrp_price).toFixed(2)}</del>
                                            <span> {CURRENCY + Number(data.price).toFixed(2)}</span>
                                            /{(data.user_type==="sup_pre_wholeseller")?data.wholeseller_alternativ_unit:data.retailer_alternativ_unit} Pcs
                                        </h2>
                                        
                                        <span className="label sale-off" style={{display:(data.mrp_price>0)?'':'none'}}> {Math.round((data.mrp_price-data.price)/data.mrp_price*100)}% off </span>
                                    </div>
                                    {/*  
                                    <div className="label"><b>Confactor: </b>{data.confactor}</div>
                                    <div className="label"><b>Unit: </b>{data.item_main_unit}</div>
                                    <div className="label"><b>Alternative Unit: </b>
                                        {(data.user_type==="sup_pre_wholeseller")?data.wholeseller_alternativ_unit:data.retailer_alternativ_unit}
                                    </div>
                                    */}
                                    
                                
                                    <div className="products__content-info">
                                         <StartRatings 
                                            pid={data.id} 
                                            showToast={this.context.showToast}
                                            addRatings={this.context.addRatings}
                                            rating={data.totalRating}
                                         />
                                         {/*<!-- 
                                        <span className="dot">.</span>
                                        <h5 className="font-body--md-500">
                                            Sku:
                                            <span className="counting font-body--md-400">2,51,594</span>
                                        </h5>
                                        -->*/}
                                    </div>
                                    <p className="products__content-brand-info font-body--md-400">
                                        {data.description}
                                    </p>
                                </div>
                                {/*<!-- brand  -->*/}
                                <div className="products__content">
                                    <div className="products__content-brand">
                                        <div className="brand-name">
                                            <h2 className="font-body--md-400">Category:</h2>
                                            <div className="brand-name-logo">
                                                {(data.categoryList && Array.isArray(data.categoryList))
                                                    ?data.categoryList.map((n,z)=>{
                                                        if(!(n!==null && n.id!==null && n.name!==null && n.id!=='' && n.name!==''))return ''
                                                        return <Link key={n.id} to={"/categoryproducts/"+n.id} className="brand-name-logo" onClick={()=>{this.hide()}}>{n.name}</Link>
                                                    }) 
                                                    :'Unknown'
                                                }
                                            </div>
                                        </div>
                                        <div className="social-site">
                                            <h2 className="font-body--md-400">Share item:</h2>
                                            <SocialBar />
                                        </div>
                                    </div>
                                </div>
                                {/*<!-- Action button -->*/}
                                <div className="products__content">
                                    <div className="products__content-action">

                                        {/*<!-- add to cart  -->*/}
                                        {!isInCart(data.id)
                                        ?<button onClick={()=>addToCart(data)} className={"button products__content-action-item d-flex"+ (isInCart(data.id)?" item-in-cart":"")}>
                                            Add to Cart
                                            <span>
                                                <i className="fa fa-shopping-bag bagss"></i>
                                            </span>
                                        </button>
                                        :<span style={{marginRight:'10px'}}>Quantity:</span>
                                        }
                                        {/* cart counter */}
                                        <div className="counter-btn-wrapper products__content-action-item"  style={{display:isInCart(data.id)?'':'none'}}>
                                            <button className="counter-btn-dec counter-btn"  onClick={()=>removeFromCart(data.id, false)} >
                                                -
                                            </button>
                                            <span type="number" id="counter-btn-counter" className="counter-btn-counter" min="0" max="1000" placeholder="0">{cartItemCountByPid(data.id)}</span>
                                            <button className="counter-btn-inc counter-btn" onClick={()=>addToCartById(data.id)} >
                                                +
                                            </button>
                                        </div>
                                        

                                        {/*<!-- fav  -->*/}
                                        <button 
                                            className={"products__content-action-item button-fav" + (isFav?" item-in-wishlist":"")} 
                                            onClick={()=>{(!isFav)?addToWishlist(data):removeFromWishlist(data)}}
                                        >
                                            <i className="fa fa-heart"></i>
                                        </button>
                                    </div>
                                </div>
                                {/*<!-- Tags  
                                <div className="products__content">
                                    <h5 className="products__content-category font-body--md-500">Category: <span>Vegetables</span></h5>
                                    <div className="products__content-tags">
                                        <h5 className="font-body--md-500">Tag :</h5>
                                        <div className="products__content-tags-item">
                                            <a href="#" className="font-body--md-400">Vegetables</a>
                                            <a href="#" className="font-body--md-400">Healthy</a>
                                            <a href="#" className="font-body--md-400">Chinese</a>
                                            <a href="#" className="font-body--md-400">Cabbage</a>
                                            <a href="#" className="font-body--md-400">Green Cabbage </a>
                                        </div>
                                    </div>
                                </div>
                                -->*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

/*<!-- 
                                <div className="gallery-view">
                                    <div className="gallery-items">
                                        <div className="swiper-container gallery-items-slider swiper-container-initialized swiper-container-vertical swiper-container-pointer-events">
                                            <div className="swiper-wrapper" id="swiper-wrapper-107ed06721010fb13b8" aria-live="polite"
                                                     style={{transitionDuration: '0ms', transform: 'translate3d(0px, -420px, 0px)'}}>
                                                <div className="gallery-item swiper-slide swiper-slide-active swiper-slide-duplicate swiper-slide-duplicate-active" 
                                                    data-swiper-slide-index="0" role="group" aria-label="5 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-01.png"} alt="Slide 01"/>
                                                </div>
                                                <div className="gallery-item swiper-slide swiper-slide-next swiper-slide-duplicate" data-swiper-slide-index="1" 
                                                            role="group" aria-label="6 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-02.png"} alt="Slide 02"/>
                                                </div>
                                                <div className="gallery-item swiper-slide swiper-slide-duplicate" data-swiper-slide-index="2" 
                                                        role="group" aria-label="7 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-03.png"} alt="Slide 03"/>
                                                </div>
                                                <div className="gallery-item swiper-slide swiper-slide-duplicate-prev swiper-slide-duplicate" data-swiper-slide-index="3" 
                                                        role="group" aria-label="8 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-04.png"} alt="Slide 04"/>
                                                </div>
                                                
                                                
                                                
                                                
                                                <div className="gallery-item swiper-slide swiper-slide-active" data-swiper-slide-index="0" 
                                                            role="group" aria-label="5 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-01.png"} alt="Slide 01"/>
                                                </div>
                                                <div className="gallery-item swiper-slide swiper-slide-next" data-swiper-slide-index="1"
                                                         role="group" aria-label="6 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-02.png"} alt="Slide 02"/>
                                                </div>
                                                <div className="gallery-item swiper-slide" data-swiper-slide-index="2" 
                                                                role="group" aria-label="7 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-03.png"} alt="Slide 03"/>
                                                </div>
                                                <div className="gallery-item swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="3" 
                                                                role="group" aria-label="8 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-04.png"} alt="Slide 04"/>
                                                </div>
                                                
                                                
                                                
                                                
                                                <div className="gallery-item swiper-slide swiper-slide-active swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0"
                                                             role="group" aria-label="5 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-01.png"} alt="Slide 01"/>
                                                </div>
                                                <div className="gallery-item swiper-slide swiper-slide-next swiper-slide-duplicate" data-swiper-slide-index="1"
                                                            role="group" aria-label="6 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-02.png"} alt="Slide 02"/>
                                                </div>
                                                <div className="gallery-item swiper-slide swiper-slide-duplicate" data-swiper-slide-index="2"
                                                             role="group" aria-label="7 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-03.png"} alt="Slide 03"/>
                                                </div>
                                                <div className="gallery-item swiper-slide swiper-slide-duplicate-prev swiper-slide-duplicate" data-swiper-slide-index="3"
                                                                 role="group" aria-label="8 / 12" style={{height: '105px'}}>
                                                    <img src={SaticAssets.IMG_DIR_LINK+"/product-details/img-04.png"} alt="Slide 04"/>
                                                </div>

                                            </div>
                                            <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                                            <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                                        </div>
                                        <div className="gallery-prev-item" tabIndex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-107ed06721010fb13b8">
                                            <div className="gallery-icon">
                                                <i className="fa fa-arrow-up"></i>
                                            </div>
                                        </div>
                                        <div className="gallery-next-item" tabIndex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-107ed06721010fb13b8">
                                            <div className="gallery-icon">
                                               <i className="fa fa-arrow-down"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="gallery-main-image products__gallery-img--lg">
                                        <img className="product-main-image" src={SaticAssets.IMG_DIR_LINK+"/product-details/img-01.png"} alt="Slide 01"/>
                                    </div>
                                </div>
                            -->*/