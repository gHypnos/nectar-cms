<template>
  <b-container class="h-100">
    <b-row class="d-flex h-100 justify-content-center">
      <b-col lg="6" class="align-self-center">
        <b-card header="Logged out" class="card-blue rnd-lg">
          <p class="card-text">You have logged out.</p>
          <b-button variant="success w-100" @click="$router.push({name:'Login'})">Continue</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
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
