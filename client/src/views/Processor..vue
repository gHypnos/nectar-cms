<template>
  <b-row>
    <b-col lg="7">
      <news />
      <characters />
    </b-col>
    <b-col lg="5" class="h-100 d-flex flex-column justify-content-center">
      <div
        class="alert alert-danger"
        v-if="$store.Session.state.error"
      >{{$t('auth.error.'+$store.Session.state.error)}}</div>
      <div class="alert alert-danger" v-if="$store.Session.state.banned">
        <p>{{$t('auth.banned.until')}} {{$store.Session.state.banned.ban_expire | formatDate}}</p>
        <p>{{$t('auth.banned.reason')}} {{$store.Session.state.banned.ban_reason}}</p>
      </div>
      <b-card :header="$t('auth.register')" class="card-blue w-100 rnd-lg align-self-center">
        <b-form @submit.prevent="sendRegister" method="POST" id="nectar-register">
          <h5>{{$t('auth.account_creation')}}</h5>
          <div class="form-dark-bg">
            <b-form-group>
              <label>{{$t('auth.email')}}</label>
              <b-form-input
                size="sm"
                :placeholder="$t('auth.email')"
                type="email"
                v-model="register.mail"
              />
              <small class="form-text">{{$t('auth.email_help')}}</small>
            </b-form-group>
            <b-form-group>
              <label>{{$t('auth.password')}}</label>
              <b-form-input
                size="sm"
                :placeholder="$t('auth.password')"
                type="password"
                v-model="register.password"
              />
              <small class="form-text">{{$t('auth.password_help')}}</small>
            </b-form-group>
            <b-form-group>
              <label>{{$t('auth.passwordC')}}</label>
              <b-form-input
                size="sm"
                :placeholder="$t('auth.passwordC')"
                type="password"
                v-model="register.password_confirm"
              />
            </b-form-group>
          </div>
          <h5>{{$t('auth.character_creation')}}</h5>
          <div class="form-dark-bg">
            <b-form-group>
              <label>{{$t('auth.username')}}</label>
              <b-form-input size="sm" placeholder="Username" v-model="register.username" />
            </b-form-group>
            <b-form-group>
              <label>{{$t('auth.gender')}}</label>
              <b-form-radio-group v-model="register.gender" :options="genders" />
            </b-form-group>
            <small class="form-text">{{$t('auth.character_help')}}</small>
          </div>
          <div class="form-group mb-0">
            <b-button type="submit" variant="success w-100 mb-1">{{$t('auth.register')}}</b-button>
          </div>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import store from "../store";
import characters from "../components/nectar/characters";
import news from "../components/nectar/news";

export default {
  data() {
    return {
      genders: [
        { text: this.$t("auth.male"), value: "M" },
        { text: this.$t("auth.female"), value: "F" }
      ],
      register: {
        mail: "",
        password: "",
        password_confirm: "",
        username: "",
        gender: "M"
      },
      step: 1
    };
  },
  components: {
    characters,
    news
  },
  methods: {
    async sendRegister() {
      try {
        this.$store.Session.commit("errors", "");
        if (!this.register.mail) {
          this.$store.Session.commit("errors", "noMail");
        } else if (!this.register.mail.includes("@")) {
          this.$store.Session.commit("errors", "noMail2");
        } else if (!this.register.password) {
          this.$store.Session.commit("errors", "noPw");
        } else if (!this.register.password_confirm) {
          this.$store.Session.commit("errors", "noPwC");
        } else if (this.register.password_confirm !== this.register.password) {
          this.$store.Session.commit("errors", "noPwC2");
        } else if (!this.register.username) {
          this.$store.Session.commit("errors", "noUsername");
        } else {
          await store.Session.dispatch("register", this.register);
          await store.Session.dispatch("register_character", this.register);
          this.$router.push({ name: "Home" });
        }
      } catch (e) {}
    }
  }
};
</script>
