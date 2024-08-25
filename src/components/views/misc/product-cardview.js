import { Component } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../Utils";
import { SaticAssets } from "../../../Constants";
import StartRatings from "./StartRatings";

export default class ProductCardView extends Component{

    state = {
        loaded:false
        
    }


    onImgLoadError=(e)=>{
        e.target.src = SaticAssets.IMG_ERROR_PLACEHOLDER
        this.setState({loaded:true})
    }

    render(){

        const cls = this.props.addClass || ''; 
        const loaded = this.state.loaded;
        const { inCart,
                addCart, 
                data, 
                isUserLoggedIn, 
                showPreview,
                isFav,
                addToFav,
                removeFromFav,
                addRatings,
                showToast,
                removeFromCart,
                cartItemCountByPid,
                addToCartById
        } = this.props;
        const d = data;

        if( inCart === undefined 
            || isUserLoggedIn===undefined 
            || !addCart 
            || !d 
            || !showPreview
            || isFav===undefined
            || !addToFav
            || !removeFromFav
            || !addRatings
            || !showToast
            || !removeFromCart
            || !cartItemCountByPid
            || !addToCartById
            )throw new Error("ProductCardView:props not supplied!")

        return (
                <div className={`cards-md ${cls}`}>    
                    <div className="cards-md__img-wrapper">
                        <Link to={{pathname:"/product-detail/"+d?.id}}>
                            <img 
                                onLoad={()=>{this.setState({loaded:true})}} 
                                onError={(e)=>{this.onImgLoadError(e)}} 
                                src={d?.image_web} 
                                alt={d?.title} 
                            />
                        </Link>
                        {/*<span  className="tag danger font-body--md-400"  style={{display:(d.sp>70)?'inherit':'none'}}>*/}
                        <span  className="tag danger font-body--md-400"  style={{display:(d.sp>0)?'inherit':'none'}}>
                            Sale {d.sp}%
                        </span>
                        <div className="cards-md__favs-list">
                            <span className={"action-btn" + (isFav?" item-in-wishlist":"")} onClick={()=>{(!isFav)?addToFav(d):removeFromFav(d)}}>
                                <i className="fa fa-heart"></i>
                            </span>
                            <span className="action-btn" onClick={()=>{showPreview(d.id)}}>
                                <i className="fa fa-eye"></i>
                            </span>
                            
                        </div>
                    </div>
                    <div className="cards-md__info d-flex justify-content-between align-items-center">
                        <div className="cards-md__info-left">
                            <h6 className="font-body--md-400">{d?.title}</h6>
                            {isUserLoggedIn()
                                ?(  <div className="cards-md__info-price">
                                        <span className="font-body--lg-500">{formatPrice(d.price)} </span>
                                        <del className="font-body--lg-400">{formatPrice(d.mrp_price)}</del>
                                         {" / "+d.item_main_unit}
                                    </div>)
                                :("")
                            }
                            
                            <StartRatings 
                            showToast={showToast}
                            addRatings={addRatings}
                            pid={d.id} 
                            rating={d.totalRating}
                            />
                        </div>

                        <div className="card-action-wrqpper">
                            <div className="counter-btn-wrapper products__content-action-item" style={{display:inCart?'':'none'}}>
                                <button onClick={()=>removeFromCart(d.id, false)} 
                                    className="counter-btn-dec counter-btn">
                                    -
                                </button>
                                <input readOnly value={cartItemCountByPid(d.id)} type="number" id="counter-btn-counter" className="counter-btn-counter" min="0" max="1000" placeholder="0" />
                                <button onClick={()=>addToCartById(d.id)}
                                    className="counter-btn-inc counter-btn">
                                    +
                                </button>
                            </div>

                            <div onClick={()=>{addCart(d)}} className={"cards-md__info-right" + (inCart?" item-in-cart":"")} style={{display:!inCart?'':'none'}}>
                                <p className="text-black">Add to Cart</p>
                                <span className={"action-btn" + (inCart?" item-in-cart":"")} >
                                    <i className="fa fa-shopping-bag bags"></i>
                                </span>
                            </div>


                        </div>


                        
                    </div>
                    <span className="product-cardview_preloader" style={{display:(loaded)?'none':'flex'}}>
                        <img style={{height:'50%',maxHeight:'100px',width:'60%',maxWidth:'260px'}} src={SaticAssets.LOADER_IMG_LINK} alt="preload"/>
                    </span>
                </div>)
    }
}