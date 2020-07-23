import React, { Component } from 'react';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishDetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedBack, fetchLeaders, fetchDishes,fetchComments, fetchPromos} from '../redux/ActionCreators';
import { actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
//state form redux store
//so all this.state becomes this.props
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

//dispatch will return the action obj and supply to addComment

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedBack: (firstname, lastname, telnum, email, agree,contactType,message) => dispatch(postFeedBack(firstname, lastname, telnum, email, agree,contactType,message)),
  fetchDishes:() =>{dispatch(fetchDishes())},
  fetchLeaders:() =>{dispatch(fetchLeaders())},
  resetFeedbackForm:() =>{ dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
  
});

  resetFeedbackForm : () => { dispatch(actions.reset('feedback'))}


class Main extends Component {
  constructor(props) {
    super();
    // this.onDishSelect = this.onDishSelect.bind(this);
    //this.state = {
    // dishes: DISHES,
    // comments: COMMENTS,
    // promotions: PROMOTIONS,
    // leaders : LEADERS
    //selectedDish:null
    //};
  }
  // onDishSelect(dishId){     
  //     this.setState({ selectedDish: dishId});
  //     const dishTest = this.state.dishes.filter(dishes => dishes.id === this.state.selectedDish)[0]
  // }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {
    
    const HomePage = () => {
      return (
        <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
          />
      )
    }
    const AboutPage = () => {

      
      return(
        <About 
          leaders={this.props.leaders}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );

    }


    const DishWithId = ({ match }) => {

      return (
       <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
      );

    }
  
    return (
      <div>
        <Header />
       
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={AboutPage} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact postFeedBack = {this.props.postFeedBack}
                  resetFeedbackForm={this.props.resetFeedbackForm} />} />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>

        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
        {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Footer />
      </div>
    )
  }
}
//connecting compo to react router
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));