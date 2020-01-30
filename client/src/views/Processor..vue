<template>
  <b-row>
    <b-col lg="7" />
    <b-col lg="5">
      <div
        class="alert alert-danger"
        v-if="$store.Session.state.error"
      >{{$store.Session.state.error}}</div>
      <b-card :header="$t('auth.register')" class="card-blue rnd-lg">
        <b-form @submit.prevent="sendRegister" method="POST" id="nectar-register">
          <b-form-group>
            <b-form-input size="md" placeholder="Username" v-model="register.username" />
          </b-form-group>
          <b-form-group>
            <b-form-input size="md" placeholder="E-Mail" v-model="register.mail" />
          </b-form-group>
          <b-form-group>
            <b-form-input
              size="md"
              placeholder="Password"
              type="password"
              v-model="register.password"
            />
          </b-form-group>
          <b-form-group>
            <b-form-input
              size="md"
              placeholder="Password confirmation"
              type="password"
              v-model="register.password_confirm"
            />
          </b-form-group>
          <b-form-group>
            <b-form-radio-group v-model="register.gender" :options="genders" />
          </b-form-group>
          <div class="form-group mb-0">
            <b-button type="submit" variant="success w-100">{{$t('auth.register')}}</b-button>
          </div>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      store: store,
      genders: [
        { text: this.$t("auth.male"), value: "M" },
        { text: this.$t("auth.female"), value: "F" }
      ],
      register: {
        username: "",
        mail: "",
        password: "",
        password_confirm: "",
        gender: "M"
      }
    };
  },
  components: {},
  methods: {
    async sendRegister() {
      try {
        this.$store.Session.commit("errors", "");
        if (!this.register.username) {
          this.$store.Session.commit(
            "errors",
            this.$t("auth.error.noUsername")
          );
        } else if (!this.register.mail) {
          this.$store.Session.commit("errors", this.$t("auth.error.noMail"));
        } else if (!this.register.mail.includes("@")) {
          this.$store.Session.commit("errors", this.$t("auth.error.noMail2"));
        } else if (!this.register.password) {
          this.$store.Session.commit("errors", this.$t("auth.error.noPw"));
        } else if (!this.register.password_confirm) {
          this.$store.Session.commit("errors", this.$t("auth.error.noPwC"));
        } else if (this.register.password_confirm !== this.register.password) {
          this.$store.Session.commit("errors", this.$t("auth.error.noPwC2"));
        } else {
          await store.Session.dispatch("register", this.register);
          this.$router.push({ name: "Home" });
        }
      } catch (e) {}
    }
  }
};
</script>
