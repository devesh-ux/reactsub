//this is the way how we create new component

import React from 'react';
import { Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle } from 'reactstrap';

//now this is looking like a functional component 
    function RenderMenuItem({dish,onClick}){
        return(
            <Card onClick={ ()=> onClick(dish.id)}>
                <CardImg width="100%" src ={dish.image} alt={dish.name}/>
                <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
            </Card>
        )
    }
        
    //another way of creating functional component
        
     const Menu = (props) => {
        const menu = props.dishes.map((dish)=> {
            return(
                <div key={dish.id} className="col-12 col-md-5 mt-5">
                  <RenderMenuItem dish={dish} onClick={props.onClick}/>
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
       
export default Menu;

// render method is required to return element which will be the component of UI.
//As the code runs on from top to bottom then first (constructor) is invoked then (render) method is invoked and then componentdimount ,this is the order of invoke when we call a class 