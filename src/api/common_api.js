import axios from 'axios'


const AUTHORIZATION_URL='/api/auth/signin';

export default {

    login(user){
        return axios.post(AUTHORIZATION_URL,user)
    }




}
