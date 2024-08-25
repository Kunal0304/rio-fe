import { Component } from "react";
import { InfoStrings } from "../Constants";
import { AppContext } from "../contexts/app-context";

class BaseAppComponent extends Component{

    static contextType = AppContext;
    addToCart=(p)=>{
        if(!this.isUserLoggedIn()){
            this.context.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return;
        }
        this.context.addToCart(p)
    }
    
    itemInCart=(id)=>{
        return this.context.isInCart(id) || false;
    }

    isUserLoggedIn = ()=>{
        return this.context.isUserLoggedIn()
    }
    
    openProductPreview=(pid)=>{
        this.context.showProductPreview(pid)
    }

    addToWishList=(p)=>{
        if(!this.isUserLoggedIn()){
            this.context.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return;
        }
        this.context.addToWishlist(p)
    }

    removeFromWishlist=(p)=>{
        if(!this.isUserLoggedIn()){
            this.context.showToast(InfoStrings.LOGIN_REQUIRED, 'danger')
            return;
        }
        this.context.removeFromWishlist(p)
    }

    itemInWishList=(id)=>{
        return this.context.isInWisthList(id);
    }

    addRatings=(data)=>{
        return this.context.addRatings(data)
    }

    showToast=(msg,type)=>{
        this.context?.showToast(msg, type)
    }

    removeFromCart=(pid)=>{
        this.context?.removeFromCart(pid)
    }

    cartItemCountByPid=(id,remove)=>{
        return this.context?.cartItemCountByPid(id,remove)
    }

    addToCartById=(id)=>{
        this.context?.addToCartById(id)
    }


}

export default BaseAppComponent