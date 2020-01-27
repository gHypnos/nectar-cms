<template>
  <div class="container h-100">
    <div class="row d-flex h-100 justify-content-center">
      <div class="col-lg-6 align-self-center">
        <div class="card">
          <div class="card-header">Loginn</div>
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
              <div class="form-group">
                <button class="btn btn-primary w-100">Login</button>
              </div>
            </form>
          </div>
        </div>
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
        this.loading = true;
        this.submitted = true;
        await store.Session.dispatch("login", this.user);
        this.$router.push({ name: "home" });
      } catch (e) {}
    }
  }
};
</script>
