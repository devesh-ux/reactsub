import React,{ Component } from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle} from 'reactstrap';


class DishDetail extends Component {
    constructor(props){
        super(props);
    }

    renderDish(selectedDish){
        
        if(selectedDish!=null){
            return(
                    <Card>
                        <CardImg width="100%" src ={selectedDish.image} alt={selectedDish.name}/>
                        <CardBody>
                            <CardTitle>{selectedDish.name}</CardTitle>
                            <CardText>{selectedDish.description}</CardText>
                        </CardBody>
                    </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    renderComments(selectedDish) {
        console.log("devesh");
        if (selectedDish == null) {
           return (<div></div>)
       }
   const cmnts = selectedDish.map(comments => {
       return (
           <li key={comments.id}>
               <p>{comments.comment}</p>
               <p>-- {comments.author},
               &nbsp;
               {new Intl.DateTimeFormat('en-US', {
                       year: 'numeric',
                       month: 'long',
                       day: '2-digit'
                   }).format(new Date(comments.date))}
               </p>
           </li>
       )
   })
   return (
       <div>
           <h4> Comments </h4>
           <ul className='list-unstyled'>
               {cmnts}
           </ul>

       </div>
   )
}
    render(){

       
        return(
           
            <div className="row">
                <div className="col-12 col-md-5 mt-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 mt-1">
                    {this.renderComments(this.props.selectedDish)}
                </div>
            </div>

        );
    }
}

export default DishDetail ; 