import {
    createRouter,
    createWebHistory
} from 'vue-router';


import Home from "./view/Home.vue"
import Catalog from "./view/Catalog.vue"

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

    ]
})
export default router;