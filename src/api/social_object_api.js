import axios from "axios";
import authHeader from "./data-service";

const GET_SOCIAL_OBJECTS='/api/test/social_objects';


export default {


    getSocialObjects() {
        return axios.get(GET_SOCIAL_OBJECTS,{ headers: authHeader() })
    },



}
