<template>
  <div class="col-lg-6 align-self-center">
    <div class="card card-blue rnd-lg">
      <div class="card-header">Login</div>
      <div class="card-body">
        <div
          class="alert alert-danger"
          v-if="store.Session.state.error"
        >{{store.Session.state.error}}</div>
        <form @submit.prevent="login" method="POST">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              class="form-control"
              v-model="user.username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              class="form-control"
              v-model="user.password"
            />
          </div>
          <div class="form-group row">
            <div class="col-md-6">
              <button
                type="button"
                class="btn btn-primary w-100"
                @click="$router.push({ name: 'register' });"
              >Register</button>
            </div>
            <div class="col-md-6">
              <button class="btn btn-success w-100">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      store: store,
      user: {
        username: "",
        password: ""
      }
    };
  },
  components: {},
  methods: {
    async login() {
      try {
        await store.Session.dispatch("login", this.user);
        this.$router.push({ name: "Home" });
      } catch (e) {}
    }
  }
};
</script>
