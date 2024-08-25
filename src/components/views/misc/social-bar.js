import { Component } from "react";
import { Link } from 'react-router-dom';
import { SocialLinks } from "../../../Constants"

export default class SocialBar extends Component{
    render(){
        return (
            <ul className="newsletter__social-icon">
                <li>
                    <Link to={SocialLinks.LINK_FACEBOOK}>
                        <i className="fa fa-facebook socialico"></i>
                    </Link>
                </li>
                <li>
                    <Link to={SocialLinks.LINK_TWITTER}>
                    <i className="fa fa-twitter socialico"></i>
                    </Link>
                </li>
                <li>
                    <Link to={SocialLinks.LINK_PINTEREST}>
                        <i className="fa fa-pinterest socialico"></i>
                    </Link>
                </li>
                <li>
                    <Link to={SocialLinks.LINK_INSTAGRAM}>
                        <i className="fa fa-instagram socialico"></i>
                    </Link>
                </li>
            </ul>
        )
    }

}