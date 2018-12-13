import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication'
import classnames from 'classnames';
import Notifications from 'react-notify-toast';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    handleInputChange=(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    goBack=() =>{
        this.props.history.push('/register')
    }

    handleSubmit=(e)=> {
        e.preventDefault();
        
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        if(this.props.loginUser(user)){
            this.props.history.push('/dashboard');
        }
        
        
    }

    componentDidMount() {
        
        if(this.props.auth.isAuthenticated) {
            
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;

        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
        <Notifications />
            <h2 style={{marginBottom: '40px',marginTop: '100px'}}>Login</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    required
                    />
                    
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })} 
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    required
                    />
                    
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Login User
                    </button>
                    <button type="button" className="btn btn-success" onClick={this.goBack}>
                        Register
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

Login.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})

export  default connect(mapStateToProps, { loginUser })(Login)