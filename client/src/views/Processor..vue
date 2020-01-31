<template>
  <b-row>
    <b-col lg="7">
      <characters />
      <news />
    </b-col>
    <b-col lg="5" class="h-100 d-flex flex-column justify-content-center">
      <div
        class="alert alert-danger"
        v-if="$store.Session.state.error"
      >{{$t('auth.error.'+$store.Session.state.error)}}</div>
      <b-card :header="$t('auth.register')" class="card-blue w-100 rnd-lg align-self-center">
        <b-form @submit.prevent="sendRegister" method="POST" id="nectar-register">
          <div v-if="step === 1">
            <b-form-group>
              <label>{{$t('auth.email')}}</label>
              <b-form-input
                size="md"
                :placeholder="$t('auth.mail')"
                type="email"
                v-model="register.mail"
              />
            </b-form-group>
            <b-form-group>
              <label>{{$t('auth.password')}}</label>
              <b-form-input
                size="md"
                :placeholder="$t('auth.password')"
                type="password"
                v-model="register.password"
              />
            </b-form-group>
            <b-form-group>
              <label>{{$t('auth.passwordC')}}</label>
              <b-form-input
                size="md"
                :placeholder="$t('auth.passwordC')"
                type="password"
                v-model="register.password_confirm"
              />
            </b-form-group>
          </div>
          <div v-if="step === 2">
            <b-form-group>
              <label>{{$t('auth.username')}}</label>
              <b-form-input size="md" placeholder="Username" v-model="register.username" />
            </b-form-group>
            <b-form-group>
              <label>{{$t('auth.gender')}}</label>
              <b-form-radio-group v-model="register.gender" :options="genders" />
            </b-form-group>
          </div>
          <div class="form-group mb-0">
            <b-button
              v-if="step===1"
              type="button"
              variant="primary w-100 mb-1"
              @click="step = 2"
            >{{$t('auth.continue')}}</b-button>
            <b-button
              v-if="step===2"
              type="submit"
              variant="success w-100 mb-1"
            >{{$t('auth.register')}}</b-button>
            <b-button
              v-if="step === 2"
              type="button"
              variant="danger w-100"
              @click="(step = 1)"
            >{{$t('auth.back')}}</b-button>
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
        } else if (this.step === 2) {
          if (!this.register.username) {
            this.$store.Session.commit("errors", "noUsername");
          } else {
            await store.Session.dispatch("register", this.register);
            await store.Session.dispatch("register_character", this.register);
            this.$router.push({ name: "Home" });
          }
        } else {
          this.step = 2;
        }
      } catch (e) {}
    }
  }
};
</script>
