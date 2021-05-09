<template>
    <b-navbar toggleable="lg" variant="primary">
      <div class="container">
        <div>
          <router-link to="/">
            <img class="logo" src="@/assets/logo.svg">
          </router-link>
          <span class="title">Car Fleet Management</span>
        </div>

        <b-dropdown variant="link" right text="Right align" no-caret>
          <template #button-content>
            <img class="user-pic" src="@/assets/user-circle.svg">
          </template>
          <b-dropdown-item ref="name">{{ name }}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item ref="logout" @click="logout">Logout</b-dropdown-item>
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
      deleteCookie("userId");
      deleteCookie("name");
      deleteCookie("admin");
      this.$store.commit("setToken", null);
      this.$store.commit("setUserId", null);
      this.$store.commit("setName", null);
      this.$store.commit("setAdmin", false);
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