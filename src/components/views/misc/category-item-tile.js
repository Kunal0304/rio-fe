import { Component } from "react";
import { Link } from "react-router-dom";
import { SaticAssets } from "../../../Constants";

export default class CategoryTile extends Component{

    
    setErrorImg=(el)=>{
        el.src = SaticAssets.IMG_ERROR_PLACEHOLDER
    }

    render(){
        return (
            <Link to={this.props.to} className={"category-tile" + ((this.props.sub)?" subcat":"") + ((this.props.active)?" active":"")}>
                <div className="category-tile-content" >
                    {this.props.image
                        ?<img className="tile-icon" src={this.props.image} alt={this.props.text} onError={e=>{this.setErrorImg(e.target)}}/>
                        :<div className="tile-icon"><i className="fa fa-eye fa-2x"></i></div>
                    }   
                    <span>{this.props.text}</span>
                </div>
            </Link>
        )
}

}