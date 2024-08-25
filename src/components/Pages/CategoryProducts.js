import { UserType } from "../../Constants";
import { withRouter } from "../../routed-component-wrapper";
import BaseAppComponent from "../base-app-component";
import LoadingScreen from "../views/loading-screen";
import CategoryTile from "../views/misc/category-item-tile";
import ProductCardView from "../views/misc/product-cardview";
import MyTreeView from "../views/misc/treeview/tree-view";

const MAX_ITEM_COUNT = 9;

class CategoryProducts extends BaseAppComponent{

    categories=null;
    currentId=-1;
    userType = UserType.UNREGISTERED;
    lastSearch=null;
    searchToken=null;
    hasMounted=false;
    productListCache=[];
    productListVisible=[];


    state={
        productList:null,
        currentId:-1,
        loading:true
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        setTimeout(()=>{
            if(this.props.isSearch){
                this.getSearchResults();
            }else{
                this.getProductList();
            }
        },10)
    }

    componentDidUpdate(){
        setTimeout(()=>{
            if(this.props.isSearch){
                this.getSearchResults();
            }else{
                this.getProductList();
            }
        },10)
    }

    hasMoreProducts = ()=>{return this.state.productList.length<this.productListCache.length && this.productListCache.length>0}

    showMoreProducts = ()=>{
        if(this.hasMoreProducts()){
            const start = this.state.productList.length
            const list = this.productListCache.filter((d,i)=>{
                return i<start + MAX_ITEM_COUNT
            })
            this.setState({productList:list})
        }
    }

    getSearchResults =()=>{
        const qs = (new URL(window.location.href)).search;
        if(qs!==null && qs!=='' && qs!==this.lastSearch){
            this.lastSearch=qs;
            this.currentId = -1;
            const key = (new URLSearchParams(qs)).get('s');
            this.searchToken = key;
            if(key!==null && key!==''){
                this.context?.getAuthService().getSearchResults(key)
                .then(req =>{
                    const {product} = req.data;
                    this.productListCache=[...product];
                    this.setState(ps=>{
                        const list = this.productListCache.splice(0, MAX_ITEM_COUNT)
                        const ns = {...ps, productList:[...list], loading:false}
                        return ns;
                    })
                })
                .catch(err=>{
                    console.log(err)
                    this.setNoResult()
                })
            }else this.setNoResult()
        }
    }

    

    getProductList = ()=>{
        const catId = this.props?.params?.catid;
        if(catId!==undefined && catId!==null && catId!=="" && this.currentId!==catId){
            this.currentId = catId;
            this.setState({loading:true})
            this.context?.getAuthService().getCategoryProducts(catId)
            .then(req =>{
                const {product} = req.data;
                this.productListCache=[...product];
                this.setState(ps=>{
                    const list = this.productListCache.filter((d,i)=>{
                        return i<MAX_ITEM_COUNT
                    })
                    const ns = {...ps, productList:list, loading:false}
                    return ns;
                })
            })
            .catch(err=>{
                console.log(err)
                this.setNoResult()
            })
        }
    }

    setNoResult=()=>{
        if(this.hasMounted) this.setState(ps=>{
            const ns = {...ps, productList:null, loading:false}
            return ns;
        })
    }

    /* need to use ref. temp func */
    treeViewVisible=()=>{
        const el = document.getElementById('treeViewCont');
        return el && el.offsetWidth>0 && el.offsetHeight>0
    }


    render(){

        if(!(this.categories && this.categories.length>0)){
            this.categories = this.context.getCategories();
            this.childParentMap = this.context.getCatMap();
        }

        let subCats=[], subSubCats=[];
        let cid = parseInt(this.currentId);
        let activeIds = [];
        do{
            activeIds.push(cid)
            cid = this.childParentMap[cid]
        }while(cid!==undefined && cid!==0)
        if(this.state.loading)return <LoadingScreen show={true} />

        return (<div>

        
        {/*<!-- Shop list Section Start  -->*/}
        <section className="shop shop--one">
            <div>
                <div className="cat-menu-mobile" style={{borderBottom:0,marginBottom:0}}>
                {
                    this.categories?.map((d,i)=>{
                        const active = activeIds.indexOf(d.id)>-1
                        if(active){
                            subCats = d.sub_categories;
                        }
                        return <CategoryTile image={d.image_web} active={active} key={i} text={d.title} to={"/categoryproducts/"+d.id}/>
                    })
                }
                </div>
                <div className={"cat-menu-mobile" + ((subCats.length)?'':" hide")}>
                    {
                        subCats.map((d,i)=>{
                            const active = activeIds.indexOf(d.id)>-1
                            if(active){
                                subSubCats = d.sub_categories;
                            }
                            return <CategoryTile  image={d.image_web}  active={active} key={i}  text={d.title} to={"/categoryproducts/"+d.id}/>
                        })
                    }
                </div>
            </div>
            <div className="container">
                <div className="row shop-content">
                    <div className="col-3">
                        <div id="treeViewCont" className="cat-list-container">
                            <div className="cat-list-heading">Product Categories</div>
                            <MyTreeView refresh={()=>{this.setState({loading:false})}} activeIds={[...activeIds]} selectedId={parseInt(this.currentId)} categories={this.categories}/>
                        </div>
                        {/** side menu mobile - vertical */}
                        <div className={(subSubCats.length)?"sub-cat-menu-mobile":"sub-cat-menu-mobile hide"}>
                            <ul className="left__navigation-menu">
                                {
                                    subSubCats.map((d,i)=>{
                                        const active = activeIds.indexOf(d.id)>-1
                                        return <CategoryTile image={d.image_web} active={active} key={i}  text={d.title} to={"/categoryproducts/"+d.id}/>
                                    })
                                }
                            </ul>  
                        </div>
                    </div>
                    <div style={{minHeight:'600px'}} className={(subSubCats.length || this.treeViewVisible())?"col-9":"col-12"}>
                        <h3 className="search-header" 
                            style={{display:( this.props.isSearch && this.searchToken!=null && this.searchToken.length>0 )?'':'none'}}>
                            Search results for: {this.searchToken}
                        </h3>
                        {/*<!-- Desktop Version  -->*/}
                        {(this.state.productList && this.state.productList.length>0)
                            ?(  <div className="row shop__product-items">
                                    {
                                        this.state?.productList?.map((d,i)=>{
                                            return(
                                                <div key={d.id+"_" + i} className="col-xl-4 col-md-6">
                                                    <ProductCardView 
                                                        inCart={this.itemInCart(d.id)}
                                                        addCart={this.addToCart} 
                                                        data={d} 
                                                        isUserLoggedIn={this.isUserLoggedIn}
                                                        showPreview={this.openProductPreview}
                                                        isFav={this.itemInWishList(d.id)}
                                                        addToFav={this.addToWishList}
                                                        removeFromFav={this.removeFromWishlist}
                                                        addRatings={this.addRatings}
                                                        showToast={this.showToast}
                                                        removeFromCart={this.context.removeFromCart}
                                                        cartItemCountByPid={this.context.cartItemCountByPid}
                                                        addToCartById={this.context.addToCartById}
                                                        addclassName={"cards-md--four w-100"}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>)
                            :(<div>
                                {(!this.state.productList)
                                ?(<h2 className="cart-empty">Please select a category to view products.</h2>
                                    )
                                :(( this.props.isSearch && this.searchToken!=null && this.searchToken.length>0 )
                                    ?<h4 className="cart-empty">No products were found. Please try again with a different criteria.</h4>
                                    :<h2 className="cart-empty">No product found under this category!</h2>)}
                               </div>
                            )
                        }
                        <nav aria-label="Page navigation pagination--one" className="pagination-wrapper section--xl" style={{paddingTop: '20px'}}>
                        {(this.hasMoreProducts())
                            ?<div className="show-more-btn" onClick={()=>{this.showMoreProducts()}}>Load More Products</div>
                            :("")
                      }
                        </nav>
                        
                    </div>
                </div>
            </div>
        </section>
        {/*<!-- Shop list Section End   -->*/}

        </div>)
    }
}

export default withRouter(CategoryProducts)


/*<!-- Filter  -->
        <div className="filter--search">
            <div className="container">

                <div className="filter--search__content row">
                    <div className="col-lg-3 d-none d-lg-block">
                        <button className="button button--md" id="filter">
                            Filter
                           <i className="fa fa-filter arrows"></i>
                        </button>
                    </div>
                    <div className="col-lg-9">
                        <div className="filter--search-result">
                            <div className="sort-list">
                                <label htmlFor="sort">Sort by:</label>
                                <select id="sort" className="sort-list__dropmenu">
                                    <option value="01">Latest</option>
                                    <option value="02">Newest</option>
                                    <option value="03">Oldest</option>
                                </select>
                            </div>
                            <div className="result-found">
                                <p><span className="number">52</span> Results Found</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- Filter  -->*/


        /**
        <ul className="pagination justify-content-center">
            <li className="page-item pagination-item disabled">
                <a className="page-link pagination-link" href="#" tabIndex="-1">
                    <i className="fa fa-arrow-left"></i>
                </a>
            </li>
            <li className="page-item pagination-item"><a className="page-link pagination-link active" href="#">1</a></li>
            <li className="page-item pagination-item"><a className="page-link pagination-link" href="#">2</a></li>
            <li className="page-item pagination-item"><a className="page-link pagination-link" href="#">3</a></li>
            <li className="page-item pagination-item"><a className="page-link pagination-link" href="#">4</a></li>
            <li className="page-item pagination-item"><a className="page-link pagination-link" href="#">5</a></li>
            <li className="page-item pagination-item"><p className="page-link pagination-link">...</p> </li>
            <li className="page-item pagination-item"><a className="page-link pagination-link" href="#">21</a></li>
            <li className="page-item pagination-item">
                <a className="page-link pagination-link" href="#">
                    <i className="fa fa-arrow-right"></i>
                </a>
            </li>
        </ul>
        */