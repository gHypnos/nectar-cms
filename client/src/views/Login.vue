<template>
  <b-col lg="6" class="align-self-center">
    <b-card :header="$t('auth.login')" class="card-blue rnd-lg">
      <div class="alert alert-danger" v-if="store.Session.state.error">{{store.Session.state.error}}</div>
      <b-form @submit.prevent="login" method="POST">
        <div class="form-group">
          <label for="username">{{$t('auth.username')}}</label>
          <input
            id="username"
            name="username"
            type="text"
            class="form-control"
            v-model="user.username"
          />
        </div>
        <div class="form-group">
          <label for="password">{{$t('auth.password')}}"</label>
          <input
            id="password"
            name="password"
            type="password"
            class="form-control"
            v-model="user.password"
          />
        </div>
        <b-row class="mb-0">
          <b-col lg="6">
            <b-button
              type="button"
              variant="primary w-100"
              @click="$router.push({ name: 'register' });"
            >{{$t('auth.register')}}</b-button>
          </b-col>
          <b-col lg="6">
            <b-button type="submit" variant="success w-100">{{$t('auth.login')}}</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </b-col>
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
