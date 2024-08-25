import axios from "axios";
import {BASE_URL} from "../AppConfig";

const request_time_out= 5000;
class AuthService{

    static DATA_KEY = '5d755cfa-2bc6-4aa8-b5ad-ba20cae29df2';

    #random=null;
    userType='';
    lFn=null;

    wrapAxios(instance){
        instance.defaults.timeout = request_time_out;
        instance.interceptors.response.use(
            undefined,
            err=>{
                if(err.response.status===401){
                    err.message = err.response.statusText  = "Your session has expired. Please login again to continue.";
                }
                throw err
            }
        )
        return instance
    }


    setRandom(val){
        this.#random = val;
    }

    setUserType(val){
        this.userType = val;
    }

    showDangerToast(msg){
        if(this.lFn!==null){
            this.lFn({trigger:'toast', type:'danger', message:msg})
        }
    }

    setListener(fn){
        this.lFn = fn
    }

    getAxios(){
        return this.wrapAxios(axios.create({
            baseURL:BASE_URL,
            headers: {'Content-Type': 'application/json', 'Accept':'application/json'},
            mode:'cors'
        }))
    }

    sendGet(url,data){
        const _data = {...data, user_type:this.userType}
        return this.getAxios().get(url,_data)
    }

    sendPost(url,data){
        const _data = {...data, user_type:this.userType}
        return this.getAxios().post(url,_data)
    }


    getAuthAxios(){
        if(this.random===null)throw new Error('Bearer not set.')
        return this.wrapAxios(axios.create({
            withCredentials: true,
            baseURL:BASE_URL,
            headers:{
                'Authorization':`Bearer ${this.#random}`,
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            mode:'cors'
        }))
    }


    sendAuthPost(url,data){
        const _data = {...data, user_type:this.userType}
        return  this.getAuthAxios().post(url, _data)
    }


    sendAuthGet(url,data){
        const _data = {...data, user_type:this.userType}
        return  this.getAuthAxios().get(url, _data)
    }

    getHomePageData(){
        return this.sendPost('home-screen',{})
    }

    getProductDetails(productId){
        return this.sendPost('product-detail', {id:productId})
    }


    getCategoryProducts(catId){
        return this.sendPost('product', {category:catId})
    }

    getSearchResults(key){
        return this.sendPost('product', {searchByTitle:key})
    }

    subscribeToNewsLetter(_email){
        return this.sendPost('subscribe', {email:_email})
    }

    submitContactMessage(n,e,p,s,m){
        return this.sendPost('contactMail', {name:n,email:e,phone:p,subject:s,message:m})
    }

    login(data){
        return axios.post(`${BASE_URL}/login`,data);
    }

    async logout(){
        try { 
            localStorage.removeItem(AuthService.DATA_KEY)
            return Promise.resolve(true);
        } catch (error) {
            return Promise.resolve(false);
        }
    }

    register(data){
        console.log('register', data)
        return axios.post(`${BASE_URL}/register`,data);
    }

    verifyOTP(data){
        return axios.post(`${BASE_URL}/otpVerify`,data);
    }

    resendOTP(data){
        return axios.post(`${BASE_URL}/resendOtp`,data);
    }

    async getLoginData(){
        try { 
            const data = JSON.parse(localStorage.getItem(AuthService.DATA_KEY))
            this.setRandom(data.token);
            this.setUserType(data.user.user_type)
            //window.dispatchEvent(new CustomEvent('loginupdated', {data:data}))
            return Promise.resolve(data);
        } catch (error) {
            return Promise.resolve({});
        }
    }

    saveLoginData(data){
        try {
            if(!data)throw new Error('')
            if(typeof data === 'object' && data.constructor === Object)data = JSON.stringify(data)
            localStorage.setItem(AuthService.DATA_KEY, data);
            this.getLoginData();
            return true;
        } catch (error) {
            return false;
        }

    }

    getSavedCart(){
        const body={
            userid:this.logindata.user.id,
            useremail:this.logindata.user.email,
            user_type:this.userType
        }
        return this.getAxios().get(BASE_URL+'/getCartList', body, {withCredentials: true})
    }

    // need to use abort controller
    RQ={};
    addProductToCart(pid,qty,fn){
        if(this.RQ[pid]!==undefined){
            clearTimeout(this.RQ[pid])
        }
        const _this = this;
        this.RQ[pid] = setTimeout(()=>{
            this.sendAuthPost('addToCart', {product_id:pid, qty:qty})
            .then((res)=>{
                if(res.data.status)fn({status:true, msg:res.data.id})
                else fn({status:false, msg:res.data.message})
            })
            .catch(err=>{
                fn({status:false, msg:err.message})
            })
            .finally(()=>{
                _this.RQ[pid] = undefined;
                delete _this.RQ[pid]
            })
        },250)
    }


    clearCart(){

    }

    DQ={};
    removeProductFromCart(cartId, fn){
        const _this = this;
        if(this.DQ[cartId]===undefined){
            this.sendAuthPost('deleteCart', {"cartId":cartId})
            .then((res)=>{
                if(res.data.status)fn({status:true, msg:res.data.message})
                else fn({status:false, msg:res.data.message})
            })
            .catch(err=>{
                fn({status:false, msg:err.message})
            })
            .finally(()=>{
                _this.DQ[cartId] = undefined;
                delete _this.DQ[cartId];
            })
        }
    }

    getAllCart(fn){
        this.sendAuthGet('getCartList', {})
        .then((res)=>{
            if(res.data.status)fn({status:true, msg:res.data.list})
            else fn({status:false, msg:res.data.message})
        })
        .catch(err=>{
            fn({status:false, msg:err.message})
        })
    }

    applyCoupon(code, fn){
        this.sendAuthPost('applyCoupon', {"coupon":code})
        .then((res)=>{
            if(res.data.status)fn({status:true, msg:res.data.message})
            else fn({status:false, msg:res.data.message})
        })
        .catch(err=>{
            fn({status:false, msg:err.message})
        })
    }

    removeCoupon(code){

    }


    orderRequested=false;
    createOrder(totalAmt, subtotal, shipping_amt, couponAmount, tax_amt, fn){
        const _this=this;
        if(!_this.orderRequested){
            _this.orderRequested = true;
            this.sendAuthPost('prepare-checkout', {
                total:totalAmt,
                subTotal:subtotal,
                shippingCharge:shipping_amt,
                couponDiscount:couponAmount,
                tax:tax_amt,
                user_type:this.userType
            })
            .then((res)=>{
                if(res.data.status)fn({status:true, msg:res.data.id})
                else fn({status:false, msg:res.data.message})
            })
            .catch(err=>{
                fn({status:false, msg:err.message})
            })
            .finally(()=>{
                _this.orderRequested=false;
            })
        }
    }

    addProductToWishList(pid,fn){
        this.sendAuthPost('addWishList', {product_id:pid})
        .then((res)=>{
            if(res.data.status)fn({status:true, msg:res.data.id})
            else fn({status:false, msg:res.data.message})
        })
        .catch(err=>{
            fn({status:false, msg:err.message})
        })
    }

    removeFromWishList(pid,fn){
        this.sendAuthPost('deleteWishList', {wishlistId:pid})
        .then((res)=>{
            if(res.data.status)fn({status:true, msg:res.data.message})
            else fn({status:false, msg:res.data.message})
        })
        .catch(err=>{
            fn({status:false, msg:err.message})
        })
    }

    getAllWishList(fn){
        this.sendAuthGet('getWishList', {})
        .then((res)=>{
            if(res.data.status)fn({status:true, msg:res.data.list})
            else fn({status:false, msg:res.data.message})
        })
        .catch(err=>{
            fn({status:false, msg:err.message})
        })
    }


    addRatings(data){
        return this.sendAuthPost('addReview',data)
    }

    getResetPassTempId(_email){
        return this.sendPost('forgotpassword_send_request', {email:_email})
    }

    sendResetPassData(data){
        return this.sendPost('reset_password', data)
    }

}

export default new AuthService();