<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <div class="container">
        <b-navbar-brand>
          <router-link to="/">
            <img class="logo" src="@/assets/logo.svg">
            <span class="title">Car Fleet Management</span>
          </router-link>
        </b-navbar-brand>
       

        <b-dropdown variant="link" right text="Right align" no-caret>
          <template #button-content>
            <img class="user-pic" src="@/assets/user-circle.svg">
          </template>
          <b-dropdown-item>{{ name }}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#" @click="logout">Logout</b-dropdown-item>
        </b-dropdown>

      </div>
   </b-navbar>
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
  margin-right: 1rem;
}
.navbar {
  height: 50px;
}
.title {
  color: white;
  font-size: 1rem;
}
.user-pic {
  width: 24px;
}
</style>