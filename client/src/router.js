import VueRouter from "vue-router";
import Login from "@/views/Login.vue";

function Router({ store }) {
  const routes = [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/",
      name: "Home",
      redirect: () => ({ name: store.state.admin ? "Cars" : "ClaimCar" }),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/cars",
      name: "Cars",
      component: () =>
        import(/* webpackChunkName: "cars" */ "@/views/Cars.vue"),
      meta: {
        requiresAdminAuth: true,
      },
    },
    {
      path: "/claim",
      name: "ClaimCar",
      component: () =>
        import(/* webpackChunkName: "claimCar" */ "@/views/ClaimCar.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ];

  const router = new VueRouter({
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAdminAuth)) {
      if (!store.state.admin) {
        next({ name: "Home" });
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.state.token) {
        next({ name: "Login" });
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.name === "Login")) {
      if (store.state.token) {
        next({ name: "Home" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
  return router;
}

export default Router;
