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
import NewProduct from "./view/NewProduct.vue"
import Discount from "./view/Discount.vue"
import Constructor from "./view/Constructor.vue"
import ConstructorCard from "./Constructor/ConstructorCard.vue"
import ConstCard2 from "./Constructor/ConstCard2.vue"
import ConstCard3 from "./Constructor/ConstCard3.vue"
import ConstCard4 from "./Constructor/ConstCard4.vue"
import ConstCard5 from "./Constructor/ConstCard5.vue"
import ConstCard6 from "./Constructor/ConstCard6.vue"
import ConstCard7 from "./Constructor/ConstCard7.vue"
const router = createRouter({

    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/ConstCard4',
            name: 'ConstCard4',
            component: ConstCard4,
        },
        {
            path: '/Catalog',
            name: 'Catalog',
            component: Catalog,
        },
        {
            path: '/NewProduct',
            name: 'NewProduct',
            component: NewProduct,
        },
        {
            path: '/ConstructorCard/',
            name: 'ConstructorCard',
            component: ConstructorCard,
        },
        {
            path: '/ConstCard2',
            name: 'ConstCard2',
            component: ConstCard2,
        },
        {
            path: '/ConstCard3',
            name: 'ConstCard3',
            component: ConstCard3,
        },
        {
            path: '/ConstCard5',
            name: 'ConstCard5',
            component: ConstCard5,
        },
        {
            path: '/ConstCard6',
            name: 'ConstCard6',
            component: ConstCard6,
        },
        {
            path: '/ConstCard7',
            name: 'ConstCard7',
            component: ConstCard7,
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
            path: '/Constructor',
            name: 'Constructor',
            component: Constructor,
        },
        {
            path: '/Discount',
            name: 'Discount',
            component: Discount,
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