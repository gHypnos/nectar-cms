<template>
  <div class="container h-100">
    <div class="row d-flex h-100 justify-content-center">
      <div class="col-lg-6 align-self-center">
        <div class="card">
          <div class="card-header">Home</div>
          <div class="card-body">
            <p class="card-text">You have logged out.</p>
            <router-link to="/" class="btn btn-success w-100">Continue</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {};
  },
  mounted() {
    store.Session.dispatch("logout");
  },
  components: {},
  methods: {}
};
</script>
