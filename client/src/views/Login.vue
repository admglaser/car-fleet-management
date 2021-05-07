<template>
<div class="container-fluid">
  <div class="row">
    <div class="col bg-primary">
      <img class="logo" src="@/assets/logo.svg">
      <h3 class="title">Car Fleet Management</h3>
    </div>
    <div class="col">
      <h4>Welcome!</h4>
      <div class="login">
        <a class="btn btn-primary" href="/auth/facebook">Login with Facebook</a>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<style lang="scss" scoped>
.container-fluid, .row, .col {
  height: 100% !important;
}
.logo {
  width: 159px;
}
.title {
  color: white;
  width: 40%;
  text-align: center;
  margin-top: 1rem;
}
.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login {
  margin-top: 1rem;
}
</style>
