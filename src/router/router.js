import VueRouter from "vue-router";
import Login from '@/views/Login';
// import Home from '@/views/Home';
import Home from '@/views/Home';

import Vue from 'vue';
import MainLayout from "../components/shared/MainLayout";


Vue.use(VueRouter);






export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '', name:'main', component: MainLayout, children:[
                {
                    path: '.', name:'home', component: Home
                }
            ]
        },
        // { path: '.', name:'login', component: Login},
        { path: '/login', name:'login', component: Login},

    ]
});







