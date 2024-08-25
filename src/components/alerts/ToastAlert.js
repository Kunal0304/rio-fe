import { Component } from "react";

export default class ToastAlert extends Component{

    state={
        msg:'',type:'info'
    }
    tid=null; show=false; lastUpdate=(new Date()).getTime();
    duration=3;


    componentDidUpdate(){
        if(this.lastUpdate!==this.props.data.tm){
            this.lastUpdate = this.props.data.tm;
            this.setState(ps=>{
                const ns = {...ps, msg:this.props.data.msg, type:this.props.data.type}
                return ns;
            })
            if(this.tid>-1)clearTimeout(this.tid)
            this.tid = setTimeout(this.hide, this.duration*1000)//2 seconds
        }
    }

    hide=()=>{
        this.setState(ps=>{
            const ns = {...ps, msg:'', type:'info'}
            return ns;
        })
    }

    render(){
        return( <div id="alert_1a9e2" className={"alert alert-" + this.state.type 
                    + ((this.state.msg.length>0)?' alert-show':' alert-hide')}><span>{this.state.msg}</span></div>)
    }


}