import { Component } from "react";
import { Link } from 'react-router-dom';
import './tree-view.css';


export default class MyTreeView extends Component{


    lastChosenId=-1
    activeIds=[];
    selectedId=-1;

    toggleNode = (el)=>{
        el.parentNode.classList.toggle("collapse-tree")
        if(el.parentNode.classList.contains("collapse-tree")){
            el.innerText = "+"
        }else{
            el.innerText = "-"
        }
    }

    componentDidMount(){
        this.props?.refresh();
    }

    componentWillUnmount(){
    }

    createTree = (list,depth)=>{
        depth = (depth!==null && depth!==undefined)?depth:0;
        return (
            <ul key={depth} className={"tree-view-list" + ((depth===0)?' parent-list':'')}>
            {
                list?.map((d,i)=>{
                    const hasChildren = d.sub_categories && d.sub_categories.length>0
                    const active = this.activeIds.indexOf(d.id)>-1;
                    const selected = this.selectedId===d.id;
                    return (
                    <li key={d.id} className={"tree-view-node" + ((active)?'':" collapse-tree")}>
                        {
                        (hasChildren)
                        ?<span className="node-picker" onClick={(e)=>{this.toggleNode(e.target)}}>{active?"-":"+"}</span>
                        :<span className="node-picker">&bull;</span>
                        }
                        <Link className={"node-link" + (selected?" active":"")}  to={"/categoryproducts/"+d.id}>{d.title}</Link>
                        {(hasChildren)?(this.createTree(d.sub_categories, depth+"_"+i)):""}
                    </li>)
                })
            }
           </ul>
        )
    }




    render(){
        const categories = this.props.categories || [];
        this.selectedId = this.props.selectedId || -1;
        this.activeIds = this.props.activeIds || [];
        return (
            <div className="tree-view-cont">
                {
                   this.createTree(categories) 
                }
            </div>
        )
    }
}