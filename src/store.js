// Import the createStore function from Vuex to create a new store instance
import { createStore } from "vuex";

// Import the router instance to programmatically navigate to different routes
import router from "./router";

// Create and export the Vuex store
export default createStore({
  state: { // The state object holds the application's state
    // isLoggedIn is a boolean that indicates if the user is logged in or not
    // It's set to true if there is a token in localStorage, otherwise false
    isLoggedIn: !!localStorage.getItem('token')
  },
  mutations: { // Mutations are functions that directly modify the state   
    LOGIN(state) {  // This mutation sets isLoggedIn to true, indicating the user is logged in
      state.isLoggedIn = true;
    },    
    LOGOUT(state) { // This mutation sets isLoggedIn to false, indicating the user is logged out
      state.isLoggedIn = false;
    }
  },
  // Actions are functions that commit mutations
  // They can also contain asynchronous operations
  actions: {   
    login({ commit }) {  // The login action commits the LOGIN mutation
      commit('LOGIN');
    },    
    logout({ commit, dispatch }) { // The logout action commits the LOGOUT mutation and dispatches another action
      commit('LOGOUT');      
      dispatch('navigateToLogin'); // After logging out, navigate to the login page
    },    
    navigateToLogin() { // This action uses the router to navigate to the Login route
      router.push({ name: 'Login' });
    }
  }
});
