import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications, {notify} from 'react-notify-toast';

import { getAllCategories, searchCategories, addCategory,editCategory} from '../../actions/categories';
import '../../App.css';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            term:'',
            category:''
        }
    }
    componentDidMount() {
        this.props.getAllCategories()
    }

    MovetoCommands(event,id){

        this.props.history.push(`/cat/`+id);
      }

    handleInputChange=(e) =>{
    this.setState({
        [e.target.name]: e.target.value
    })
    }


    addCategory = (e) => {
        e.preventDefault();
    const cat = {
        category: this.state.category  
    }
    this.props.addCategory(cat)
    document.getElementById("exampleModal").click();
    
    }
    editCategory = (event, id) => {
        event.preventDefault();
    const cat = {
        category: this.state.category  
    }
    console.log(id)
    this.props.editCategory(id,cat)
    document.getElementById("exampleModal2").click();
    
    }

    
    render() {
        const categories = this.props.allcategories
        console.log(categories)
        return (
            <div className="container">
            <Notifications options={{zIndex: 400, top: '100px'}} />
            {/* Search categories */}
            <input 
                    className="search"
                    placeholder= "search Category"
                    value = {this.state.term}
                    onChange={event => this.setState({term: event.target.value}, () => {
                    this.props.searchCategories(this.state.term);
                })} /><br/>
                
                
                        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
                        Add 
                        </button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalLabel">Add Category</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="InputCategory">Category:</label>
                                    <input type="text" name="category" onChange={ this.handleInputChange } className="form-control" id="InputCategory"  placeholder="Enter category" required/>
                                    
                                </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.addCategory}>Save</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                <div className=" container row">
                {
                    categories.map((cat,id)=>{
                        
                        return  <div className="card">
                        <div key={cat._id} className="card-body">
                            <h5 className="card-title"> Category:{cat.category}</h5>
                            <div className="card-text">
                            <button className="btn btn-outline-warning" onClick={(event)=>this.MovetoCommands(event, cat._id)}>View</button>
                            <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalLabel">Edit Category</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="InputCategory">Category:</label>
                                    <input type="text" name="category" value={this.state.category} onChange={ this.handleInputChange } className="form-control" id="InputCategory"  placeholder="Enter category" required/>
                                    
                                </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={(event)=>this.editCategory(event,cat._id)}>Save</button>
                            </div>
                            </div>
                        </div>
                        </div>

                            
                            </div>
                        </div>
                        </div>
                     })

                }
                </div>
            </div>
        );
    }
}
Homepage.propTypes = {
    getAllCategories: PropTypes.func.isRequired,
    
};

const mapStateToProps = state => {
    // auth:state.auth,
    // errors:state.errors,
    // allcategories:state.catogories.categories

   console.log(state)
     const auth =state.auth;
     const errors = state.errors;
    const allcategories = state.catogories.categories;
    
    return {
        auth,
        errors,
        allcategories

    }
    
};

export default connect(mapStateToProps,{ 
    getAllCategories, 
    searchCategories,
    addCategory,
    editCategory
        
})(Homepage)