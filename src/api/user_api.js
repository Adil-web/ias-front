import axios from 'axios'
import authHeader from './data-service';


const GET_USERS='/api/test/users';

const EDIT_USER='/api/test/edit';
const CREATE_USER='/api/test/create';
const DELETE_USER='/api/test/delete';
const RECOVERY_USER='/api/test/recovery';
const REMOVE_USER='/api/test/remove';
const GET_CURRENT_SESSION_USER='/api/auth/get_session_user';
const GET_EVENTS='/api/test/events';
const ADD_EVENT='/api/test/add_event';
const EDIT_EVENT='/api/test/edit_event';

export default {

    getUsersApi(bool){
        return axios.get(GET_USERS+'?bool='+bool, { headers: authHeader() })
    },


    editUserApi(user){
        return axios.post(EDIT_USER, user,{ headers: authHeader() })
    },

    createUserApi(user){
        return axios.post(CREATE_USER, user,{ headers: authHeader() })
    },


    deleteUserApi(userId, bool,roleId){
        console.log(userId)
        return axios.get(DELETE_USER +'?userId='+userId+'&bool='+ bool+'&roleId='+roleId,{ headers: authHeader() })
    },

    recoveryUserApi(userId, bool){
        console.log(userId)
        return axios.get(RECOVERY_USER +'?userId='+userId+'&bool='+ bool,{ headers: authHeader() })
    },

    removeUserApi(userId){
        console.log(userId)
        return axios.get(REMOVE_USER +'?userId='+userId,{ headers: authHeader() })
    },


    get_session_user(){

        return axios.get(GET_CURRENT_SESSION_USER,{ headers: authHeader() })
    },

    get_eventsApi(){
        return axios.get(GET_EVENTS,{ headers: authHeader() })
    },

    addEventApi(event){
        return axios.post(ADD_EVENT,event,{ headers: authHeader() })
    },

    editEventApi(event){
        return axios.post(EDIT_EVENT,event,{ headers: authHeader() })
    },

    test(date){
        return axios.post('/api/test/date',date,{ headers: authHeader() })
    },











}
