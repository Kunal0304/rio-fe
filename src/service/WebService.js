import axios from "axios";
import { BASE_URL } from "../AppConfig";


// for public routes, except login/signup
class WebService{

    /*
    getHomePageData(){
        return axios.post(`${BASE_URL}/home-screen`)
    }

    getProductDetails(productId){
        return axios.post(`${BASE_URL}/product-detail`, {id:productId})
    }

    getCategoryProducts(catId){
        return axios.post(`${BASE_URL}/product`, {category:catId});
    }
    */
   
    getCategories(){
        return axios.get(`${BASE_URL}/category`);
    }
    getCityByPincode(pincode, _signal){
        return axios.post(`${BASE_URL}/state-city`, {'pincode':pincode}, {signal:_signal});
    }

}

export default new WebService()