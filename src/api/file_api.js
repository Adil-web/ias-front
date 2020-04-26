import axios from 'axios'
import authHeader from './data-service';



const UPLOAD_FILE='/api/test/uploadFile';
const UPLOAD_FILES='/api/test/uploadMultipleFiles';
const GET_FILE='/api/test/downloadFile';
// const RECOVERY_USER='/api/test/recovery';
// const REMOVE_USER='/api/test/remove';
// const GET_CURRENT_SESSION_USER='/api/auth/get_session_user';
// const GET_EVENTS='/api/test/events';
// const ADD_EVENT='/api/test/add_event';
// const EDIT_EVENT='/api/test/edit_event';

export default {

    uploadFile(file) {
        let h = authHeader();
        h["Content-Type"]= "multipart/form-data";
        return axios.post(  UPLOAD_FILE, file, { headers: h }   )
    },

    uploadFiles(files) {
        let h = authHeader();
        h["Content-Type"]= "multipart/form-data";
        return axios.post(UPLOAD_FILES, files, {headers: h})
    },

    downloadFile(fileName) {
        let h = authHeader();
        h["Content-Type"]= "multipart/form-data";
        return axios.get(GET_FILE+'/'+fileName,{responseType: 'blob', headers: h})
    },


}
