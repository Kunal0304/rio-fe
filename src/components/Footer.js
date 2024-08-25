import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_CONTACT, CLIENT_EMAIL_PRIMARY } from '../AppConfig';
import { SaticAssets } from '../Constants';
import SocialBar from './views/misc/social-bar';

class Footer extends Component {

    state = {
        email:''
    }
    isBusy=false;

    subscribe=()=>{
        if(this.state.email!=='' && !this.isBusy){
            this.isBusy = true 
            this.props.authService?.subscribeToNewsLetter(this.state.email)
            .then(res=>{
                const {data} = res;
                if(data.status){this.props?.showToast(data.message, 'success');this.setState({email:''})}
                else throw new Error(data.message)
            })
            .catch(err=>{
                this.props?.showToast(err.message, 'danger')
            })
            .finally(e=>{
                this.isBusy = false;
            })
        }
    }

    render() {
        return (
            <div>
                 <section className="call-to-action section--gray">
                    <div className="container">
                        <div className="newsletter newsletter--one">
                            <div className="newsletter__leftcontent">
                                <h2 className="font-body--xxxl-600">Subscribe Us</h2>
                                <p className="font-body--md-400">
                                    Subscribe Us & Get Latest Updates.
                                </p>
                            </div>
                            <div className="newsletter__rightcontent">
                                <div className="newsletter__input">
                                    <input type="text" placeholder="Your Email Address" value={this.state.email} onChange={e=>{this.setState({email:e.target.value})}}/>
                                    <button className="button button--lg" type="submit" onClick={e=>{this.subscribe()}}>
                                        Subscribe
                                    </button>
                                </div>
                                <SocialBar />
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer footer--one">
                    <div className="container">
                        <div className="footer__top">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="footer__brand-info">
                                        <div className="footer__brand-info-logo">
                                            <img src={ SaticAssets.LOGO_LINK_WHITE } alt="" />
                                        </div>
                                        <p className="font-body--md-400">
                                            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.
                                        </p>
                                        <div className="footer__brand-info-contact">
                                            <a href={"tel:"+CLIENT_CONTACT}><span>{CLIENT_CONTACT}</span></a>
                                            or
                                            <a href={"mailto:CLIENT_EMAIL_PRIMARY"}><span>{CLIENT_EMAIL_PRIMARY}</span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-6">
                                    
                                    <ul className="footer__navigation">
                                        <li className="footer__navigation-title">
                                            <h2 className="font-body--lg-500">Useful Links</h2>
                                        </li>
                                        <li className="footer__navigation-link">
                                            <Link to="/contact-us"> Contact </Link>
                                        </li>
                                      
                                        <li className="footer__navigation-link">
                                            <Link to="/terms-condition"> Terms &amp; Condition </Link>
                                        </li>
                                        <li className="footer__navigation-link">
                                            <Link to="/privacy-policy"> Privacy Policy </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-2 col-md-3 col-6">
                                <ul className="footer__navigation">
                                        <li className="footer__navigation-title">
                                            <h2 className="font-body--lg-500">Cities We Serve</h2>
                                        </li>
                                        <li className="footer__navigation-link">
                                            <a href="/"> Delhi</a>
                                        </li>
                                        <li className="footer__navigation-link">
                                            <a href="/"> Mumbai </a>
                                        </li>
                                        <li className="footer__navigation-link">
                                            <a href="/"> Bangalore </a>
                                        </li>
                                        <li className="footer__navigation-link">
                                            <a href="/"> Noida </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-2 col-md-3 col-6">
                                    <ul className="footer__navigation">
                                        <li className="footer__navigation-title">
                                            <h2 className="font-body--lg-500">My Account</h2>
                                        </li>
                                    
                                        <li className="footer__navigation-link">
                                            <Link to="/login"> Sign in </Link>
                                        </li>
                                        <li className="footer__navigation-link">
                                            <Link to="/register">Sign Up</Link>
                                        </li>
                                        <li className="footer__navigation-link">
                                            <Link to="/wishlist"> Wishlist </Link>
                                        </li>
                                    </ul>
                                    
                                    
                                </div>
                                <div className="col-lg-2 col-md-3 col-6">
                                    <ul className="footer__navigation">
                                        <li className="footer__navigation-title">
                                            <h2 className="font-body--lg-500">Categories</h2>
                                        </li>
                                        
                                        <li className="footer__navigation-link">
                                            <a href="/">Rio Aarman </a>
                                        </li>
                                        <li className="footer__navigation-link">
                                            <a href="/"> Caster & Wheels </a>
                                        </li>
                                       
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="footer__bottom">
                            <p className="footer__copyright-text">
                            Rio Aarman © 2022. All Rights Reserved. Design By- Digital Highs & Vcogs
                            </p>
                            <div className="footer__partner d-flex">
                                <a href="/" className="footer__partner-item">
                                    <img src="/assets/images/brand-icon/img-01.png" alt="" />
                                </a>
                                <a  href="/" className="footer__partner-item">
                                    <img src="/assets/images/brand-icon/img-02.png" alt="" />
                                </a>
                                <a  href="/" className="footer__partner-item">
                                    <img src="/assets/images/brand-icon/img-03.png" alt="" />
                                </a>
                                <a  href="/" className="footer__partner-item">
                                    <img src="/assets/images/brand-icon/img-04.png" alt="" />
                                </a>
                                <a  href="/" className="footer__partner-item">
                                    <img src="/assets/images/brand-icon/img-05.png" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>

                <div className="modal fade newsletter-popup" id="newsletter" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row newsletter-popup__content">
                                
                                    <div className="col-lg-1"></div>
                                    <div className="col-lg-10">
                                    <div className="newsletter-popup__text-content">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            <h5 className="font-title--xl">Welcome to <br/> Rio Aarman</h5>
                                            <p className="font-body--lg">
                                                Sign in to Browse Our Varied Categories and Raise  
                                                <span>Order </span> Requests.
                                            </p>

                                            <form action="#">
                                                <div className="contact-mail">
                                                    <div>
                                                    <input type="text" name="phone" size="10" pattern="[1-9]{1}[0-9]{9}" placeholder="Enter Email & Phone Number"/>
                                                    <select name="languages" id="lang">
                <option value="javascript">Wholesale</option>
                <option value="php">Retail</option>
                <option value="php">Distributor</option>
                
            </select>
                                                    </div>
                                                    <div>
                                                    
                                                    </div>
                                                    <button className="button button--md">SUBMIT</button>
                                                    
                                                </div>
                                            
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
           
        );
    }
}

export default Footer;