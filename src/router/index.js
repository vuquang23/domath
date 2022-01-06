import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ExercisePage from '../views/ExercisePage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/:category',
        component: ExercisePage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router