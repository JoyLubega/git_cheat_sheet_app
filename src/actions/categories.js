import axios from 'axios';
import * as types from './types';
import {notify} from 'react-notify-toast';


let myColor = { background: '#2513c2', text: "#FFFFFF" };
let danger = { background: '#c23613', text: "#FFFFFF" };
export const getAllCategoriesSuccess = (categories) => {
  return({
    type: types.GET_ALLCATEGORIES_SUCCESS,
    categories
  });
}

export const getAllCategories = () => dispatch => {
  axios.get('https://joy-git-cheat-sheet.herokuapp.com/api/categories')
          .then(res => {
              dispatch({
                        type: types.GET_ALLCATEGORIES_SUCCESS,
                        payload: res
                      })

              
          })
          .catch(err => {
              
          });
}
export const searchCategories = (q) => dispatch => {
  axios.get(`https://joy-git-cheat-sheet.herokuapp.com/api/search?category=${q}`)
          .then(res => {
              dispatch({
                        type: types.SEARCH_COMMANDS_SUCCESS,
                        payload: res
                      })   
          })
          .catch(err => {
              
          });
}

export const addCategory = (category) => dispatch => {
  axios.post(`https://joy-git-cheat-sheet.herokuapp.com/api/category`,category)
          .then(res => {
              // dispatch({
              //           type: types.ADD_CATEGORY_SUCCESS,
              //           payload: res
              //         }) 
              //         
                      notify.show("Category Added", "custom", 5000, myColor); 
                      dispatch(getAllCategories()) 
                      this.props.history.push(`/dashboard`)
          })
          .catch(err => {
            notify.show("There is an error", "custom", 5000, danger);
          });
}
export const editCategory = (id, category) => dispatch => {
  axios.put(`https://joy-git-cheat-sheet.herokuapp.com/api/category/${id}`, category)
          .then(res => {
              dispatch({
                        type: types.EDIT_CATEGORY_SUCCESS,
                        payload: res
                      })  
                      notify.show("Category Edited", "custom", 5000, myColor); 
                      
          })
          .catch(err => {
            notify.show("There is an error", "custom", 5000, danger);
          });
}