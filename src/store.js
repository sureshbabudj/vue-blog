import { createStore } from "vuex";

let user = null;
try {
  user = JSON.parse(sessionStorage.getItem("user"));
} catch (error) {
  console.log("some error in retrieving the session");
}

const state = {
  user,
  users: []
};

const mutations = {
  login: (state, user) => {
    state.user = user;
  },
  logout: (state) => {
    sessionStorage.removeItem("user");
    state.user = null;
  },
  setUsers: (state, users) => {
    state.users = users;
  }
};

const actions = {
  login: ({ commit }, user) => commit("login", user),
  logout: ({ commit }) => commit("logout"),
  fetchUsers: async ({ commit }) => {
    if (state.users.length) {
      return;
    }
    try {
      const res = await fetch("http://localhost:3434/users");
      const users = await res.json();
      commit("setUsers", users);
    } catch (error) {
      console.log(error);
    }
  }
};

export default createStore({
  state,
  mutations,
  actions
});
