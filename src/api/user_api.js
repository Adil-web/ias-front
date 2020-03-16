import axios from 'axios'
import authHeader from './data-service';


const GET_USERS='/api/test/users';

const EDIT_USER='/api/test/edit';
const CREATE_USER='/api/test/create';
const DELETE_USER='/api/test/delete';

export default {

    getUsersApi(){
        return axios.get(GET_USERS, { headers: authHeader() })
    },


    editUserApi(user){
        return axios.post(EDIT_USER, user,{ headers: authHeader() })
    },

    createUserApi(user){
        return axios.post(CREATE_USER, user,{ headers: authHeader() })
    },


    deleteUserApi(userId){
        console.log(userId)
        return axios.get(DELETE_USER +'?userId='+userId,{ headers: authHeader() })
    }








}
