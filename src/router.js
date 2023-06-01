import {
    createRouter,
    createWebHistory
} from 'vue-router';


import Home from "./view/Home.vue"
import Catalog from "./view/Catalog.vue"
import ShoseCardInfo from "./components/ShoseCardInfo.vue"
import Reg from "./components/Reg.vue"
import Login from "./components/Login.vue"
import Basket from "./view/Basket.vue"
import Like from "./view/Like.vue"
const router = createRouter({

    history: createWebHistory(),
    routes: [{
            path: '/',
            name: '/',
            component: Home,
        },
        {
            path: '/Catalog',
            name: 'Catalog',
            component: Catalog,
        },
        {
            path: '/Reg',
            name: 'Reg',
            component: Reg,
        },
        {
            path: '/Basket',
            name: 'Basket',
            component: Basket,
        },
        {
            path: '/Like',
            name: 'Like',
            component: Like,
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/ShoseCardInfo/:id/:id2',
            name: 'ShoseCardInfo/',
            component: ShoseCardInfo,
        },

    ]
})
export default router;