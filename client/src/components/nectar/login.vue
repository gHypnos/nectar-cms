<template>
  <b-nav-form @submit.prevent="login" method="POST" class="login-form">
    <b-form-input
      class="mr-sm-2"
      v-model="user.mail"
      :state="($store.Session.state.login_error === 'no_account' || $store.Session.state.login_error === 'no_character' ? false : null)"
      type="email"
      :placeholder="$t('auth.email')"
    />
    <b-form-input
      type="password"
      class="mr-sm-2"
      v-model="user.password"
      :placeholder="$t('auth.password')"
      :state="($store.Session.state.login_error === 'no_account' || $store.Session.state.login_error === 'no_password' ? false : null)"
    />
    <div class="form-group">
      <b-button type="submit" variant="success w-100 ml-3">{{$t('auth.login')}}</b-button>
    </div>
  </b-nav-form>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      store: store,
      user: {
        mail: "",
        password: ""
      },
      error: null
    };
  },
  components: {},
  methods: {
    async login() {
      if (!this.user.mail) {
        this.error = false;
      } else if (!this.user.mail.includes("@")) {
        this.error = false;
      } else if (!this.user.password) {
        this.error = false;
      } else {
        try {
          this.error = null;
          await store.Session.dispatch("login", this.user);
          this.$router.push({ name: "Home" });
        } catch (e) {}
      }
    }
  }
};
</script>
