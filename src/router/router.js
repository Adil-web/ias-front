import VueRouter from "vue-router";
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/components/admin/Users';
import Organizations from '@/components/admin/Organizations';
import PowerBI from '@/components/admin/PowerBI';

import Budget from "../components/powerbi/Budget";






import Vue from 'vue';
import MainLayout from '@/components/shared/MainLayout';
import Calendar from '@/components/shared/Calendar';
import AdminLayout from "@/components/admin/AdminLayout";

Vue.use(VueRouter);






const router =  new VueRouter({
    mode: 'history',
    routes: [
        { path: '/main', name:'main', component: MainLayout, children:[
                {
                    path: 'home', name:'home', component: Home
                },
                {
                    path: 'powerbi', name: 'powerbi', component: PowerBI
                },
                               {
                    path: 'budget', name: 'budget', component: Budget, props:true
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







