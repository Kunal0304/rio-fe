import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
    componentDidMount(){
        window.scrollTo(0,0);
     }
    render() {
        return (
            <div>

{/*<!-- Hero Section start  -->*/}
        <section className="hero section--xl section">
            <div className="container">
                <div className="row hero__content">
                    <div className="col-lg-6 order-lg-0 order-2">
                        <div className="hero__text-content">
                            <h5>
                                100% Trusted Rio Products
                            </h5>
                            <p className="info">
                               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 order-lg-0 order-1">
                        <div className="hero__img-wrapper">
                            <img src="assets/images/banner/about-rio.png" alt="about-rio" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*<!-- Hero Section End  -->*/}

        {/*<!-- Hero Two Section Start  -->*/}
        <div className="hero hero--two section section--xl">
            <div className="hero__img-wrapper-two-bg">
                <img src="assets/images/banner/banner-about-bg.png" alt="banner-lg" />
            </div>
            <div className="container">
                <div className="row hero__content">
                    <div className="col-xxl-6"></div>
                    <div className="col-xxl-6">
                        <div className="hero__text-content">
                            <h5>
                                100% Trusted Products
                            </h5>
                            <p className="info--two">
                                Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a a mi. Nulla eu eros consequat tortor tincidunt feugiat.
                            </p>
                            {/*<!-- Desktop Verison  -->*/}
                            <div className="our-feature our-feature--grid">
                                {/*<!-- Organic Food  -->*/}
                                <div className="our-feature__item">
                                    <div className="icon">
                                       <i className="fa fa-leaf iconss"></i>
                                      
                                    </div>
                                    <div className="our-feature__item-info">
                                        <h2 className="font-body--xl-500">100% Support</h2>
                                        <p className="font-body--md-400">100% healthy & Fresh food.</p>
                                    </div>
                                </div>
                                {/*<!-- Support  -->*/}
                                <div className="our-feature__item">
                                    <div className="icon">
                                        <i className="fa fa-headphones iconss"></i>
                                      
                                    </div>
                                    <div className="our-feature__item-info">
                                        <h2 className="font-body--xl-500">Great Support 24/7</h2>
                                        <p className="font-body--md-400">Instant access to Contact</p>
                                    </div>
                                </div>
                                {/*<!-- Customer feedback  -->*/}
                                <div className="our-feature__item">
                                    <div className="icon">
                                        <i className="fa fa-star iconss"></i>
                                    </div>
                                    <div className="our-feature__item-info">
                                        <h2 className="font-body--xl-500">Customer Feedback</h2>
                                        <p className="font-body--md-400">Our happy customer</p>
                                    </div>
                                </div>
                                {/*<!-- Secure Payment -->*/}
                                <div className="our-feature__item">
                                    <div className="icon">
                                        <i className="fa fa-shopping-bag fa-2x bagss"></i>
                                    </div>
                                    <div className="our-feature__item-info">
                                        <h2 className="font-body--xl-500">100% Sucure Payment</h2>
                                        <p className="font-body--md-400">We ensure your money is save</p>
                                    </div>
                                </div>
                                {/*<!-- Free Shipping  -->*/}
                                <div className="our-feature__item">
                                    <div className="icon">
                                       <i className="fa fa-truck iconss"></i>
                                    </div>
                                    <div className="our-feature__item-info">
                                        <h2 className="font-body--xl-500">Free Shipping</h2>
                                        <p className="font-body--md-400">Free shipping with discount</p>
                                    </div>
                                </div>
                                {/*<!-- Organic Food  -->*/}
                               
                            </div>
                           
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*<!-- Hero Two Section End   -->*/}

        {/*<!-- Hero Three  Section start  -->*/}
        <section className="hero section--xl section">
            <div className="container">
                <div className="row hero__content">
                    <div className="col-lg-6">
                        <div className="hero__text-content">
                            <h6>
                                We are Rio Aarman, You Enjoy Your Safety.
                            </h6>
                            <p className="info--two">
                                Ut suscipit egestas suscipit. Sed posuere pellentesque nunc, ultrices consectetur velit dapibus eu. Mauris sollicitudin dignissim diam, ac mattis eros accumsan rhoncus. Curabitur auctor bibendum nunc eget
                                elementum.
                            </p>
                            <ul className="hero__list-info">
                                <li>
                                    <span className="icon">
                                        <i className="fa fa-check iconss"></i>
                                    </span>
                                    <p>Sed in metus pellentesque.</p>
                                </li>
                                <li>
                                    <span className="icon">
                                        <i className="fa fa-check iconss"></i>
                                    </span>
                                    <p>Fusce et ex commodo, aliquam nulla efficitur, tempus lorem.</p>
                                </li>
                                <li>
                                    <span className="icon">
                                        <i className="fa fa-check iconss"></i>
                                    </span>
                                    <p>Maecenas ut nunc fringilla erat varius.</p>
                                </li>
                            </ul>
                            <Link to="/category" className="button button--md">
                                Shop now
                                <span>
                                    <i className="fa fa-arrow-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="hero__img-wrapper">
                            <img src="assets/images/banner/banner-sm-04.png" alt="img"  className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*<!-- Hero Three  Section End  -->*/}

            </div>
        );
    }
}

export default About;