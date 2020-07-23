import React, { Fragment,Component } from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,Label,Row,Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control,LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModalSubmitComment = this.toggleModalSubmitComment.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModalSubmitComment() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        this.toggleModalSubmitComment();
        alert(JSON.stringify(values));
    }

    render() {
        return (
            <Fragment>
                <Button outline onClick={this.toggleModalSubmitComment}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModalSubmitComment}>
                    <ModalHeader toggle={this.toggleModalSubmitComment}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Row className="form-group col-md-12">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select defaultValue="1" model=".rating" id="rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group col-md-12">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".yourName" id="yourName" name="yourName"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".yourName"
                                    show="touched"
                                    messages={{
                                        required: 'Required.',
                                        minLength: 'Must be greater than 3 numbers',
                                        maxLength: 'Must be 15 numbers or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group col-md-12">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control"
                                    rows="5"
                                />
                            </Row>
                            <Button type="submit" value="Submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

    function RenderDish({dish}){
        // console.log(this.state.dish.map((item)=>
        //       item.description
        // ));
        if(dish!=null){
            return(
                <div className="col-12 col-md-5 mt-1">
                    <Card>
                        <CardImg width="100%" src ={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                    
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    
    function RenderComments({ comments,addComment,dishId }) {
        if (comments.length === 0) {
            return (<Fragment></Fragment>)
        }
        const mapComments = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        });
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    {mapComments}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </ul>
    
            </div>
        )
    }
    const DishDetail = (props) =>{
        
        
            return(
          
                <div className="container">
                      <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem> <Link to='/menu'>Menu</Link> </BreadcrumbItem>
                            <BreadcrumbItem active> {props.dish} </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3> {props.dish} </h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                   <RenderDish dish = {props.dish}/>
                    <RenderComments comments = {props.comments} 
                    addComment =  {props.addComment} 
                    dishId = {props.dish.id} />
                    
                    </div>
                    
                </div>
    
            );
        
       
      
    }


export default DishDetail ; 


