import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getAllCommands} from '../../actions/commands';

import '../../App.css';


class Commands extends Component {
    constructor(props) {
      
        super(props);
        this.state = {
            
        }
    }
    componentDidMount() {
        this.props.getAllCommands(this.props.match.params.id) 
        
    }
    moveBack=()=>{
        this.props.history.push(`/`);
    }
    
    render() {
        const commands = this.props.allcommands
       
        
        return (
            <div className="container">
                <h3>Commands</h3>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Command</th>
                    <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        commands.map((cmd, id)=>{
                        return   <tr key={id}>
                                    <td>{cmd.command}</td>
                                    <td>{cmd.description}</td>  
                                    </tr>
                        })
                    }   
                </tbody>
                </table>
                <button className="btn btn-outline-primary" onClick={this.moveBack}>Back</button>
            </div>
        );
    }
}
Commands.propTypes = {
    getAllCommands: PropTypes.func.isRequired,
    
};

const mapStateToProps = state => {
    // auth:state.auth,
    // errors:state.errors,
    // allcategories:state.catogories.categories

    
     const auth =state.auth;
     const errors = state.errors;
    const allcommands = state.commands.commands;
    return {
        auth,
        errors,
        allcommands
    }
    
};

export default connect(mapStateToProps,{ getAllCommands})(Commands)