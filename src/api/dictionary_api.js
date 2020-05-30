import axios from 'axios';
import authHeader from "./data-service";
const GET_WORDS = '/api/auth/words';
const CHANGE_DICTIONARY = '/api/test/update_dictionary'
export default {


    getWordsApi(){
        return axios.get(GET_WORDS)
    },

    changeDictionary(words){
        return axios.post(CHANGE_DICTIONARY,words,{ headers: authHeader() })
    }

}