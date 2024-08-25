import React, { Component }  from "react";
import { InfoStrings, UserType } from "../Constants";
import WebService from "../service/WebService";

const AppContext = React.createContext();

export default class AppProvider extends Component{

    default_user = {
        "id": null,
        "name": null,
        "lname": null,
        "email": null,
        "phone_code": null,
        "mobile": null,
        "profileImage": null,
        "nationality": null,
        "city": null,
        "address": null,
        "commercialRegister": null,
        "gender": null,
        "mobileOtp": null,
        "emailOtp": null,
        "registerAs": UserType.UNREGISTERED,
        "isMobileVerify": false,
        "isEmailVerify": false,
        "status": null,
        "loggedIn":false
    }

    defaultState={
        authToken:null,
        categories:[],
        shoppingList:{},
        cartDetails:{
            "totalItems":0,
            "subtotal": 0,
            "tax_amt": 0,
            "shipping_amt": 0,
            "totalAmt": 0,
            "discount_amt": 0,
            "couponAmount": 0,
            "couponCode": null
        },
        orderId:-1,
        wishList:{},
        totalWishItems:0,
        totalDiscount:0,
        user:this.default_user
    }

    constructor(props){
        super(props)
        this.state = this.defaultState;
    }

    componentDidUpdate(){
        const data = this.props.loginData;
        if(data && data.token!==undefined && this.state.authToken!==data.token){

            // get wishlist on login
            this.getRemoteWishList()
            this.getRemoteCart()

            this.setState(ps=>{
                const ss={...ps, user:data.user, authToken:data.token}
                return ss;
            });
        }
    }


    getAuthService=()=>{
        return this.props.rootHook.authService
    }


    getRandom=()=>{
        return this.state.authToken+'';
    }

    getCategory = (id)=>{
        return (this.categoryList)?this.categoryList[id]:undefined;
    }

    setCategories=(_categories)=>{
        this.setState({categories:_categories});
    }

    childParentMap = {};
    createCatMap = (cat)=>{
        if(Array.isArray(cat)){
            cat.forEach((d,i)=>{
                this.childParentMap[d.id] = parseInt(d.parent_id)
                this.createCatMap(d.sub_categories)
            })
        }
    }
    
    isCatLoading=false;
     getCategories= ()=>{
        const this_ = this;
        const getCat = async()=>{
                this_.isCatLoading = true;
                let res = await WebService.getCategories();
                this_.isCatLoading = false;
                return res.data.data
        }

        if(!this.state.categories.length && !this_.isCatLoading){
            ;(async()=>{
                    try{
                        const data = await getCat()
                        this.childParentMap ={};
                        this.createCatMap([...data]);
                        this.setState({categories:[...data]})
                    }catch(er){
                        this.setState({categories:[{}]})
                        this.showToast('Could not load product categories.' + er.message, 'danger')
                    }
                }
            )()            
        }
        return this.state.categories.concat();
    }

    getCatMap=()=>{
        return {...this.childParentMap}
    }
    
    /**************************************** USER ACCOUNT *************************************/

    logout=()=>{

        this.getAuthService().logout().then(e=>{
            if(e){

                setTimeout(
                    ()=>{
                        this.setState(ps=>{
                            const ns = {...this.defaultState}
                            return ns;
                        })
                    }
                )
                
            }else this.showToast("Error performing the last operation.", 'danger')
        })


        
    }

    updateLogin=(data)=>{
        if(this.getAuthService().saveLoginData(data)){
            this.setState(ps=>{
                const ss={...ps, user:data.user, authToken:data.token}
                return ss;
            });
        }
    }

    getUser=()=>{
        return Object.assign({}, this.state.user);
    }

    isUserLoggedIn=()=>{
        return this.state.user.email!=null && this.state.user.id!=null;
    }
    
    /*****************************************************************************************************************************************************/
    
    /**************************************** CART LOGIC  *********************************************************************************************/
    
    /*****************************************************************************************************************************************************/

    mergeCart=()=>{

    }


    updateCart=()=>{
        let count=0, stotal=0,discount=0,totalAmt=0;
        for(const i in this.state.shoppingList){
            count+=parseInt(this.state.shoppingList[i].count);
            stotal+=this.state.shoppingList[i].count*parseFloat(this.state.shoppingList[i].product.price)
            totalAmt+=this.state.shoppingList[i].count*parseFloat(this.state.shoppingList[i].product.mrp_price)
        }
        
        discount+=totalAmt-stotal;
        let details = Object.assign({}, this.state.cartDetails)
        details.subtotal = Number(stotal).toFixed(2);
        details.totalAmt = Number(totalAmt).toFixed(2);
        details.discount_amt = Number(discount).toFixed(2);
        details.shipping_amt = Number(details.shipping_amt).toFixed(2);
        details.couponAmount = Number(details.couponAmount).toFixed(2);
        details.totalItems = count;
        this.setState(ps=>{
            const ns = {...ps,cartDetails:details,orderId:-1}
            return ns;
        })
    }

    addToCart = (product)=>{

        if(!this.isUserLoggedIn()){
            this.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return
        }

        let nl = Object.assign({}, this.state.shoppingList)
        if(nl[product.id] === undefined){
            nl[product.id]={"count":1, "product":product}
        }else{
            nl[product.id].count += 1;
        }
        this.getAuthService().addProductToCart(product.id, nl[product.id].count, (res)=>{
            if(res.status){
                nl[product.id].product.cartId = res.msg;
                this.setState({shoppingList:nl}, this.updateCart)
                this.showToast(InfoStrings.CART_ITEM_ADDED, 'success')
            }
            else this.showToast(res.msg, 'danger')
        })
    }

    isInCart = (id)=>{
        return (this.state.shoppingList[id] && this.state.shoppingList[id].count>0)
    }

    addToCartById = (id)=>{

        if(!this.isUserLoggedIn()){
            this.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return
        }
        
        let nl = Object.assign({}, this.state.shoppingList)
        if(nl[id] !== undefined){
            nl[id].count += 1;
            // update cart online
            this.getAuthService().addProductToCart(id, nl[id].count, (res)=>{
                if(res.status){
                    nl[id].product.cartId = res.msg
                    this.setState({shoppingList:nl}, this.updateCart)
                }
                else this.showToast(res.msg)
            })
        }
    }

    removeFromCart = (id,remove)=>{

        if(!this.isUserLoggedIn()){
            this.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return
        }

        if(id===null || id===undefined)id="*";//id can be 0, so check for no value
        remove = !!remove;
        if(id==="*"){
            // empty the cart if no id is provided
            // TODO: check cart details if totalItems already 0

            //UPDATE: this op is not available in the api. hence, disabling it
            //this.setState({shoppingList:{}}, this.updateCart)
        }else{
            let nl = Object.assign({}, this.state.shoppingList)
            if(nl[id]!==undefined && nl[id].product.cartId!==undefined){
                if(remove){nl[id].count = 0}
                else{nl[id].count -= 1}
                if(nl[id].count===0){
                    //delete cart online
                    this.getAuthService().removeProductFromCart(nl[id].product.cartId, (res)=>{
                        if(res.status){
                            nl[id]=undefined; delete nl[id]
                            this.setState({shoppingList:nl}, this.updateCart)
                        }
                        else this.showToast("Error " + res.msg)
                    })
                }else{
                    // update cart online
                    this.getAuthService().addProductToCart(id, nl[id].count, (res)=>{
                        if(res.status){
                            this.setState({shoppingList:nl}, this.updateCart)
                        }
                        else this.showToast(res.msg)
                    })
                }
            }
        }
    }

    getRemoteCart=()=>{
        this.getAuthService().getAllCart((res)=>{
            if(res.status){
                if(Array.isArray(res.msg)){
                    let nl = Object.assign({}, this.state.shoppingList)
                    res.msg.map((d,i)=>{
                        const product = {...d, cartId:d.id, id:d.product_id}
                        const qty = parseInt(d.qty)
                        if(nl[product.id] === undefined){
                            nl[product.id]={"count":(isNaN(qty))?0:qty, "product":product}
                        }else{
                            nl[product.id].count += qty;
                        }
                       return product; 
                    })
                    this.setState({shoppingList:nl}, this.updateCart)
                }else console.log('Invalid cart rcvd. Skipping...');
            }
            else this.showToast("Error retrieving cart items. " + res.msg)
        })
    }

    clearCart = ()=>{

        if(!this.isUserLoggedIn()){
            this.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return
        }

        this.setState({shoppingList:{}}, this.updateCart)
    }

    getCartItems = ()=>{
        return Object.entries(this.state.shoppingList)
    }

    cartItemCountByPid=(pid)=>{
        return (this.state.shoppingList[pid]!==undefined)?this.state.shoppingList[pid].count:0;
    }


    applyCoupon = async ( code )=>{

        if(this.state.cartDetails.couponCode===code){
            this.showToast("This coupon has already been applied.")
            return Promise.resolve(false)
        }

        // this api is throwing error. need to fix from backend
        this.getAuthService().applyCoupon(code, res=>{
            if(res.status){

                return Promise.resolve(true)
            }else {
                this.showToast("Apply coupon error: " + res.msg); 
                return Promise.resolve(false)
            }
        })
    }

    
    /*****************************************************************************************************************************************************/
    
    /**************************************** ORDER LOGIC *********************************************************************************************/
    
    /*****************************************************************************************************************************************************/

    createOrder = ()=>{

        if(!this.isUserLoggedIn()){
            this.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return
        }

        const {totalAmt, subtotal, shipping_amt, couponAmount, tax_amt} = this.state.cartDetails;
        const _this = this;
        this.getAuthService().createOrder(totalAmt, subtotal, shipping_amt, couponAmount, tax_amt, (res)=>{
            if(res.status){
                _this.clearCart()
                _this.setState({orderId:res.msg})
            }
            else this.showToast(res.msg)
        })
    }

    /*****************************************************************************************************************************************************/
    
    /**************************************** WISHLIST LOGIC *********************************************************************************************/
    
    /*****************************************************************************************************************************************************/

    addToWishlist = (product)=>{

        if(!this.isUserLoggedIn()){
            this.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return
        }

        let nl = Object.assign({}, this.state.wishList)
        if(nl[product.id] === undefined){
            this.getAuthService().addProductToWishList(product.id, (res)=>{
                if(res.status){
                    nl[product.id]=product;
                    nl[product.id].wishId = res.msg;
                    this.setState({wishList:nl})
                    this.showToast(InfoStrings.FAV_ITEM_ADDED, 'success')
                }
                else this.showToast(res.msg, 'danger')
            })
        }
    }

    removeFromWishlist = (product)=>{

        if(!this.isUserLoggedIn()){
            this.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return
        }

        //this.setState({wishList:this.state.wishList.filter(item=>{return item !== product}})
        let id = -1;
        if(typeof product === 'object' && product.constructor === Object)id = product.id
        else id=product;
        let nl = Object.assign({}, this.state.wishList)
        if(nl[id]!==undefined && nl[id].wishId!==undefined){
            this.getAuthService().removeFromWishList(nl[id].wishId, (res)=>{
                if(res.status){
                    nl[id]=undefined; delete nl[id]
                    this.setState({wishList:nl})
                    this.showToast(InfoStrings.FAV_ITEM_REMOVED, 'success')
                }
                else this.showToast("Error " + res.msg)
            })
        }
    }

    getWishListItems=()=>{
        return Object.entries(this.state.wishList)
    }

    getRemoteWishList=()=>{
        this.getAuthService().getAllWishList((res)=>{
            if(res.status){
                let nl = Object.assign({}, this.state.wishList)
                res.msg.map((d,i)=>{
                    d.wishId = d.id;
                    d.id = d.product_id;
                    if(nl[d.id]===undefined)nl[d.id]=d;
                    return d;
                })
                this.setState({wishList:nl})
            }
            else this.showToast("Error retrieving wish list. " + res.msg)
        })
    }

    isInWisthList=(product)=>{
        let id = -1;
        if(typeof product === 'object' && product.constructor === Object)id = product.id
        else id=product
        return this.state.wishList[id]!==undefined;
    }

    wishListHasItems=()=>{
        return Object.keys(this.state.wishList).length>0
    }

    clearWishList = ()=>{

    }


    /*****************************************************************************************************************************************************/
    
    /**************************************** OTHERS         *********************************************************************************************/
    
    /*****************************************************************************************************************************************************/

    showToast=(msg,type)=>{
        this.props.rootHook.showToast(msg,type);
    }


    showProductPreview=(_pid)=>{
        this.props.rootHook.setProductPreview({show:true,pid:_pid});
    }

    addRatings=(data)=>{
        if(!this.isUserLoggedIn()){
            this.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return null;
        }
        return this.getAuthService().addRatings(data)
    }

    /*****************************************************************************************************************************************************/
    
    /****************************************     RENDER     *********************************************************************************************/
    
    /*****************************************************************************************************************************************************/
    render(){
        const {cartDetails,totalWishItems,orderId} = this.state;
        const { addToCart, removeFromCart,addToCartById, getCartItems, isInCart, cartItemCountByPid
                ,addToWishlist, removeFromWishlist, getWishListItems, clearWishList, isInWisthList, wishListHasItems
                ,getUser, updateLogin,getRandom, isUserLoggedIn, logout
                ,createOrder, setCategories, getCategories, getCatMap
                ,getAuthService, showToast, showProductPreview, addRatings
            
            } = this;
        return (
            <AppContext.Provider value={
                {   
                    cartDetails,totalWishItems,orderId
                    ,addToCart, removeFromCart,addToCartById, getCartItems, isInCart, cartItemCountByPid
                    ,addToWishlist, removeFromWishlist, getWishListItems, clearWishList, isInWisthList, wishListHasItems
                    ,getUser, updateLogin,getRandom, isUserLoggedIn, logout
                    ,createOrder, setCategories, getCategories, getCatMap
                    ,getAuthService, showToast, showProductPreview, addRatings
                }
            }>
            {this.props.children}
            </AppContext.Provider>
        )
    }
}

export {AppContext, AppProvider}