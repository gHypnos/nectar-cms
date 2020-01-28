<template>
  <div id="app" class="h-100" v-bind:class="{'client':($store.main.state.client)}">
    <loading v-if="$store.main.state.loading" />
    <component v-bind:is="layout"></component>
  </div>
</template>

<script>
import Processor from "./layouts/processor";
import App from "./layouts/app";
import store from "./store";
import Loading from "./components/loading";

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
  methods: {},
  computed: {
    layout() {
      return store.main.getters.layout;
    }
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  }
};
</script>
