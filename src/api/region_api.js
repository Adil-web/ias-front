import axios from "axios";
import authHeader from "./data-service";

const GET_REGIONS='/api/test/regions';



export default {
    getRegions() {
        return axios.get(GET_REGIONS,{ headers: authHeader() })
    },
}
