import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import {auth} from '../../src/services/firebase.ts'; 

const routes: RouteRecordRaw[] = [
    
    {
        path: '/home',
        alias: '/home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/auth/dashboard.vue'),
        
        meta: {
            requiresAuth: true, 
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/register.vue'),
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(async (to) => {
    // Attend que Firebase ait fini d'initialiser l'état d'authentification
    await auth.authStateReady();
    
    const currentUser = auth.currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    // Si on a pas d'utilisateur connecté et que la route nécessite une authentification, on redirige vers la page de login
    if (requiresAuth && !currentUser) {
        return { name: 'login' };
    }
    // Si l'utilisateur est connecté et qu'il essaie d'accéder à la page de login ou d'inscription, on le redirige vers le dashboard
    if ((to.name === 'login' || to.name === 'register') && currentUser) {
        return { name: 'dashboard' };
    }
});
export default router;