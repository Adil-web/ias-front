import axios from "axios";
import authHeader from "./data-service";

const GET_CATEGORIES='/api/map/categories';
const GET_REGIONS='/api/map/regions';
const GET_SOCIAL_OBJECTS='/api/map/social_objects';




export default {
    getCategories() {
        return axios.get(GET_CATEGORIES,{ headers: authHeader() })
    },

    getRegions() {
        return axios.get(GET_REGIONS,{ headers: authHeader() })
    },
    getSocialObjects() {
        return axios.get(GET_SOCIAL_OBJECTS,{ headers: authHeader() })
    },
}
