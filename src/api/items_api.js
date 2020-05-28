

import axios from "axios";
import authHeader from "./data-service";

const GET_ITEMS='/api/test/menu_items';
const EDIT_MENU_ITEM='/api/test/edit_menu_item';
const CREATE_MENU_ITEM='/api/test/add_menu_item';




export default {
    getMenuItems() {
        return axios.get(GET_ITEMS,{ headers: authHeader() })
    },

    editMenuItemApi(menuItem){
        return axios.post(EDIT_MENU_ITEM, menuItem,{ headers: authHeader() })
    },

    createMenuItemApi(menuItem){
        return axios.post(CREATE_MENU_ITEM, menuItem,{ headers: authHeader() })
    },
}
