import axios from "axios";
import authHeader from "./data-service";

const GET_CATEGORIES='/api/test/categories';



export default {
    getCategories() {
        return axios.get(GET_CATEGORIES,{ headers: authHeader() })
    },
}
