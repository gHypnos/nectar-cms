<template>
  <div class="row me-widget" v-if="user">
    <div class="col-lg-2 me-avatar partial d-flex justify-content-center">
      <div class="me-circle align-self-center">
        <img
          v-if="$store.main.state.settings"
          v-bind:src="$store.main.state.settings.habbo_imager  + user.look + '&direction=3&head_direction=3&action=wav'"
        />
      </div>
    </div>
    <div class="col-lg-6 me-details partial px-0">
      <div class="me-top">
        <p class="card-text mb-0 font-weight-bold">Name:</p>
        <p class="mb-0">{{user.username}}</p>
      </div>
      <div class="me-bottom">
        <div class="me-section">
          <p class="card-text mb-0 font-weight-bold">Motto:</p>
          <p v-bind:class="{'mb-0':motto}">{{user.motto}}</p>
        </div>
        <div class="me-section">
          <p class="card-text mb-0 font-weight-bold">Last signed in:</p>
          <p class="mb-0">{{user.last_login | formatDate}}</p>
        </div>
      </div>
    </div>
    <div class="col-lg-4 me-enter-hotel partial">
      <div class="p-5">
        <router-link class="btn btn-warning mx-auto w-100" :to="{name:'Hotel'}">
          Enter Hotel
          <i class="fas fa-hotel ml-2" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
  computed: {
    motto() {
      if (this.user.motto) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
