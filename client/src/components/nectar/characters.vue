<template>
  <div class="characters" v-if="characters">
    <h3 :class="{'mb-0':(!$store.Session.getters.isLoggedIn)}">{{$t('auth.characters.title')}}</h3>
    <h6 v-if="!$store.Session.getters.isLoggedIn">{{$t('auth.characters.disclaimer')}}</h6>
    <div class="character_grid">
      <character v-for="(user,index) in characters" :key="index" :character="user" />
      <div
        class="character add"
        v-if="$router.currentRoute.name == 'Characters' && characters.length < $store.main.state.settings.max_accounts_per_user"
      >
        <div class="avatar h-100 d-flex justify-content-center" v-b-modal.modal-1>
          <div class="align-self-center">
            <i class="fas fa-plus" />
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-1"
      title="Create a new character"
      hide-footer
      v-if="$router.currentRoute.name == 'Characters'"
    >
      <div
        class="alert alert-danger"
        v-if="$store.Session.state.error"
      >{{$t('auth.error.'+$store.Session.state.error)}}</div>
      <b-form @submit.prevent="newCharacter">
        <b-form-group>
          <label>{{$t('auth.username')}}</label>
          <b-input v-model="characterData.username"></b-input>
        </b-form-group>
        <b-form-group>
          <label>{{$t('auth.gender')}}</label>
          <b-form-radio-group v-model="characterData.gender" :options="genders" />
        </b-form-group>
        <b-form-group class="mb-0">
          <b-button type="submit" variant="success w-100 mb-1">{{$t('auth.register')}}</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import store from "../../store";
import router from "../../router";
import moment from "moment";
import character from "../templates/character";

export default {
  data() {
    return {
      characters: JSON.parse(localStorage.getItem("characters")),
      characterData: {
        username: "",
        gender: "M"
      },
      genders: [
        { text: this.$t("auth.male"), value: "M" },
        { text: this.$t("auth.female"), value: "F" }
      ]
    };
  },
  components: { character },
  methods: {
    async newCharacter() {
      this.$store.Session.commit("errors", "");
      await store.Session.dispatch("create_character", this.characterData);
      await this.$router.push({ name: "Home" });
    }
  }
};
</script>
