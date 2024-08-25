import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/app-context';
import { withRouter } from '../../routed-component-wrapper';
import LoadingScreen from '../views/loading-screen';

class Category extends Component {     
    
    static contextType = AppContext
    state = {
        loading:true
    }
    render() {
        const products = this.context.getCategories(); 
        if(Array.isArray(products) && !products.length) return <LoadingScreen show={true}/>
        return (
            <div>
                <section className="section breedcrumb">
                <div className="breedcrumb__img-wrapper">
                    <img src="assets/images/banner/breedcrumb.jpg" alt="breedcrumb" />
                    <div className="container">
                    <ul className="breedcrumb__content">
                        <li>
                        <Link to="/">
                        <i className="fa fa-home iconss"></i>
                            <span> {'>'} </span>
                        </Link>
                        </li>
                        <li className="active"><span className="breadcrumb-target">Product Categories</span></li>
                    </ul>
                    </div>
                </div>
                </section>
                <section className="popular-categories section section--md all-categories">
                        <div className="container">
                            <div className="section__head">
                                <h2 className="section--title-one font-title--sm">Product Categories</h2>
                                {/**
                                <Link to="/shop-01.html">
                                    View All
                                    <span>
                                    <i className="fa fa-arrow-right"></i>
                                    </span>
                                </Link>
                                */}
                            </div>

                                {
                                    (products!=null)
                                    ?(  
                                        <div className="popular-categories__wrapper">         
                                        {products?.map((d,i)=>{
                                            if(!d.id)return null;
                                            return (
                                                
                                                    <Link key={d.id || i} to={"/categoryproducts/"+d.id} className="cards-sm popular-categories__wrapper-item">
                                                        <div className="cards-sm__img-wrapper">
                                                            <img src={d.image_web} alt={d.title} />
                                                        </div>
                                                        <h5 className="font-body--xl-500">{d.title}</h5>            
                                                    </Link>
                                            )
                                        })}
                                        </div>
                                    )
                                    :(
                                        <div>
                                            <h3>No data for the selected category</h3>
                                            <Link className='button button--lg' to="/">
                                                Continue shopping
                                            </Link>
                                        </div>
                                    )
                                }
                            {/*
                            <div className="swiper-container popular-categories--slider">
                                <div className="swiper-wrapper">

                                {
                                    (products!=null)
                                    ?(
                                        products?.map((d,i)=>{
                                            
                                            if(!d.id)return null;
                                            return (
                                                <div className="swiper-slide">
                                                    <Link to="/# " className="cards-sm popular-categories__wrapper-item">
                                                        <div className="cards-sm__img-wrapper">
                                                            <img src="assets/images/categories/rio.png" alt="img-01" />
                                                        </div>
                                                        <h5 className="font-body--xl-500">Rio Aarman</h5>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    )
                                    :(
                                        <div>
                                            <h3>No data for the selected category</h3>
                                            <Link className='button button--lg' to="/">
                                                Continue shopping
                                            </Link>
                                        </div>
                                    )
                                }
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                            */}
                        </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Category);