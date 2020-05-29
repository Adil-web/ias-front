import axios from 'axios';
import authHeader from "./data-service";
const GET_WORDS = '/api/auth/words';
const CHANGE_DICTIONARY = '/api/auth/change_dic'
export default {


    getWordsApi(){
        return axios.get(GET_WORDS)
    },

    changeDictionary(){
        return axios.post(CHANGE_DICTIONARY,{ headers: authHeader() })
    }

}