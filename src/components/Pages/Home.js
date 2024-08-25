import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import OurProductsSection from '../views/home/OurProductsSection';
import HotDealsSection from '../views/home/HotDealsSection';
import  FeaturedProductsSection  from '../views/home/FeaturedProductsSection';
import { TestimonialsSection } from '../views/home/TestimonialsSection';
import { Link } from 'react-router-dom';
import PopularCategoriesSection from '../views/home/PopularCategoriesSection';
import LoadingScreen from '../views/loading-screen';
import { withRouter } from "../../routed-component-wrapper";
import BaseAppComponent from '../base-app-component';

class Home extends BaseAppComponent {

    constructor(props){;
        super(props);
        this.state={
            data:{
                popularCategories:[],
                bannerItems:[],
                ourProductlist:[],
                hotDealProductList:[],
                featuredProductlist:[],
                testimonialList:[]
            },
            loaded:false
        }
        this.user = this.props.authData;
    }


    componentDidMount(){
        this.context.getAuthService().getHomePageData()
        .then(req=>{
            const data = req.data;
            const nd = {};
            nd.popularCategories=data.category
            nd.bannerItems=data.banner
            nd.ourProductlist=data.ourProductlist
            nd.hotDealProductList=data.hotDealProductlist
            nd.featuredProductlist=data.featuredProductlist
            nd.testimonialList=data.testimoniallist
            this.setState(ps=>{
                const ns = {...ps, data:nd, loaded:true}
                return ns;
            })

            /** TODO: chain the setting state instead of pushing everything at once.
             *  check the performance difference
             */
            /**
            this.setState({productList:data.category}, ()=>{
                this.setState({bannerItems:data.banner}, ()=>{
                    this.setState({ourProductlist:data.ourProductlist}, ()=>{
                        this.setState({hotDealProductList:data.hotDealProductlist}, ()=>{
                            this.setState({featuredProductlist:data.featuredProductlist}, ()=>{
                                this.setState({testimonialList:data.testimoniallist})
                            })
                        })
                    })
                })
            })
             */       
        })
        .catch(err=>{this.setState({loaded:true}); this.showToast("Data error! " + err.message)})
        .finally(()=>{console.log("home page data request finished")})
    }

    render() {
        if(!this.state.loaded)return<LoadingScreen show={true}/>
        else{
        const {popularCategories, ourProductlist, hotDealProductList, 
            featuredProductlist,testimonialList, bannerItems} = this.state.data
        return (
            <div>        
        <section className="banner banner--01">
            <div className="container">
                <div className="banner__wrapper text-shadow row">
                    <div className="col-lg-8 col-xs-2 col-12">
                        
                        <AwesomeSlider>
                        {
                            bannerItems.map((d,i)=>{
                                return (
                                <div key={i} data-src={d.image_web} className='text-section'> 
                                    <h1>{d.title}</h1>
                                    <p> sale up to 30 %</p>
                                    <a href={d.link} type='button' className='btn-slider'>Shop Now</a>
                                </div>
                                    )
                            })
                        }
                        </AwesomeSlider>

                    </div>
                    <div className="col-lg-4 col-xs-2 col-12">
                        <div className="banner__wrapper-img-sm">
                            <div className="banner__wrapper-img banner__wrapper--img-02">
                                <img src="assets/images/banner/banner-sm-05.png" alt="banner" />

                                <div className="banner__wrapper-text">
                                    <h5 className="font-body--md-500">Summer Sale</h5>
                                    <h2 className="font-title--sm">75% off</h2>
                                    <p className="font-body--md-400">Locks & Screws</p>
                                    <Link to="/category" className="button button--md">
                                        Shop now
                                        <span>
                                            <i className="fa fa-arrow-right whit"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="banner__wrapper-img banner__wrapper--img-03">
                                <img src="assets/images/banner/banner-sm-04.png" alt="banner" />

                                <div className="banner__wrapper-text">
                                    <h5 className="font-body--md-500">Best Deal</h5>
                                    <h2 className="font-title--sm">
                                        Special Products Deal of the Month
                                    </h2>
                                    <Link to="/category" className="button button--md">
                                        Shop now
                                        <span>
                                            <i className="fa fa-arrow-right whit"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>

        <section className="shipping-container section section--md pt-0">
            <div className="container">
                <div className="cards-ship cards-ship--one free">
                    <div className="cards-ship__item">
                        <span className="cards-ship__item-icon">
                          <i className="fa fa-truck icons"></i>
                        </span>
                       
                        <div className="cards-ship__item-process-info">
                            <h2 className="font-body--lg-600">Free Shipping</h2>
                            <p className="font-body--md-400">Free shipping on all your order</p>
                        </div>
                    </div>
                    <div className="cards-ship__item">
                        <span className="cards-ship__item-icon">
                            <i className="fa fa-headphones icons"></i>
                        </span>
                        <div className="cards-ship__item-process-info">
                            <h2 className="font-body--lg-600">Customer Support 24/7</h2>
                            <p className="font-body--md-400">Instant access to Support</p>
                        </div>
                    </div>
                    <div className="cards-ship__item">
                        <span className="cards-ship__item-icon">
                            <i className="fa fa-briefcase icons"></i>
                        </span>
                        <div className="cards-ship__item-process-info">
                            <h2 className="font-body--lg-600">100% Secure Payment</h2>
                            <p className="font-body--md-400">We ensure your money is save</p>
                        </div>
                    </div>
                    <div className="cards-ship__item">
                        <span className="cards-ship__item-icon">
                            <i className="fa fa-check icons"></i>
                        </span>
                        <div className="cards-ship__item-process-info">
                            <h2 className="font-body--lg-600">Money-Back Guarantee</h2>
                            <p className="font-body--md-400">30 Days Money-Back Guarantee</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        {/************************************** our products ******************************************/}            
        <PopularCategoriesSection categoryList={popularCategories} />
        {/************************************** our products ******************************************/}

        <OurProductsSection hook={this.props.rootHook} user={this.user} productList={ourProductlist} ></OurProductsSection>
     
        {/************************************** three cards ******************************************/}
        <section className="cyclone section section--lg">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-md-6">
                        <div className="cards-ss cards-ss--lg text-shadow">
                            <div className="cards-ss__img-wrapper">
                                <img src="assets/images/banner/banner-sm-03.png" alt="banner" />
                                <div className="cards-ss__content text-center">
                                    <h6 className="font-body--md-500">BEST DEALS</h6>
                                    <h2 className="font-title--lg">Door Locks</h2>

                                    <div id="countdownTwo" className="countdown-clock"></div>

                                    <Link to="/category" className="button button--md">
                                        Shop now
                                        <span>
                                            <i className="fa fa-arrow-right whit"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="cards-ss cards-ss--lg text-shadow">
                            <div className="cards-ss__img-wrapper">
                                <img src="assets/images/banner/banner-sm-01.png" alt="banner" />
                                <div className="cards-ss__content text-center">
                                    <h6 className="font-body--md-500">85% Fat Free</h6>
                                    <h2 className="font-title--lg">Caster Wheels</h2>
                                    <div className="cards-ss__startpackage">
                                        <p>Started at <span className="font-body--xxl-600">$79.99</span></p>
                                    </div>
                                    <Link to="/category" className="button button--md">
                                        Shop now
                                        <span>
                                            <i className="fa fa-arrow-right whit"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="cards-ss cards-ss--lg text-shadow">
                            <div className="cards-ss__img-wrapper">
                                <img src="assets/images/banner/banner-sm-02.png" alt="banner" />
                                <div className="cards-ss__content text-center">
                                    <h6 className="font-body--md-500">Summer Sale</h6>
                                    <h2 className="font-title--lg">Fastners Nuts</h2>

                                    <div className="cards-ss__saleoff">
                                        <p>Up to <span>64% off</span></p>
                                    </div>

                                    <Link to="/category" className="button button--md">
                                        Shop now
                                        <span>
                                            <i className="fa fa-arrow-right whit"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/************************************** hot deals ******************************************/}
        <HotDealsSection user={this.user} productList={hotDealProductList}/>

        <section className="banner-sale section--lg pb-0">
            <div className="container">
                <div className="banner-sale__img-wrapper">
                    <img src="assets/images/banner/banner-lg-16.jpg" alt="banner" />

                    <div className="banner-sale__text-content">
                        <h5>Summber Sale</h5>
                        <h2>37% <span>OFF</span></h2>
                        <p className="font-body--lg-400">
                            Free on all your order, Free Shipping and 30 days money-back guarantee
                        </p>
                        <Link to="/category" className="button button--md">
                            Shop now
                            <span>
                                <i className="fa fa-arrow-right whit"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/************************************** hot deals ******************************************/}
        <FeaturedProductsSection user={this.user} productList={featuredProductlist}/>

               
        {/************************************** testimonials ******************************************/}
        {/** override card style as there is too much margin above paragraph. overridden in index.css ***/} 
        <TestimonialsSection testimonialList={testimonialList}/>    
            </div>
        );
    }
}
}

export default withRouter(Home);