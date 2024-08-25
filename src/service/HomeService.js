import axios from "axios";

const HOME_BASE_URL = 'http://dighighs.com/rioaarman';

class HomeService{
    

    homeScreen(){
        axios.get(HOME_BASE_URL);
    }

    productList(){
        axios.get(HOME_BASE_URL);
    }
}

export default new HomeService();