import VueRouter from "vue-router";
import Login from '@/views/Login';
import Vue from 'vue';

Vue.use(VueRouter);





export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/login', name:'login', component: Login}
    ]
});



