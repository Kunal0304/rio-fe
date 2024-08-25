import { Component } from "react";
import { InfoStrings } from "../../Constants";
import { withRouter } from "../../routed-component-wrapper";

class WelcomeModal extends Component{
    
    state={open:true}
    lastMessage=null;
    closeWindow=()=>{
        //set 90 sec timer
        setTimeout(()=>{
            this.props.rootHook.authService.getLoginData().then(data=>{
                if(!(data.user && data.user.id))
                    this.props?.rootHook.showWelcome(InfoStrings.REGSITER_REMINDER_MODAL)
            })
        },90*1000);

        this.setState({open:false})
    }

    openLink=()=>{
        const {navigate} = this.props;
        navigate('/register')
        this.setState({open:false})
    }


    render(){

        const shouldShow = this.props.message!=='' && (this.props.message!==this.lastMessage || !!this.state.open);
        if(shouldShow)this.lastMessage = this.props.message;

        return (
            <div className={"modal fade newsletter-popup " + ((shouldShow)?'show':'hide')} 
            id="newsletter" tabIndex="-1" aria-modal="true" 
            role="dialog" style={{display:(shouldShow)?"block":'none'}}>

            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row newsletter-popup__content">
                            {/*<!--<div className="col-lg-5">-->*/}
                            {/*<!--    <div className="newsletter-popup__img-wrapper">-->*/}
                            {/*<!--        <img src="src/images/banner/banner-sm-18.png" alt="newsletter" />-->*/}
                            {/*<!--    </div>-->*/}
                            {/*<!--</div>-->*/}
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10">
                              <div className="newsletter-popup__text-content">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                        onClick={()=>{this.closeWindow()}}
                                    />
                                    <h5 className="font-title--xl">Welcome to <br/> Rio Aarman</h5>

                                        {(this.props.message==='welcome')
                                            ?(<p className="font-body--lg">
                                                Sign in to Browse Our Varied Categories and Raise <span> Order </span> Requests.
                                            </p>)
                                            :(<p className="font-body--lg">
                                                {this.props.message}
                                            </p>)
                                        }

                                        <div className="form-check">
                                            <div style={{margin:'30px 0'}} >
                                                <div className="button button--lg" onClick={()=>{this.openLink()}}>Register</div>
                                            </div>
                                        </div> 

                                            {/* <form action="#" className="form">
                                                <div className="contact-mail----">
                                                    <div>
                                                    <input type="text" name="phone" size="10" pattern="[1-9]{1}[0-9]{9}" placeholder="Enter Email &amp; Phone Number" />
                                                    <select name="languages" id="type--">
                                                        <option value="javascript">Wholesale</option>
                                                        <option value="php">Retail</option>
                                                        <option value="php">Distributor</option>
                                                    </select>
                                                    </div>
                                                    <div>
                                                    
                                                    </div>
                                                    <button className="button button--md">SUBMIT</button>
                                                    
                                                </div> */}
                                            
                                                {/*<!--    <input className="form-check-input" type="checkbox" value="" id="doNotShowNewsletter" />-->*/}
                                                {/*<!--    <label className="form-check-label font-body--md-400" for="doNotShowNewsletter">-->*/}
                                                {/*<!--        Do not show this window-->*/}
                                                {/*<!--    </label>-->*/}
                                                
                                            {/* </form> */}

                                </div>
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )



    }
}


export default withRouter(WelcomeModal)