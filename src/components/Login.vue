<!-- This section contains the HTML structure of your component. -->
<template>
  <div>
    <form @submit.prevent="login">
      <!-- v-model is used to bind the input values to the corresponding data properties (email and password) -->
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  import axios from '@/axios'; // imports the Axios library, which is used for making HTTP requests.

  // This default export can be imported without explicitly specifying its name during the import statement.
  export default { 
    data() { // defines the initial data properties (email and password) for the component.
      return {
        email: "",
        password: "",
      };
    },

    methods: { // contains the login() method, which handles form submission
      async login() {
        try { // it sends a POST request to the /login endpoint with the email and password
          const response = await axios.post('/login', {
            email: this.email,
            password: this.password
          });

          if (response.data.token) { // stores a token in local storage 
            localStorage.setItem('token', response.data.token);
          }
          this.$store.commit('LOGIN'); // commits a Vuex mutation (LOGIN)
          this.$router.push('/'); // redirects the user to the home page (/)
        } 
        catch(error) {
          console.error('An error occured');
        }
      } 
    }
  }
</script>