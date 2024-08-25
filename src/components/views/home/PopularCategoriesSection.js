import { Component } from "react";
import { Link } from "react-router-dom";
import CategoryItem from "../misc/category-item";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/*
import Slider from "react-slick";
const sliderConfig = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
};
*/

export default class PopularCategoriesSection extends Component{

    render(){

        const productList = this.props.categoryList || [];


        return(
        <section className="popular-categories section section--md">
            <div className="container">
                <div className="section__head">
                    <h2 className="section--title-one font-title--sm">Popular Categories</h2>
                    <Link to={"/category"}>
                        View All
                        <span>
                           <i className="fa fa-arrow-right"></i>
                        </span>
                    </Link>
                </div>
                <div className="popular-categories__wrapper">
                {productList?.map((item, i)=>{
                    const {id} = item
                    return <CategoryItem 
                        item={item}
                        key={id}
                    />
                })}
                </div>
                <div className="rt">
                    <div className="popular-category_mobile">

                    {productList?.map((d, i)=>{
                        return (
                            <Link to={"/categoryproducts/"+d.id} key={i} className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src={d.image_web} alt={d.title} />
                                </div>
                                <h5 className="font-body--xl-500">{d.title}</h5>
                            </Link>
                        )
                    })}
                    
                    </div>
                </div>
                {/** 
                <div className="swiper-container popular-categories--slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/rio.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Rio Aarman</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/lock.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Lock</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/door.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Door Fiting</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/hang.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Hangers</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/fastners.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Fastners</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/nuts.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Nuts</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/hooks.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Hooks</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/glass.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Glass Fiting</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/hand.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Handles</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/screws.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Screws</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/caster.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Caster Wheels</h5>
                            </a>
                        </div>

                        <div className="swiper-slide">
                            <a href="# " className="cards-sm popular-categories__wrapper-item">
                                <div className="cards-sm__img-wrapper">
                                    <img src="assets/images/categories/pipe.png" alt="img-01" />
                                </div>
                                <h5 className="font-body--xl-500">Pipe fiting</h5>
                            </a>
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                 */}
            </div>
        </section>
        )
    }

}