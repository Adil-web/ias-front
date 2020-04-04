import VueRouter from "vue-router";
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/components/admin/Users';
import Organizations from '@/components/admin/Organizations';
import PowerBI from '@/components/admin/PowerBI';
import StrategicManagement from '@/components/powerbi/StrategicManagement';
import Budget from "../components/powerbi/Budget";
import BudgetInvestment from '@/components/powerbi/BudgetInvestment';
import DigitalSocialObj from '@/components/powerbi/DigitalSocialObj';
import Education from '@/components/powerbi/Education';
import EducationAssessment from '@/components/powerbi/EducationAssessment';
import GraduateToVillage from "../components/powerbi/GraduateToVillage";
import HealthAssessment from "../components/powerbi/HealthAssessment";
import LivestockAnalysis from "../components/powerbi/LivestockAnalysis";
import PredictionGRP from "../components/powerbi/PredictionGRP";
import SocialMonitoring from "../components/powerbi/SocialMonitoring";
import SocialProtection from "../components/powerbi/SocialProtection";





import Vue from 'vue';
import MainLayout from '@/components/shared/MainLayout';
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
                    path: 'strategicManagement', name: 'strategicManagement', component: StrategicManagement
                },
                {
                    path: 'budget', name: 'budget', component: Budget
                },
                {
                    path: 'budgetInvestment', name: 'budgetInvestment', component: BudgetInvestment
                },
                {
                    path: 'digitalSocialObj', name: 'digitalSocialObj', component: DigitalSocialObj
                },
                {
                    path: 'education', name: 'education', component: Education
                },
                {
                    path: 'educationAssessment', name: 'educationAssessment', component: EducationAssessment
                },
                {
                    path: 'graduateToVillage', name: 'graduateToVillage', component: GraduateToVillage
                },
                {
                    path: 'healthAssessment', name: 'healthAssessment', component: HealthAssessment
                },
                {
                    path: 'livestockAnalysis', name: 'livestockAnalysis', component: LivestockAnalysis
                },
                {
                    path: 'predictionGRP', name: 'predictionGRP', component: PredictionGRP
                },
                {
                    path: 'socialMonitoring', name: 'socialMonitoring', component: SocialMonitoring
                },
                {
                    path: 'socialProtection', name: 'socialProtection', component: SocialProtection
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
                    path: 'powerbi', name: 'powerbi', component: PowerBI
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







