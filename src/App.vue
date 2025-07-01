<template>
      <Dashboard/>
</template>

<script>
import SimpleDashboard from '@/views/SimpleDashBoard.vue'
import Dashboard from '@/views/Dashboard.vue'

export default {
  name: 'App',
  components: {
    Dashboard,
    SimpleDashboard
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
