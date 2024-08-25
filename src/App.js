import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from "./components/Pages/Home";
import Category from "./components/Pages/Category";
import About from "./components/Pages/About";
import ContactUs from "./components/Pages/ContactUs";
import TermsConditions from "./components/Pages/TermsConditions";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import Cart from "./components/Pages/Cart";
import WishList from "./components/Pages/WishList";
import Header from './components/Header';
import Footer from './components/Footer';
import './assets/css/style.css';
import AuthService from './service/AuthService';
import AppProvider from './contexts/app-context';
import ProductDetails from './components/Pages/ProductDetails';
import CategoryProducts from './components/Pages/CategoryProducts';
import ProductDetailsModal from './components/modals/product-details-modal';
import WelcomeModal from './components/modals/welcome-modal';
import ToastAlert from './components/alerts/ToastAlert';
import LoadingScreen from './components/views/loading-screen';
import ResetPassword from './components/Pages/ResetPassword';

function App() {
  
  const [loginData, setLoginData] = useState(null);
  const [showWelcome, setShowWelcome] = useState('');
  const [productPreviewParams, setProductPreviewParams] = useState({show:false,pid:null});
  const [toast, setToast] = useState({msg:'',type:'info'});
  const _authService = AuthService;

  const ausListener = (data)=>{

    switch (data.trigger) {
      case 'toast':
          if(this.showToast)this.showToast(data.message, data.type)
        break;
    
      default:
        console.log('bad trigger')
        break;
    }

  }

  const getLoginData = async ()=>{
   return _authService.getLoginData().then(d=>{
      setLoginData(d);
      _authService.setListener(ausListener)
      return Promise.resolve(d)
    });
  }



  const storeLoginData=(data)=>{
    setLoginData(data);
    if(_authService.saveLoginData(data))
        getLoginData();
  }

  const showToastAlert=(msg,type)=>{
    type = type || 'danger'
    setToast({msg:msg,type:type,tm:(new Date()).getTime()})
  }

  useEffect(()=>{
   getLoginData().then(d=>{
      if(!(d.user && d.user.id>0))
        setTimeout(()=>{ setShowWelcome('welcome')}, 1000*10) // 10 secs for 1st welcome
    });
  },[])

  const hook = {
    setProductPreview:setProductPreviewParams,
    authService:_authService,
    showToast:showToastAlert,
    showWelcome:(msg)=>{setShowWelcome(msg)}
  }

  if(!loginData)return <LoadingScreen/>
  
  return (
    <div className="wrapper">
    {/**<Router basename={'/riofe'}>      "homepage": "/riofe",   */}
    <Router>
      <AppProvider loginData={loginData} rootHook={hook}>
        <div className='main'>
        <Header showToast={showToastAlert} />
          <Routes>
            <Route exact path="/" element={<Home showToast={showToastAlert}/>}/>
            <Route exact path="/category" element={<Category showToast={showToastAlert}/>}/>
            <Route exact path="/categoryproducts" element={<CategoryProducts showToast={showToastAlert}/>}/>{/* :catid? is not working for whatever reasons */}
            <Route path="/categoryproducts/:catid" element={<CategoryProducts showToast={showToastAlert}/>}/> 
            <Route exact path="/search" element={<CategoryProducts isSearch={true} showToast={showToastAlert}/>}/>
            <Route path="/product-detail/:id"  element={<ProductDetails tt={(new Date()).getTime()} showToast={showToastAlert}/>}/>
            <Route exact path="/about" element={<About showToast={showToastAlert} />}/>
            <Route exact path="/contact-us" element={<ContactUs showToast={showToastAlert}/>}/>
            <Route exact path="/terms-condition" element={<TermsConditions showToast={showToastAlert}/>} />
            <Route exact path="/privacy-policy" element={<PrivacyPolicy showToast={showToastAlert}/>}/>
            <Route exact path="/login" element={<SignIn showToast={showToastAlert}/>}/>
            <Route exact path="/register" element={<SignUp showToast={showToastAlert}/>}/>
            <Route exact path="/cart" element={<Cart showToast={showToastAlert}/>}/>
            <Route exact path="/wishlist" element={<WishList showToast={showToastAlert}/>}/>
            <Route exact path="/resetpassword" element={<ResetPassword showToast={showToastAlert}/>}/>

            
            {/* <Route path="*" element={<NotFound/>}/> */}
          </Routes>
         <Footer authService={_authService} showToast={showToastAlert}/>
         <ProductDetailsModal 
            loginData={loginData}  
            rootHook={hook} 
            productPreviewParams={productPreviewParams} 
            setProductPreviewParams={setProductPreviewParams} 
            tt={(new Date()).getTime()}
          />

          <WelcomeModal message={showWelcome} rootHook={hook} />

         <ToastAlert data={toast} />
        </div>
        </AppProvider>
    </Router>

{/**
    <Router basename={process.env.PUBLIC_URL}>
      <AppProvider>
        <div className='main'>
        <Header/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path={`${process.env.PUBLIC_URL}/category`} element={<Category/>} />
            <Route exact path={`${process.env.PUBLIC_URL}/about`} element={<About/>} />
            <Route exact path={`${process.env.PUBLIC_URL}/contact-us`} element={<ContactUs/>}/>
            <Route exact path={`${process.env.PUBLIC_URL}/terms-condition`} element={<TermsConditions/>} />
            <Route exact path={`${process.env.PUBLIC_URL}/privacy-policy`} element={<PrivacyPolicy/>} />
            <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<SignIn/>} />
            <Route exact path={`${process.env.PUBLIC_URL}/register`} element={<SignUp/>} />
            <Route exact path={`${process.env.PUBLIC_URL}/cart`} element={<Cart/>} />
            <Route exact path={`${process.env.PUBLIC_URL}/wishlist`} element={<WishList/>} />
          </Routes>
         <Footer/>
        </div>
        </AppProvider>
    </Router>
    */}
  </div>
  );
}

export default App;
