<template>
  <div class="row me-widget" v-if="user">
    <b-col lg="2" class="me-avatar partial d-flex justify-content-center">
      <div class="me-circle align-self-center">
        <img
          v-if="$store.main.state.settings"
          v-bind:src="$store.main.state.settings.habbo_imager  + user.look + '&direction=3&head_direction=3&action=wav'"
        />
      </div>
    </b-col>
    <b-col lg="6" class="me-details partial px-0">
      <div class="me-top">
        <p class="mb-0 font-weight-bold">{{$t('home.name')}}</p>
        <p class="mb-0">{{user.username}}</p>
      </div>
      <div class="me-bottom">
        <div class="me-section">
          <p class="mb-0 font-weight-bold">{{$t('home.motto')}}</p>
          <p v-bind:class="{'mb-0':motto}">{{user.motto}}</p>
        </div>
        <div class="me-section">
          <p class="mb-0 font-weight-bold">{{$t('home.lastsign')}}</p>
          <p class="mb-0">{{user.last_login | formatDate}}</p>
        </div>
      </div>
    </b-col>
    <b-col lg="4" class="me-enter-hotel partial d-flex justify-content-center">
      <div class="align-self-center">
        <router-link class="btn btn-warning mx-auto w-100" :to="{name:'Hotel'}">
          Enter Hotel
          <i class="fas fa-hotel ml-2" />
        </router-link>
      </div>
    </b-col>
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
