import StartRatings from "./misc/StartRatings";

export default class ProductViewModal{

render(){
return (
/* Product Quick View Modal */
<div className="modal fade products" id="productView" tabIndex="-1" aria-labelledby="productViewLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-body">
                <div className="row productsView" style="margin-top: 32px;">
                    <div className="col-xl-6">
                        {/* Product View Slider */}
                        <div className="gallery-view">
                            <div className="gallery-items">
                                <div className="swiper-container gallery-items-slider swiper-container-initialized swiper-container-vertical swiper-container-pointer-events">
                                    <div className="swiper-wrapper" id="swiper-wrapper-107ed06721010fb13b8" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(0px, -420px, 0px);">
                                        <div className="gallery-item swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-01.png" alt="Slide 01" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index="1" role="group" aria-label="2 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-02.png" alt="Slide 02" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-duplicate" data-swiper-slide-index="2" role="group" aria-label="3 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-03.png" alt="Slide 03" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" role="group" aria-label="4 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-04.png" alt="Slide 04" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="5 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-01.png" alt="Slide 01" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="6 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-02.png" alt="Slide 02" />
                                        </div>
                                        <div className="gallery-item swiper-slide" data-swiper-slide-index="2" role="group" aria-label="7 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-03.png" alt="Slide 03" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="3" role="group" aria-label="8 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-04.png" alt="Slide 04" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="9 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-01.png" alt="Slide 01" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index="1" role="group" aria-label="10 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-02.png" alt="Slide 02" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-duplicate" data-swiper-slide-index="2" role="group" aria-label="11 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-03.png" alt="Slide 03" />
                                        </div>
                                        <div className="gallery-item swiper-slide swiper-slide-duplicate" data-swiper-slide-index="3" role="group" aria-label="12 / 12" style="height: 105px;">
                                            <img src="src/images/product-details/img-04.png" alt="Slide 04" />
                                        </div>
                                    </div>
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
                                <img className="product-main-image" src="src/images/product-details/img-01.png" alt="Slide 01" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        {/* Products information */}
                        <div className="products__content">
                            <div className="products__content-title">
                                <h2 className="font-title--md">Door Stopper</h2>
                                <span className="label stock-in">in Stock</span>
                                {/* <span className="label stock-out">Stock out</span> */}
                            </div>
                            <div className="products__content-info">
                                 <StartRatings />
                                <span className="dot">.</span>
                                <h5 className="font-body--md-500">
                                    Sku:
                                    <span className="counting font-body--md-400">2,51,594</span>
                                </h5>
                            </div>

                            <div className="products__content-price">
                                <h2 className="font-body--xxxl-500">
                                    <del className="font-body--xxl-400">$48.00</del>
                                    $17.28
                                </h2>
                                <span className="label sale-off"> 64% off </span>
                            </div>
                        </div>
                        {/* brand  */}
                        <div className="products__content">
                            <div className="products__content-brand">
                                <div className="brand-name">
                                    <h2 className="font-body--md-400">Brand:</h2>
                                    <div className="brand-name-logo">
                                        
                                        <h6>Rio Aarman</h6>
                                    </div>
                                </div>
                                <div className="social-site">
                                    <h2 className="font-body--md-400">Share item:</h2>
                                    <ul className="newsletter__social-icon">
                    <li>
                        <a href="#">
                           <i className="fa fa-facebook socialico"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                           <i className="fa fa-twitter socialico"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-pinterest socialico"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-instagram socialico"></i>
                        </a>
                    </li>
                </ul>
                                </div>
                            </div>
                            <p className="products__content-brand-info font-body--md-400">
                                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.
                            </p>
                        </div>
                        {/* Action button */}
                        <div className="products__content">
                            <div className="products__content-action">
                                <div className="counter-btn-wrapper products__content-action-item">
                                    <button className="counter-btn-dec counter-btn" onclick="decrement()">
                                        -
                                    </button>
                                    <input type="number" id="counter-btn-counter" className="counter-btn-counter" min="0" max="1000" placeholder="0" />
                                    <button className="counter-btn-inc counter-btn" onclick="increment()">
                                        +
                                    </button>
                                </div>
                                {/* add to cart  */}
                                <button className="button button--md products__content-action-item w-50 d-flex">
                                    Add to Cart
                                    <span>
                                        <i className="fa fa-shopping-bag bagss"></i>
                                    </span>
                                </button>

                                {/* fav  */}
                                <button className="button-fav products__content-action-item">
                                    <i className="fa fa-heart"></i>
                                </button>
                            </div>
                        </div>
                        {/* Tags  */}
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)
}
}