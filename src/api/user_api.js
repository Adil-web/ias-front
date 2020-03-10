import axios from 'axios'
import authHeader from './data-service';


const GET_USERS='/api/test/users';

export default {

    getUsers(){
        return axios.get(GET_USERS, { headers: authHeader() })
    }




}
