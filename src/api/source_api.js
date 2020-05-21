import axios from "axios";
import authHeader from "./data-service";

const GET_SOURCES='/api/test/sources';



export default {
    getSources() {
        return axios.get(GET_SOURCES,{ headers: authHeader() })
    },
}
