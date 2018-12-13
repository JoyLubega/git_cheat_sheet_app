import axios from 'axios';
import * as types from './types';



export const getAllCommands = (id) => dispatch => {
    axios.get(`https://joy-git-cheat-sheet.herokuapp.com/api/category/${id}/commands`)
            .then(res => {
                dispatch({
                          type: types.GET_ALLCOMMANDS_SUCCESS,
                          payload: res
                        })
  
                
            })
            .catch(err => {
                
            });
  }