import {createWebHistory, createRouter} from 'vue-router';
import HomePage from './components/pages/HomePage.vue';
import InitPage from './components/pages/InitPage.vue';
import AccountPage from './components/pages/AccountPage.vue';
const routes=[
    {
        path:"/login",
        name:"home",
        component:HomePage
    },
    {
        path:"/",
        name:"inicio",
        component:InitPage
    },
    {
        path:"/account",
        name:"cuenta",
        component:AccountPage,
        beforeEnter:(to, from, next)=>
        {
            if(localStorage.getItem('token'))
            {
                next();
            }
            else
            {
                next('/login');
            }
        }
    }
];
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;