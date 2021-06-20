import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/posts/:postId",
    name: "post",
    component: () => import(/* webpackChunkName: "post" */ "../views/Post.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "Signup" */ "../views/Signup/Signup.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login/Login.vue")
  },
  {
    path: "/newpost",
    name: "NewPost",
    component: () =>
      import(/* webpackChunkName: "NewPost" */ "../views/NewPost.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.state.user;

  if (to.name !== "Login" && to.name !== "Signup") {
    if (!isAuthenticated) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    if (!isAuthenticated) {
      next();
    }
  }
});

export default router;
