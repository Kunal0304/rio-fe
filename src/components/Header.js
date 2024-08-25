import React from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_ADDRESS_SHORT, CLIENT_CONTACT } from '../AppConfig';
import { SaticAssets } from '../Constants';
import { withRouter } from '../routed-component-wrapper';
import BaseAppComponent from './base-app-component';
import HeaderCart from './views/cart/header-cart';
import ShoppingCart from './views/cart/shopping-cart';

class Header extends BaseAppComponent {

    state = {
        viewCart:false,
        showMenu:false,
        searchParams:''
    }

    componentDidMount(){
        this.context.getCategories();
    }


    toggleCart = ()=>{
        const view = !this.state.viewCart;
        this.setState({viewCart:view})
    }

    showMenu=()=>{
        this.setState({showMenu:true})
    }

    hideMenu=()=>{
        this.setState({showMenu:false})
    }

    setActiveLink=(e)=>{
        this.hideMenu();
    }

    openLink=()=>{
        
    }

    setSearch=(el)=>{
        this.setState({searchParams:el.value})
    }

    getSearch=()=>{
        if(this.state.searchParams!==''){
            const {searchParams} = this.state;
            this.setState({searchParams:''})
            const {navigate} = this.props;
            navigate('/search?s='+searchParams);
        }
    }

    render() {
        const {getUser, getCategories} = this.context;
        let categories = getCategories()
        if(Array.isArray(categories))categories = categories.splice(0, 10);
        else categories=[];
        const user = getUser()
        
        return (
            <div>
                <ShoppingCart toggleCart={this.toggleCart} view={this.state.viewCart} />
                <header className="header header--one">
                    <div className="header__top">
                        <div className="container">
                            <div className="header__top-content">
                                <div className="header__top-left">
                                    <p className="font-body--sm">
                                        <span>
                                            <i className="fa fa-map color-white"></i>
                                        </span>
                                        {CLIENT_ADDRESS_SHORT}
                                    </p>
                                </div>
                                <div className="header__top-right">
                                <div className="header__in">
                                    {
                                            (user.email)
                                            ?(<span className='user-welcome-header'>Welcome {user.email}!
                                                <button className="btn btn-light" onClick={()=>{this.context.logout()}}>Logout</button>
                                            </span>)
                                            :(
                                                <span>
                                                    <Link to="/login">Sign in </Link> {" / "} 
                                                    <Link to="/register">Sign up</Link>
                                                </span>
                                            )
                                    }
                                    </div>
                                </div>
                                </div>
                                <div className="header_searchfrom_mobile">
                                    <input className="search-box" type="text" placeholder="Search" value={this.state.searchParams} onChange={(e)=>{this.setSearch(e.target)}} />
                                    <button type="submit" className="search-btn button" onClick={()=>{this.getSearch()}}>
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                        </div>
                    </div>
                    <div className="header__center">
                        <div className="container">
                            <div className="header__center-content">
                                <div className="header__brand">
                                    <button className="header__sidebar-btn" onClick={()=>{this.showMenu()}}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M3 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    </button>
                                    <Link to="/">
                                        <img src={SaticAssets.LOGO_LINK} alt="" />
                                    </Link>
                                </div>
                                <div className="header__input-form">
                                    <input type="text" placeholder="Search" value={this.state.searchParams} onChange={(e)=>{this.setSearch(e.target)}} />
                                    <span className="search-icon">
                                        <i className="fa fa-search"></i>
                                    </span>
                                    <button type="submit" className="search-btn button button--md" onClick={()=>{this.getSearch()}}>
                                        Search
                                    </button>
                                </div>
                                <HeaderCart toggleCart={this.toggleCart} />
                            </div>
                        </div>
                    </div>
                    <div className="header__bottom">
                        <div className="container">
                            <div className="header__bottom-content">
                                <ul className="header__navigation-menu">
                                    <li className="header__navigation-menu-link active">
                                        <Link to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="header__navigation-menu-link">
                                        <Link to="/category">
                                            Product Category
                                            <span className="drop-icon">
                                            <img src="" alt=""></img>
                                            </span>
                                        </Link>
                                        <ul className="header__navigation-drop-menu">
                                            {
                                                categories?.map((d,i)=>{
                                                    if(!d.id)return null;
                                                    return (
                                                        <li key={i} className="header__navigation-drop-menu-link">
                                                            <Link to={"/categoryproducts/"+d.id}>{d.title}</Link>
                                                        </li>
                                                    )
                                                })
                                                
                                            }
                                            {/**
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Castor and Wheels</a>
                                            </li>
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Lock</a>
                                            </li>
                                            
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Rio Aarman</a>
                                            </li>
                                            
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Door Fitings</a>
                                            </li>
                                            
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Screws</a>
                                            </li>
                                            
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Pipe Fittings</a>
                                            </li>
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Hangers</a>
                                            </li>
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Fastners & Nuts</a>
                                            </li>
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Hooks</a>
                                            </li>
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Hingers</a>
                                            </li>
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Glass Fitings</a>
                                            </li>
                                            <li className="header__navigation-drop-menu-link">
                                                <a href="/">Handles</a>
                                            </li>
                                            */}
                                        </ul>
                                    </li>

                                    <li className="header__navigation-menu-link active">
                                        <Link to="/categoryproducts/24">
                                            Rio Aarman
                                        </Link>
                                    </li>
                                                                        
                                    <li className="header__navigation-menu-link">
                                        <Link to="/about">About us </Link>
                                    </li>
                                    <li className="header__navigation-menu-link">
                                        <Link to="/contact-us">Contact us</Link>
                                    </li>
                                </ul>

                                <div className="header__telephone-number">
                                    <span>
                                    <i className="fa fa-phone" style={{marginRight:'10px'}}></i>
                                        <a className='white' href={'tel:'+CLIENT_CONTACT}>{CLIENT_CONTACT}</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="header__sidebar-menu" style={{left:(this.state.showMenu)?0:''}}>
                        
                        <button className="header__close" onClick={()=>{this.hideMenu()}}>
                            <i className="fa fa-close"></i>
                        </button>

                        <div className="header__mobile-links">
                            <div className="header__mobile-top">
                                {/* <form action="#" style={{display:'none'}}>
                                    <div className="header__mobile-input">
                                        <input type="text" placeholder="Search" />
                                        <button className="search-btn">
                                            <img src="" alt=""></img>
                                        </button>
                                    </div>
                                </form> */}
                                <ul className="header__mobile-menu">
                                    <li className="header__mobile-menu-item">
                                        <Link to="/" className="header__mobile-menu-item-link" onClick={(e)=>{this.setActiveLink(e)}}>
                                            Home
                                            <span className="drop-icon">
                                                <i className="fa fa-home"></i>
                                            </span>
                                        </Link>
                                    </li>

                                    <li className="header__mobile-menu-item">
                                        <Link to="/category" className="header__mobile-menu-item-link" onClick={(e)=>{this.setActiveLink(e)}}>
                                            Categories
                                            <span className="drop-icon">
                                                <i className="fa fa-th-large"></i>
                                            </span>
                                        </Link>
                                    </li>

                                    <li className="header__mobile-menu-item">
                                        <Link to="/categoryproducts/24" className="header__mobile-menu-item-link" onClick={(e)=>{this.setActiveLink(e)}}>
                                            Rio Aarman
                                            <span className="drop-icon">
                                                <i className="fa fa-circle-o"></i>
                                            </span>
                                        </Link>
                                    </li>

                                    {/* <li className="header__mobile-menu-item">
                                        <a href="/" className="header__mobile-menu-item-link">
                                            Shop
                                            <span className="drop-icon">
                                                <i className="fa fa-shopping-cart"></i>
                                            </span>
                                        </a>
                                        <ul className="header__mobile-dropdown-menu">
                                            <li className="header__mobile-dropdown-menu-link">
                                                <a href="/">Caster & Wheels</a>
                                            </li>
                                            <li className="header__mobile-dropdown-menu-link">
                                                <a href="/">Lock</a>
                                            </li>
                                            <li className="header__mobile-dropdown-menu-link">
                                                <a href="/">Rio Aarman</a>
                                            </li>
                                            <li className="header__mobile-dropdown-menu-link">
                                                <a href="/">Door Fitings</a>
                                            </li>
                                            <li className="header__mobile-dropdown-menu-link">
                                                <a href="/">Screws</a>
                                            </li>
                                            <li className="header__mobile-dropdown-menu-link">
                                                <a href="/">Pipe Fitings</a>
                                            </li>
                                            <li className="header__mobile-dropdown-menu-link">
                                                <a href="/">Hangers</a>
                                            </li>
                                        </ul>
                                    </li> */}
                                    
                                    <li className="header__mobile-menu-item">
                                        <Link to="/about" className="header__mobile-menu-item-link" onClick={(e)=>{this.setActiveLink(e)}}>
                                            About Us
                                            <span className="drop-icon">
                                                <i className="fa fa-info-circle"></i>
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="header__mobile-menu-item">
                                        <Link to="/contact-us" className="header__mobile-menu-item-link" onClick={(e)=>{this.setActiveLink(e)}}>
                                            Contact Us
                                            <span className="drop-icon">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                        </Link>
                                    </li>

                                    <li className="header__mobile-menu-item">

                                    {
                                            (user.email)
                                            ?(<div to="/login" className="header__mobile-menu-item-link" onClick={(e)=>{this.context.logout(); this.setActiveLink(e)}}>
                                                Logout
                                                <span className="drop-icon">
                                                    <i className="fa fa-sign-out"></i>
                                                </span>
                                            </div>
                                            )
                                            :(
                                                <Link to="/login" className="header__mobile-menu-item-link" onClick={(e)=>{this.setActiveLink(e)}}>
                                                    Login
                                                    <span className="drop-icon">
                                                        <i className="fa fa-sign-in"></i>
                                                    </span>
                                                </Link>
                                            )
                                    }


                                        
                                    </li>

                                </ul>
                            </div>


                            <div className="header__mobile-bottom">
                                <div className="header__mobile-user">
                                    <div><b>Logged in as:</b></div>
                                    <div>{user.email}</div>
                                </div>
                            </div>

                            {/* <div className="header__mobile-bottom">
                                <div className="header__mobile-user">
                                    <div className="header__mobile-user--img">
                                        <img src="assets/images/user/img-03.png" alt=""/>
                                    </div>
                                    <div className="header__mobile-user--info">
                                        <h2 className="font-body--lg-500">Dianne Russell</h2>
                                        <p className="font-body--md-400">dianne.russell@gmail.com</p>
                                    </div>
                                </div>
                                <div className="header__mobile-action d-none">
                                    <a href="/" className="button button--md">Sign in</a>
                                    <a href="/" className="button button--md button--disable">Sign up</a>
                                </div>
                            </div> */}




                        </div>
                    </div>
                    




                </header>
            </div>
        );
    }
}

export default withRouter(Header);