<template>
  <div
    id="app"
    class="h-100"
    v-bind:class="{'client':($store.main.state.client)}"
    v-if="$store.main.state.settings"
  >
    <loading v-if="$store.main.state.loading" />
    <component v-bind:is="layout"></component>
  </div>
</template>

<script>
import Processor from "./layouts/processor";
import App from "./layouts/app";
import store from "./store";
import Loading from "./components/loading";
import router from "./router";
import API from "./api";

export default {
  data() {
    return {};
  },
  components: {
    loading: Loading,
    processor: Processor,
    app: App
    // define as many layouts you want for the application
  },
  computed: {
    layout() {
      return store.main.getters.layout;
    }
  },
  mounted: async function() {
    if (store.Session.getters.isLoggedIn) {
      try {
        await store.main.dispatch("loadSettings");
        let data = await this.$http.get("/session/characters/get");
        if (data.data.character) {
          store.Session.commit("setUser", data.data.character);
        }
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
};
</script>
