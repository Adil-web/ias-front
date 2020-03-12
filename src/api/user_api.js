import axios from 'axios'
import authHeader from './data-service';


const GET_USERS='/api/test/users';
const EDIT_USER='/api/test/edit';
const CREATE_USER='/api/test/create';
const DELETE_USER='/api/test/delete';

export default {

    getUsers(){
        return axios.get(GET_USERS, { headers: authHeader() })
    },


    editUser(user){
        return axios.post(EDIT_USER, user,{ headers: authHeader() })
    },

    createUser(user){
        return axios.post(CREATE_USER, user,{ headers: authHeader() })
    },


    deleteUser(){
        return axios.delete(DELETE_USER, { headers: authHeader() })
    }








}
