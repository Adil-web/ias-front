import axios from 'axios'
import authHeader from './data-service';



const UPLOAD_FILE='/api/test/uploadFile';
const UPLOAD_FILES='/api/test/uploadMultipleFiles';
const DOWNLOAD_FILE='/api/test/downloadFile';
const GET_FILES='/api/test/get_files';
// const REMOVE_USER='/api/test/remove';
// const GET_CURRENT_SESSION_USER='/api/auth/get_session_user';
// const GET_EVENTS='/api/test/events';
// const ADD_EVENT='/api/test/add_event';
// const EDIT_EVENT='/api/test/edit_event';

export default {


    getFiles(id) {
        return axios.get(GET_FILES+'?id='+id,{ headers: authHeader() })
    },

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

    downloadFile(file) {
        let h = authHeader();
        h["Content-Type"]= "multipart/form-data";
        axios.get(DOWNLOAD_FILE+'/'+file.fs_name,{responseType: 'blob', headers: h}).then(rs=>{
            const url = window.URL.createObjectURL(new Blob([rs.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.original_name);
            document.body.appendChild(link);
            link.click();
        })
    },


}
