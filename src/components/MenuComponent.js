//this is the way how we create new component

import React,{ Component } from 'react';
import { Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle } from 'reactstrap';


class Menu extends Component {
    constructor(props){
        super(props);
 
    }
   

    render(){
        
         
        const menu = this.props.dishes.map((dish)=> {
            return(
                <div key={dish.id} className="col-12 col-md-5 mt-5">
                    <Card onClick={ ()=> this.props.onClick(dish.id)}>
                        <CardImg width="100%" src ={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                            </CardImgOverlay>
                    </Card>
                </div>
            );
        });


        return(
            <div className ="container">
                <div className="row">
                        {menu}
                </div>
            </div>
        );
    }
}

export default Menu;

// render method is required to return element which will be the component of UI.
//As the code runs on from top to bottom then first (constructor) is invoked then (render) method is invoked and then componentdimount ,this is the order of invoke when we call a class 