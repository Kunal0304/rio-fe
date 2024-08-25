import { PureComponent } from "react";
import Slider from "react-slick";
import StartRatings from "../misc/StartRatings";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settingsTestimonials = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:false,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }
]
};

export class TestimonialsSection extends PureComponent{
    constructor(props){
        super(props)
        this.testimonialList = [...this.props.testimonialList] || [];
    }

    componentDidMount(){
        console.log("TestimonialsSection mounted")
    }

    render(){

        return (
            <section className="testimonial section section--gray-0 section--lg">
            <div className="container">
                <div className="section__head">
                    <h2 className="section--title-one font-title--sm">Client Testimonials</h2>
                    {/* <div className="arrows">
                        <button className="arrows__btn swiper-button--prev">
                            <i className="fa fa-arrow-left"></i>
                        </button>
                        <button className="arrows__btn swiper-button--next">
                            <i className="fa fa-arrow-right"></i>
                        </button>
                    </div> */}
                </div>
                <div className="swiper-container testimonial-slider--one">
                    <div className="swiper-wrapper">
                    <Slider {...settingsTestimonials}>

                        {
                            this.testimonialList.map((d,i)=>{
                                return (
                                        <div className="swiper-slide s1" key={i} data-id={d.id}>
                                            <div className="cards-tm">
                                                <h5>{d.title}</h5>
                                                <p className="cards-tm__text font-body--md-400">
                                                    {d.description}
                                                </p>
                                                <div className="cards-tm__info d-flex align-items-center justify-content-between">
                                                    <div className="cards-tm__info-left d-flex align-items-center">
                                                        <div className="cards-tm__info--user-img">
                                                            <img src={d.image_web} alt="user" />
                                                        </div>
                                                        <div className="cards-tm__info-left--designation">
                                                            <h2 className="font-body--lg-500">{d.name}</h2>
                                                            <span className="font-body--md-400">{d.designation}</span>
                                                        </div>
                                                    </div>
                                                    <div className="cards-tm__info-right">    
                                                        <StartRatings />
                                                    </div>
                                                </div>
                                                <span className="quotes">
                                                <i className="fa fa-quote-left fa-2x"></i>
                                                </span>
                                            </div>
                                        </div>
                                )
                            })
                        }
                    </Slider>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </section>
        )
    }


}