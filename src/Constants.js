class UserType{
    static get RETAILER(){return "retailer";}
    static get WHOLESELLER(){return "wholeseller";}
    static get CONSUMER(){return "consumer";}
    static get UNREGISTERED(){return "guest";}
    static isGuest = type=>{return [UserType.RETAILER, UserType.WHOLESELLER, UserType.CONSUMER].indexOf(type)===-1;}
}

class User{
    id;name;role;
    static count=0;
}

class InfoStrings{
    static CART_EMPTY = "Your shopping cart is empty!"
    static CART_ITEM_ADDED = "Item added to cart."
    static FAV_ITEM_ADDED = "Item added to wish list."
    static FAV_ITEM_REMOVED = "Item removed from wish list."
    static REGISTER_SUCCESS = "Registered Sucessfully!"
    static REGISTER_AWAIT_APPROVAL = "You have registered successfully. Your account will be approved shortly."
    static LOGIN_REQUIRED = "Login is required to perform this action!"
    static REGSITER_REMINDER_MODAL = "In order to see prices of the product you need to login."
}

class SaticAssets{
    static IMG_DIR_LINK = process.env.PUBLIC_URL + "/assets/images/";
    static LOGO_LINK = process.env.PUBLIC_URL + "/assets/images/logo.png";
    static LOGO_LINK_WHITE = process.env.PUBLIC_URL + "/assets/images/logo-nl-white.png";
    static LOADER_IMG_LINK = process.env.PUBLIC_URL + "/assets/images/loader.svg";
    static IMG_ERROR_PLACEHOLDER = process.env.PUBLIC_URL + "/assets/images/img_error.jpg";

}

class SocialLinks{
    static LINK_FACEBOOK = "https://www.facebook.com/Rio-Aarman-101467686015455";
    static LINK_TWITTER = "https://www.facebook.com/";
    static LINK_INSTAGRAM = "https://www.instagram.com/rioaarman/";
    static LINK_GOOGLE_PLUS = "https://www.facebook.com/";
    static LINK_PINTEREST = "https://www.facebook.com/";
}

export {UserType, User, InfoStrings,SaticAssets,SocialLinks}