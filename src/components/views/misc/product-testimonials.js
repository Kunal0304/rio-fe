import { Component } from "react";
import StartRatings from "./StartRatings";

const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows:false,
};


export default class ProductTestimonials extends Component{

    render(){
        const { testimonials } = this.props;
        if(!testimonials)return null;
        return(
            <section className="section section--xl related">
            <div className="container">
                <div className="section__head justify-content-center">
                    <h2 className="section--title-four font-title--sm">Testimonials</h2>
                </div>
                <div>
                    {
                        testimonials?.map((d,i)=>{
                            let name = (d.name && d.name.trim()!=='')?d.name.trim():'Anonymous';
                            return (
                                <div key={d.id+i} className="cards-md product-testimonial">
                                    <h5>{name}</h5><span>{(d.status==="approved")?' (Verified)':''}</span>
                                    <p>{d.comment}</p>
                                    <StartRatings className="testimonial-rating" rating={parseInt(d.rating)}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            </section>
        )
    }
}



// <div className="cards-md__img-wrapper">
// <Link to={{pathname:"/product-detail/"+d.id, pid:d.id }}>
//     <img src={d.image_web} alt={d.title} />
// </Link>
// <span className="tag danger font-body--md-400" style={{display:(!isNaN(d.sp) && d.sp>50)}}>Sale {d.sp}%</span>
// <div className="cards-md__favs-list">
// <span className="action-btn">
// <i className="fa fa-heart"></i>
// </span>
// <span className="action-btn" data-bs-toggle="modal" data-bs-target="#productView">
// <i className="fa fa-eye"></i>
// </span>
// </div>
// </div>
// <div className="cards-md__info d-flex justify-content-between align-items-center">
// <a href="product-details.html" className="cards-md__info-left">
//     <h6 className="font-body--md-400">{d.title}</h6>
//     <div className="cards-md__info-price">
//         <span className="font-body--lg-500">{formatPrice(d.mrp_price)}</span>
//         <del className="font-body--lg-400">{formatPrice(d.price)}</del>
//     </div>
//     <StartRatings />
// </a>
// <div className="cards-md__info-right text-center">
// <p className="text-black">Add to Cart</p>
// <span className="action-btn">
// <i className="fa fa-shopping-bag bags"></i>
// </span>
// </div>
// </div>
// </div>
// </div>