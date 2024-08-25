import { Component } from "react";


export default class StartRatings extends Component{

    state={
        hasRated:false,
        rating:0
    }
    originalRating=0;
    setRating=(val, target)=>{
        if(!this.props.addRatings || this.props.pid===undefined)return;
        const fn = this.props.addRatings({productId:this.props.pid, rating:val, review:''})
        if(fn!==null){
            target.classList.add('animate-rating');
            fn.then(res=>{
                const {data} = res;
                target.classList.remove('animate-rating');
                if(data.status===true){
                    this.props?.showToast('Ratings submitted successfully!', 'success')
                    this.setState(ps=>{
                        const ns = {...ps, rating:data.review.rating, hasRated:true};
                        return ns;
                    });
                }else throw new Error(res.message)
            })
            .catch(err=>{
                target.classList.remove('animate-rating');
                this.props?.showToast('Could not submit the review. Try again later.', 'danger')
            })
        }
        
    }

    componentDidUpdate(){
        if(this.props.rating!==undefined && this.props.rating!==this.originalRating){
            this.originalRating=this.props.rating;
            this.setState({hasRated:false})
        }
    }

    render(){

        //const {addRatings, pid, showToast} = this.props
        //if(!addRatings || !pid || !showToast)throw new Error('Star Rating props missing')
        this.originalRating = this.props.rating || 0;
        

        const sr = (this.state.hasRated)?this.state.rating:this.originalRating;
       
        const rwidth = (Math.min(sr,5)/5)*100;
        const rcolor = this.props.color || '#ffb307';
        return (
        <span className="cards-md__info-rating-parent">
            <ul className="cards-md__info-rating d-flex" style={{padding:0, margin:0, color:'#d1d1d1', pointerEvents:(this.state.hasRated)?'none':''}}>
                <li onClick={(e)=>{this.setRating(1, e.target)}}><i className="fa fa-star star-small"></i></li>
                <li onClick={(e)=>{this.setRating(2, e.target)}}><i className="fa fa-star star-small"></i></li>
                <li onClick={(e)=>{this.setRating(3, e.target)}}><i className="fa fa-star star-small"></i></li>
                <li onClick={(e)=>{this.setRating(4, e.target)}}><i className="fa fa-star star-small"></i></li>
                <li onClick={(e)=>{this.setRating(5, e.target)}}><i className="fa fa-star star-small"></i></li>
            </ul>
            <ul style={{width:rwidth+'%', color:rcolor, margin:0, pointerEvents:'none'}} className="cards-md__info-rating-upper d-flex">
                <li><i className="fa fa-star star-small"></i></li>
                <li><i className="fa fa-star star-small"></i></li>
                <li><i className="fa fa-star star-small"></i></li>
                <li><i className="fa fa-star star-small"></i></li>
                <li><i className="fa fa-star star-small"></i></li>
            </ul>
        </span>
        )
    }
}