import { Component } from "react";
import { Link } from "react-router-dom";
import { SaticAssets } from "../../../Constants";

class CategoryItem extends Component{

    setErrorImg=(el)=>{
        el.src = SaticAssets.IMG_ERROR_PLACEHOLDER
    }

    render(){
        const {item} = this.props;
       return (
            
            <Link to={"/categoryproducts/"+item.id} data-parentid={ item.id } className="cards-sm popular-categories__wrapper-item">
                <div className="cards-sm__img-wrapper">
                    <img src={ item.image_web } alt={ item.title } onError={e=>{this.setErrorImg(e.target)}}/>
                </div>
                <h5 className="font-body--xl-500">{ item.title }</h5>
            </Link>
        )
    }


    
}

export default CategoryItem