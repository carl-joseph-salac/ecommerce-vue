import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

// Define the routes
const routes = [
  {
    path: '/login', // The URL path for the login page
    component: Login, // The component to render for this route
    meta: {public: true} // Mark this route as public, meaning no authentication is required
  },
  {
    path: '/register', // The URL path for the register page
    component: Register, // The component to render for this route
    meta: {public: true} // Mark this route as public, meaning no authentication is required
  }
];

// Create a new router instance
const router = createRouter({
  history: createWebHistory(), // Use the HTML5 history mode for routing
  routes // Pass in the defined routes
});

// Add a global navigation guard to check authentication status before each route change
router.beforeEach((to, from, next) => {
  // Check if the user is authenticated by looking for a token in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  // If the route is not public and the user is not authenticated,
  if (!to.meta.public && !isAuthenticated) {
    next({name: 'Login'}); // redirect to the login page
  } else { // Otherwise, allow the navigation to proceed    
    next();
  }
});

// Export the router instance to be used in Vue application
export default router;
