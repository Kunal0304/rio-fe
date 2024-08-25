import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {CLIENT_EMAIL_PRIMARY, CLIENT_EMAIL_SALES, CLIENT_ADDRESS_FULL, CLIENT_CONTACT} from '../../AppConfig'
import { AppContext } from '../../contexts/app-context';

class ContactUs extends Component {

    static contextType = AppContext

    defaultState={
      name:'',
      email:'',
      mobile:'',
      subject:'',
      message:'',
      error:'',
      running:false
    }
    state = this.defaultState;
    isBusy=false;
   
    submitContactForm=(e)=>{
      e.preventDefault(); 
      try {
          this.setState({error:''})
          if(this.state.name.trim().length===0)throw new Error('Please enter your name');
          if(this.state.email.trim().length===0)throw new Error('A valid email is required.');
          if(this.state.mobile.trim().length!==10)throw new Error('Please enter a valid mobile number without country code.');
          if(this.state.subject.trim().length===0)throw new Error('Subject is required.');
          if(this.state.message.trim().length===0)throw new Error('Message to send is required.');
      } catch (err) {
          this.setState({error:err.message})
          return
      }
      const {name,email,mobile,subject,message} = this.state;
      this.setState({running:true})
      this.context.getAuthService().submitContactMessage(name,email,mobile,subject,message)
      .then(r=>{
        this.context.showToast('Your message was submitted successfully!', 'success')
      })
      .catch(ex=>{
        this.context.showToast('Error while submitting the message.', 'danger')
      })
      .finally(e=>{
        this.setState(ps=>{ return {...this.defaultState}})
      })
      e.preventDefault(); 
      return;

      
    }

    componentDidMount(){
      window.scrollTo(0,0);
    }

    render() {
        return (
            <div>
    <section className="section breedcrumb">
      <div className="breedcrumb__img-wrapper">
        <img src="assets/images/banner/breedcrumb.jpg" alt="breedcrumb" />
        <div className="container">
          <ul className="breedcrumb__content">
            <li>
              <Link to="index.html">
                 <i className="fa fa-home iconss"></i>
                <span> {'>'} </span>
              </Link>
            </li>
            <li className="active"><span className="breadcrumb-target">Contact Us</span></li>
          </ul>
        </div>
      </div>
    </section>

    <section className="contact-form section section--xl">
      <div className="container">
        <div className="row contact-form__content">
          <div className="col-lg-3">
            <div className="contact-form__contact-info">
              <div className="contact-form__contact-info--item">
                <span className="icon">
                  <i className="fa fa-map socialico"></i>
                </span>
                <p>{CLIENT_ADDRESS_FULL}</p>
              </div>
              <div className="contact-form__contact-info--item">
                <span className="icon">
                 <i className="fa fa-envelope socialico"></i>
                </span>
                {/*<p>CLIENT_EMAIL_SALES</p>*/}
                <p>{CLIENT_EMAIL_PRIMARY}</p>
              </div>
              <div className="contact-form__contact-info--item">
                <span className="icon">
                  <i className="fa fa-phone socialico"></i>
                </span>
                <p>{CLIENT_CONTACT}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="contact-form-card">
              <h2>Just say hello !</h2>
              <p>
                Do you fancy saying hi to me or you want to get started with
                your project and you need my help? Feel free to contact me.
              </p>

              <form style={{pointerEvents:this.state.running?'none':''}} id="contactForm" onSubmit={e=>{this.submitContactForm(e)}}>
                <div className="contact-form--input">
                  <input type="text " placeholder="Your name" 
                    value={this.state.name}  onChange={e=>{this.setState({name:e.target.value})}}/>
                </div>
                <div className="contact-form-group">
                  <div className="contact-form--input">
                    <input type="text " placeholder="Your mobile number" 
                      name="mobile" required 
                      title='Enter your 10 digit mobile number.'
                      pattern="[0-9]+"
                      value={this.state.mobile}  
                      onChange={e=>{this.setState({mobile:e.target.value})}}/>
                  </div>
                  <div className="contact-form--input">
                    <input type="email" placeholder="Your e-mail" 
                      value={this.state.email}  onChange={e=>{this.setState({email:e.target.value})}}/>
                  </div>
                </div>
                <div className="contact-form--input">
                  <input type="text" placeholder="Subject" required
                    value={this.state.subject} onChange={e=>{this.setState({subject:e.target.value})}}/>
                </div>
                <div
                  className="contact-form--input contact-form--input-area">
                  <textarea name="subject" cols="auto" rows="auto" value={this.state.message} required 
                      placeholder="Type your message here" onChange={e=>{this.setState({message:e.target.value})}} >
                    
                  </textarea>
                </div>
                <div className="form-error" style={{display:(this.state.error.length>0)?'block':'none'}}>
                    {this.state.error}
                </div>
                <div className="contact-form-button">
                  <button className="button button--md" type="submit">
                    Send Message <i className={"fa "+((this.state.running)?'fa-circle-o-notch fa-spin':'')}></i>
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
 
    <section className="section iframe">
      <div className="iframe__canvas">
        <iframe
          id="gmap_canvas"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30131.64797169093!2d73.0387653!3d19.2625264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bdfe2ca8896f%3A0x3df8a5862bc8378c!2sRio%20aarman%20hardware%20pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661449956080!5m2!1sen!2sin" 
          loading="lazy"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          title="Rio Aarman Location Map"
        ></iframe>
        <Link to="https://www.whatismyip-address.com/"></Link><br />
        <Link to="https://www.embedgooglemap.net/"></Link>
      </div>
    </section>
   
            </div>
        );
    }
}

export default ContactUs;