import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/app-context';
import { withRouter } from '../../routed-component-wrapper';


class SignIn extends Component {

    static contextType = AppContext;

    constructor(props){
        super(props)
        this.state = {
            username:'',
            pass:'',
            remember:false,
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

    validateForm = (username, pass, remember)=>{
        if(username.length<5){
            return "Please enter your registered email."
        }
        if(pass.length<5){
            return "Please eneter a vlaid password."
        }
        return '';
    }

    submitForm = (e)=>{
        e.preventDefault();
        const {username, pass, remember} = this.state;
        const err = this.validateForm(username, pass, remember);
        if(err.length>0){
            this.setState({error:err})
            return
        }
        this.context.getAuthService().login({email:username, password:pass})
        .then((response)=>{
            if(response.data.status){
                this.context.updateLogin(response.data);
                this.setState(prevS=>{
                    const ss = {...prevS, username:'',pass:'',remember:false}
                    return ss;
                },()=>{
                    this.props?.navigate('/')
                })
            }else{
                this.setState({error:'Error: ' + response.data.message})
                console.error('AuthService.login')
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
        const {getUser} = this.context;
        const userData = getUser();
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
                            <li className="active"><Link to="faq.html">Sign in</Link></li>
                        </ul>
                        </div>
                    </div>
                </div>
            
                <section className="sign-in section section--xl">
                <div className="container">
                    <div className="form-wrapper">
                    <h6 className="font-t`itle--sm">Sign in</h6>
                    {
                        (userData.isLoggedIn)
                        ?(
                            <div className="msg-registered">
                                <h3>Welcome, {userData.userName}!</h3>
                                <h5><Link to="/">Go to Shop</Link></h5>
                            </div>
                        )
                        :(

                            <form onSubmit={this.submitForm}>
                                <div className="form-input">
                                <input type="email" placeholder="Email" value={this.state.username} 
                                onChange={(e)=>{this.setState(ps=>{
                                    const ss = {...ps, username:e.target.value, error:''}
                                    return ss;
                                }
                                )}}
                                />
                                </div>
                                <div className="form-input">
                                <input type="password" placeholder="Password" id="password" 
                                value={this.state.pass} 
                                onChange={(e)=>{this.setState(ps=>{
                                    const ss = {...ps, pass:e.target.value, error:''}
                                    return ss;
                                }
                                )}}
                                />
                                {/*
                                <button
                                    type="button"
                                    className="icon icon-eye">
                                <i className="fa fa-eye"></i>
                                </button>
                                */}
                                </div>
                                <div className="form-wrapper__content">
                                <div className="form-check">
                                    <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={this.state.remember}
                                    id="remember"
                                    onChange={(e)=>{this.setState({remember:e.target.checked})}}
                                    />
                                    <label className="form-check-label" htmlFor="remember">
                                    Remember Me
                                    </label>
                                </div>
                                <Link to="/resetpassword">Forget Password </Link>
                                </div>
                                <div className="form-error" style={{display:(this.state.error.length>0)?'block':'none'}}>
                                    {this.state.error}
                                </div>
                                <div className="form-button">
                                <button className="button button--md w-100">Login</button>
                                </div>
                                <div className="form-register">
                                Don't have account ? <Link to="/register">Register</Link>
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

export default withRouter(SignIn) ;