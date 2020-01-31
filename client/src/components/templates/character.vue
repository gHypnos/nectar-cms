<template>
  <div class="character" @click="login(character)">
    <div class="avatar">
      <img v-bind:src="$store.main.state.settings.habbo_imager  + character.look + direction" />
    </div>
    <div class="info">
      {{character.username}}
      <small
        class="d-block"
      >Last Login: {{moment(moment.unix(character.last_login).format()).fromNow()}}</small>
    </div>
    <div class="login justify-content-center">
      <div class="align-self-center">
        <b-btn variant="primary">{{$t('auth.login')}}</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import moment from "moment";
export default {
  props: {
    character: Object
  },
  data() {
    return {
      moment: moment,
      direction: "&direction=3&head_direction=3",
      interval: null,
      login_info: JSON.parse(localStorage.getItem("login_info"))
    };
  },
  methods: {
    async login(data) {
      try {
        if (!store.Session.getters.isLoggedIn) {
          await store.Session.dispatch("login", this.login_info);
          await store.Session.dispatch("switchCharacter", { id: data.id });
        } else {
          await store.Session.commit("setUser", "");
          await store.Session.dispatch("switchCharacter", { id: data.id });
        }
        await this.$router.push({ name: "Home" });
      } catch (e) {}
    }
  }
};
</script>
