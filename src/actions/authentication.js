import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import {notify} from 'react-notify-toast';



let myColor = { background: '#0E1717', text: "#FFFFFF" };
export const registerUser = (user, history) => dispatch => {

    axios.post('https://joy-git-cheat-sheet.herokuapp.com/register', user)
            .then((res) =>{ 
               
                notify.show(user.name + 'Has been Registered', "custom", 5000, myColor);
                history.push(`/login`)
               
            })
            .catch(err => {
                
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                });
            });
}

export const loginUser = (user, history) => dispatch => {
    axios.post('https://joy-git-cheat-sheet.herokuapp.com/login', user)
            .then((res) => {
                
                
                const { token } = res.data;
                
                if (token){
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                notify.show('You have successfully Logged in', "custom", 5000, myColor);
                history.push('/dashboard')

                }else{
                    notify.show('Wrong Credentials', "custom", 5000, myColor);
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}