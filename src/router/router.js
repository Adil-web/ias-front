import VueRouter from "vue-router";
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/components/admin/Users';
import Organizations from '@/components/admin/Organizations';

import PowerBI from "../components/powerbi/PowerBi";
import CustomComponent from "../components/powerbi/CustomComponent";






import Vue from 'vue';
import MainLayout from '@/components/shared/MainLayout';
import Calendar from '@/components/shared/Calendar';
import AdminLayout from "@/components/admin/AdminLayout";
import MenuItems from "../components/admin/MenuItems";

Vue.use(VueRouter);






const router =  new VueRouter({
    mode: 'history',
    routes: [
        { path: '/main', name:'main', component: MainLayout, children:[
                {
                    path: 'home', name:'home', component: Home
                },
                {
                    path: 'bi/:id', name: 'bi', component: PowerBI, props:true
                },
                {
                    path: 'gmap', name: 'gmap', component: CustomComponent
                },
                {
                    path: 'calendar', name: 'calendar', component: Calendar
                },



            ]
        },
        { path: '/login', name:'login', component: Login},
        { path: '/admin', name:'admin', component: AdminLayout
            , children:[
                {
                    path: 'users', name: 'users', component: Users
                },
                {
                    path: 'organizations', name: 'organizations', component: Organizations
                },
                {
                    path: 'calendar', name: 'calendar', component: Calendar
                },
                {
                    path: 'menuitems', name: 'menuitems', component: MenuItems
                }
            ]
        },
    ]


});




router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];

    const authRequired = !publicPages.includes(to.path);
    const loggedIn = sessionStorage.getItem('user-token');
    if (authRequired && !loggedIn ||to.name==null) {
        next('/login');
    } else {
        next();
    }
});

export default router;






