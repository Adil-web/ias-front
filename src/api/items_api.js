

import axios from "axios";
import authHeader from "./data-service";

const GET_ITEMS='/api/test/menu_items';



export default {
    getMenuItems() {
        return axios.get(GET_ITEMS,{ headers: authHeader() })
    },
}
