import VueRouter from "vue-router";
import Login from '@/views/Login';
import Home from '@/views/Home';

import Vue from 'vue';
import MainLayout from "@/components/shared/MainLayout";


Vue.use(VueRouter);



export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/main', name:'main', component: MainLayout, redirect:{ name: 'home'},  children:[
                {
                    path: '/home', name:'home', component: Home
                }
            ]
        },
        { path: '/login', name:'login', component: Login},
    ]
});







