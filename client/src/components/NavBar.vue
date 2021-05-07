<template>
    <nav class="navbar navbar-expand-lg bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <img class="logo" src="@/assets/logo.svg">
        </router-link>
        <h6>Car Fleet Management</h6>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="user-pic" src="@/assets/user-circle.svg">
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#">{{ name }}</a>
                </li>
                <div class="dropdown-divider"></div>
                <li>
                  <a class="dropdown-item" href="#" @click="logout">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  computed: mapState(['name']),
  methods: {
    logout() {
      deleteCookie("auth");
      deleteCookie("name");
      this.$store.commit("setToken", null);
      this.$store.commit("setName", null);
      this.$router.push({ name: 'Login' });
    }
  }
}

function deleteCookie(name) {
   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
</script>

<style lang="scss" scoped>
.logo {
  width: 23px;
}
.navbar {
  height: 50px;
  color: white;
  .container {
    justify-content: flex-start;
    align-items: baseline;
  }
}
.user-pic {
  width: 24px;
  margin-right: 1em;
}
</style>