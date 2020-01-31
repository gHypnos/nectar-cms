<template>
  <b-nav-form @submit.prevent="login" method="POST" class="login-form">
    <b-form-input class="mr-sm-2" v-model="user.mail" type="email" :placeholder="$t('auth.email')" />
    <b-form-input
      type="password"
      class="mr-sm-2"
      v-model="user.password"
      :placeholder="$t('auth.password')"
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
      }
    };
  },
  components: {},
  methods: {
    async login() {
      if (!this.user.mail.includes("@")) {
        this.$store.Session.commit("errors", "noMail2");
      } else {
        try {
          await store.Session.dispatch("login", this.user);
          this.$router.push({ name: "Home" });
        } catch (e) {}
      }
    }
  }
};
</script>
