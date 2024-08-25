import { Component } from "react";

export default class LoadingScreen extends Component{
    render(){
        const show = (this.props.show)?"flex":"none";
        return (
            <div className="loading-screen" style={{display:show}}>
                <div className="loading-contant">
                    <img src={process.env.PUBLIC_URL + "/assets/images/loader.svg"} alt="preload"/>
                    <p>Loading....</p>
                </div>
            </div>
        )
    }
}
