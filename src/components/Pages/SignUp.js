import { Component } from 'react';
import { Link } from 'react-router-dom';
import { InfoStrings } from '../../Constants';
import { AppContext } from '../../contexts/app-context';
import WebService from '../../service/WebService';

const MIN_PASS_LENGTH = 8;

class SignUp extends Component {

    static contextType = AppContext;

    pinAbort = null;

    constructor(props) {
        super(props);
        this.state = {
            /*
            email: { name: 'email', value: '', error: '' },
            password: { name: 'password', value: '', error: '' },
            registeredAs:"guest",
            confirmPassword: { name: 'confirmPassword', value: '', error: '' }, 
            termsConditions: { name: 'termsConditions', value: false, error: '' }, 
            */
            id: null,
            cname: '',
            email: '',
            mobile: '',
            password: '',
            registeredAs: "reseller",
            confirmPassword: '',
            termsConditions: false,
            isRegistered: false,
            showOTPScreen: false,
            registerOTP: '1234',
            pincode: '',
            city: '',
            state: '',
            running: false,
            error: ''
        };
    }
    validateForm = (cname, email, mobile, password, confirmPassword, registeredAs, termsConditions, pincode, city, state) => {
        console.log('state values', email, password, confirmPassword, registeredAs, termsConditions)
        if (cname.length === 0) {
            return 'Please fill a valid Firm/Company name';
        }
        if (email.length === 0) {
            return 'Please fill a valid email address';
        }
 
        if (mobile.length !== 10) {
            return 'Please fill a valid mobile number without contry code.';
        }
        if (password.length < MIN_PASS_LENGTH || confirmPassword.length < MIN_PASS_LENGTH) {
            return `Password and confirmation cannot be less than ${MIN_PASS_LENGTH} characters.`;
        }
        if (password !== confirmPassword) {
            return 'Password and confirm password do not match.';
        }

        if (pincode.length === 0 || city.length === 0 || state.length === 0) {
            return "Please enter a valid location.";
        }

        if (!(termsConditions || termsConditions.value)) {
            return "Please accept the terms and conditions to proceed.";
        }



        return '';
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { cname, email, mobile, password, confirmPassword, registeredAs, termsConditions, pincode, city, state } = this.state;
        const validationStatus = this.validateForm(cname, email, mobile, password, confirmPassword, registeredAs, termsConditions, pincode, city, state);
        if (validationStatus !== '') {
            this.setState({ error: validationStatus })
            return;
        }
        this.setState({ error: '' })
        const reData = {
            cname: cname,
            email: email,
            password: password,
            registerAs: registeredAs,
            mobile: mobile,
            city: city,
            state: state,
            pincode: pincode
        }
        this.signUp(reData);
    }

    signUp = (data) => {
        this.context.getAuthService().register(data).then((res) => {
            if (res.data.status) {
                this.setState(ps => {
                    const ns = { ...ps, id: res.data.userId, isRegistered: false, showOTPScreen: false };
                    return ns;
                },()=>{this.onSubmitOTP()})
            }
            else throw new Error(res.data.message);
        })
            .catch((err) => {
                const msg = (err.message && err.message.length > 0) ? err.message : 'Unknown error!'
                this.setState({ error: 'Error: ' + msg });
            })
    }

    onSubmitOTP = () => {
        const { id, registerOTP } = this.state;
        this.context.getAuthService().verifyOTP({ userId: id, otp: registerOTP })
            .then((res) => {
                if (res.data.status) this.setState({ isRegistered: true })
                else throw new Error(res.data.message);
            })
            .catch((err) => {
                const msg = (err.message && err.message.length > 0) ? err.message : 'Unknown error!'
                this.setState({ error: 'Error: ' + msg });
            })
    }

    resendOTP = () => {
        const { id } = this.state;
        this.context.getAuthService().resendOTP({ userId: id })
            .then((res) => {
                if (res.data.status) this.setState({ isRegistered: true })
                else throw new Error(res.data.message);
            })
            .catch((err) => {
                const msg = (err.message && err.message.length > 0) ? err.message : 'Unknown error!'
                this.setState({ error: 'Error: ' + msg });
            })
    }

    getCityByPin = () => {
        const { pincode } = this.state;
        if (!(pincode && pincode.length > 5)) {
            this.setState({ error: 'Please enter a valid pincode.' })
            return;
        }
        this.setState({ error: '' })
        this.setState({ running: true })
        if (this.pinAbort !== null) {
            this.pinAbort.abort()
        }

        this.pinAbort = new AbortController();
        const signal = this.pinAbort.signal

        WebService.getCityByPincode(pincode, signal)
            .then((res) => {
                if (res.data.status) {
                    let loc = res.data.data[0];
                    if (!loc) throw new Error('Invalid pincode.')
                    this.setState(ps => {
                        const ns = { ...ps, pincode: loc.Pincode, city: loc.City, state: loc.State }
                        return ns;
                    })
                }
                else throw new Error(res.data.message);
            })
            .catch((err) => {
                const msg = (err.message && err.message.length > 0) ? err.message : 'Unknown error!'
                this.setState({ error: 'Error: ' + msg });
            })
            .finally(() => { this.setState({ running: false }) })
    }


    getCityState = (el) => {
        this.setState({ pincode: el.value }, () => {
            if (el.value.length === 6) {
                this.getCityByPin()
            } else {
                this.setState(ps => {
                    const ns = { ...ps, state: '', city: '' }
                    return ns
                })
            }
        })

    }



    render() {
        const { cname, email, mobile, password, confirmPassword, registeredAs, termsConditions, pincode, state, city } = this.state;
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
                                <li className="active">
                                    <li className="active"><span className="breadcrumb-target">Create Account</span></li>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <section className="create-account section section--xl">
                    <div className="container">
                        <div className="form-wrapper">
                            {
                                (this.state.isRegistered)
                                    ? (<>
                                        <h6 className="font-title--sm">Greetings!</h6>
                                        <div className="msg-registered">
                                            <h4>{InfoStrings.REGISTER_AWAIT_APPROVAL}</h4>
                                            <h5><Link to="/category">Browse Products</Link></h5>
                                        </div>
                                    </>
                                    )
                                    : (this.state.showOTPScreen
                                        ? (<>
                                            <h6 className="font-title--sm">Verify OTP</h6>
                                            <form onSubmit={this.onSubmitOTP}>
                                                <div className="form-input" style={{ height: '80px' }}>
                                                    <label>Please enter OTP received in your registered email.</label>
                                                    <input type="text"
                                                        style={{ height: '49px', marginTop: '5px' }}
                                                        maxLength={6}
                                                        value={this.state.registerOTP}
                                                        id="otp"
                                                        name="otp" required
                                                        placeholder="xxxxxx"
                                                        pattern="[0-9]+"
                                                        onChange={e => this.setState({ registerOTP: e.target.value })}
                                                        title='Enter OTP received in your registered email. Only numbers are allowed.' />
                                                </div>
                                                <p style={{ textAlign: 'right' }}><button onClick={() => { this.resendOTP() }} style={{ textDecoration: 'underline', background: 'transparent' }}>Resend OTP</button></p>
                                                <div className="form-error" style={{ display: (this.state.error.length > 0) ? 'block' : 'none' }}>
                                                    {this.state.error}
                                                </div>
                                                <div className="form-button">
                                                    <button className="button button--md w-100">Submit</button>
                                                </div>
                                                <div className="form-register">
                                                    Already have an account? <Link to="/login">Login here</Link>
                                                </div>
                                            </form>
                                        </>)
                                        : (
                                            <>
                                                <h6 className="font-title--sm">Create Account</h6>
                                                <form onSubmit={this.onSubmit}>
                                                    <div className="form-input">
                                                        <input type="text" name="cname" placeholder="Firm/Company Name" required value={cname}
                                                            onChange={e => this.setState({ cname: e.target.value })} />
                                                        <span className="icon icon-error">
                                                            <i className="fa fa-eye"></i>
                                                        </span>
                                                        <span className="icon icon-success">
                                                            <i className="fa fa-eye"></i>
                                                        </span>
                                                    </div>
                                                    <div className="form-input">
                                                        <input 
                                                            required 
                                                            pattern="[^@\s]+@[^@\s]+\.[^@\s]+" 
                                                            title="Enter a valid email address."
                                                            type="email" 
                                                            name="email" 
                                                            placeholder="Email" 
                                                            value={email}
                                                            onChange={e => this.setState({ email: e.target.value })} 
                                                        />
                                                        <span className="icon icon-error">
                                                            <i className="fa fa-eye"></i>
                                                        </span>
                                                        <span className="icon icon-success">
                                                            <i className="fa fa-eye"></i>
                                                        </span>
                                                    </div>
                                                    <div className="form-input">
                                                        <input type="password" name="password" required placeholder="Password" id="password" value={password}
                                                            onChange={e => this.setState({ password: e.target.value })} />
                                                        {/** 
                                    <button
                                        type="button"
                                        className="icon icon-eye">
                                        <i className="fa fa-eye"></i>
                                    </button>
                                    */}
                                                    </div>
                                                    <div className="form-input">
                                                        <input type="password" required placeholder="Confirm Password"
                                                            id="confirmPassword" name="confirmPassword" value={confirmPassword}
                                                            onChange={e => this.setState({ confirmPassword: e.target.value })} />

                                                        {/** 
                                    <button
                                        type="button"
                                        className="icon icon-eye">
                                        <i className="fa fa-eye"></i>
                                    </button>
                                    */}

                                                    </div>
                                                    <div className="form-input">
                                                        <input type="text"
                                                            maxLength={10}
                                                            value={mobile}
                                                            name="mobile" required
                                                            placeholder="Mobile number"
                                                            pattern="^[0-9]+"
                                                            onChange={e => this.setState({ mobile: e.target.value })}
                                                            title='Enter your 10 digit mobile number.' />
                                                        <span className="icon icon-error">
                                                            <i className="fa fa-eye"></i>
                                                        </span>
                                                        <span className="icon icon-success">
                                                            <i className="fa fa-eye"></i>
                                                        </span>
                                                    </div>
                                                    <div className="form-input">
                                                        <input type="tel" placeholder="Pincode" required 
                                                            pattern="^[0-9]{6}" maxLength={6} autoComplete="false" required
                                                            id="upincode" name="upincode" value={pincode}
                                                            onChange={e => this.getCityState(e.target)}
                                                            title="Please enter a valid pincode in digits only." />

                                                        <span
                                                            className="icon icon-eye">
                                                            <i className={"fa " + ((this.state.running) ? 'fa-circle-o-notch fa-spin' : 'fa-search')}></i>
                                                        </span>

                                                    </div>

                                                    <div className="form-input">
                                                        <input type="text" placeholder="City ( Search pincode to fill )"
                                                            id="ucity" name="ucity" value={city}
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="form-input">
                                                        <input type="text" placeholder="State ( Search pincode to fill )"
                                                            id="ustate" name="ustate" value={state}
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="form-input" style={{ height: 'auto' }}>
                                                        <label style={{ marginLeft: '5px' }} className="form-label" htmlFor="regas">Regsiter as</label>
                                                        <select id="regas" name="regas"
                                                            className='form-select'
                                                            value={registeredAs}
                                                            onChange={e => this.setState({ registeredAs: e.target.value })}
                                                        >
                                                            <option value="reseller" >Reseller</option>
                                                            <option value="wholeseller">Wholeseller/Distributer</option>
                                                            <option value="builder">Builder</option>
                                                            <option value="contractor">Contractor</option>
                                                            <option value="architect">Architect</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-wrapper__content">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="remember"
                                                                checked={termsConditions}
                                                                onChange={e => this.setState({ termsConditions: e.target.checked })}
                                                            />
                                                            <label className="form-check-label" htmlFor="remember" >
                                                                Accept all <Link className="dul" to="/terms-condition">Terms &amp; Conditions</Link>
                                                            </label>


                                                        </div>
                                                    </div>
                                                    <div className="form-error" style={{ display: (this.state.error.length > 0) ? 'block' : 'none' }}>
                                                        {this.state.error}
                                                    </div>
                                                    <div className="form-button">
                                                        <button className="button button--md w-100">Create Account</button>
                                                    </div>
                                                    <div className="form-register">
                                                        Already have an account? <Link to="/login">Login here</Link>
                                                    </div>
                                                </form>
                                            </>)

                                    )
                            }

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SignUp;