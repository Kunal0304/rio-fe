import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/app-context';
import { withRouter } from '../../routed-component-wrapper';

const MIN_PASS_LENGTH = 8;

class ResetPassword extends Component {

    static contextType = AppContext;

    constructor(props){
        super(props)
        this.state = {
            email:'',
            temp_id:'',
            new_pass:'',
            otp:'',
            error:''
        }
    
    }

    componentDidMount(){
        /*
        AuthService.getSavedCart()
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{console.log('get cart error', err)})
        */
    }

    validateForm = (old_pass, new_pass)=>{
        
        return '';
    }

    submitOtp = (e)=>{
        e.preventDefault();
        const {otp, new_pass, temp_id} = this.state;
        console.log(otp, new_pass, temp_id)
        if(otp.length<4 || isNaN(parseInt(otp))){
            this.setState({error:`Please enter a valid OTP.`})
            return
        }
        if(new_pass.length<MIN_PASS_LENGTH){
            this.setState({error:`Password length cannot be less than ${MIN_PASS_LENGTH} characters.`})
            return
        }
        this.setState({error:'busy'})
        this.context.getAuthService().sendResetPassData({otp:otp, password:new_pass, password_confirmation:new_pass, tempId:temp_id})
        .then((response)=>{
            if(response.data.status){
                this.setState(prevS=>{
                    const ss = {...prevS, email:'',new_pass:'',otp:'',error:'',temp_id:'done'}
                    return ss;
                })
            }else{
                this.setState({error:'Error: ' + response.data.message})
            }
        })
        .catch(err=>{
            console.log(err)
            this.setState({error:'Service error. Try again later.'})
        })
    }


    submitEmail = (e)=>{
        e.preventDefault();
        const {email} = this.state;
        if(email.length === 0){
            this.setState({error:'Please fill a valid email address'})
            return
        }
        this.setState({error:'busy'})
        this.context.getAuthService().getResetPassTempId(email)
        .then((response)=>{
            console.log(response)
            if(response.data.status){
                this.setState(prevS=>{
                    const ss = {...prevS, temp_id:response.data.tempId, error:''}
                    return ss;
                })
            }else{
                this.setState({error:'Error: ' + response.data.message})
            }
        })
        .catch(err=>{
            console.log(err)
            this.setState({error:'Service error. Try again later.'})
        })

        /*

        const {updateUser} = this.context;
        const {username} = this.state;

        updateUser(username, true)


        setTimeout(()=>{
            
            
            this.setState({username:''})
            this.setState({pass:''})
            this.setState({remember:false})
        }, 500)

        */

    }


    render() {
        //const {getUser} = this.context;
        //const userData = getUser();
        return (
            <div>
                <div className="section breedcrumb">
                    <div className="breedcrumb__img-wrapper">
                        <img src="assets/images/banner/breedcrumb.jpg" alt="breedcrumb" />
                        <div className="container">
                        <ul className="breedcrumb__content">
                            <li>
                                <Link to="/">
                                <i className="fa fa-home iconss"></i>
                                    <span> {'>'} </span>
                                </Link>
                            </li>
                            <li className="active"><span className="breadcrumb-target">Reset Password</span></li>
                        </ul>
                        </div>
                    </div>
                </div>
            
                <section className="sign-in section section--xl">
                <div className="container">
                    <div className="form-wrapper">
                    <h6 className="font-t`itle--sm">Reset Password</h6>
                    {   (this.state.temp_id==='')
                        ?<form onSubmit={this.submitEmail}>
                            <div className="form-input">
                                <input type="email" required 
                                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+" 
                                    title="Enter a valid email address."
                                    placeholder="Enter registered email." 
                                    value={this.state.email} 
                                    onChange={(e)=>{this.setState(ps=>{
                                        const ss = {...ps, email:e.target.value, error:''}
                                        return ss;
                                    }
                                    )}}
                                />
                            </div>
                            <div className="form-error" style={{display:(this.state.error.length>0)?'block':'none'}}>
                                {(this.state.error==='busy')?<span><i className="fa fa-circle-o-notch fa-spin"></i> Please wait...</span>:this.state.error}
                            </div>
                            <div className="form-button">
                                <button className="button button--md w-100">Submit</button>
                            </div>
                            <div className="form-register">
                                <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
                            </div>
                        </form>
                        :(this.state.temp_id==='done')
                        ?(
                            <div className="msg-registered">
                                <h3>Password reset successfull!</h3>
                                <h5><Link to="/login">Login</Link></h5>
                            </div>
                        )
                        :(
                            
                            <form onSubmit={this.submitOtp}>
                                <p>Please enter OTP received in your email to proceed.</p>
                                <div className="form-input">
                                <input type="tel" required 
                                    pattern='^[0-9]+'
                                    placeholder="Enter OTP" 
                                    value={this.state.otp} 
                                    onChange={(e)=>{this.setState(ps=>{
                                        const ss = {...ps, otp:e.target.value, error:''}
                                        return ss;
                                    }
                                    )}}
                                />
                                </div>
                                <div className="form-input">
                                <input type="password" required 
                                    placeholder="New password" 
                                    id="password" 
                                    value={this.state.new_pass} 
                                    onChange={(e)=>{this.setState(ps=>{
                                        const ss = {...ps, new_pass:e.target.value, error:''}
                                        return ss;
                                    }
                                    )}}
                                />
                                </div>
                                <div className="form-error" style={{display:(this.state.error.length>0)?'block':'none'}}>
                                    {(this.state.error==='busy')?<i className="fa fa-circle-o-notch fa-spin"></i>:this.state.error}
                                </div>
                                <div className="form-button">
                                    <button className="button button--md w-100">Reset</button>
                                </div>
                                <div className="form-register">
                                    <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
                                </div>
                            </form>


                        )
                    }
                    
                    </div>
                </div>
                </section>
            </div>
        );
    }
}

export default withRouter(ResetPassword) ;