<template>
  <header class="nectar-header">
    <div class="container wrapper d-flex justify-content-between">
      <img src="/assets/images/logo.gif" />
      <div class="dropdown float-right align-self-center">
        <button
          class="btn btn-secondary dropdown-toggle dark-green"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          v-if="$store.Session.state.user"
        >
          {{$store.Session.state.user.username}}
          <div
            class="dd-circle"
            v-if="$store.main.state.settings"
            v-bind:style="'background-image:url(' + $store.main.state.settings.habbo_imager  + $store.Session.state.user.look + '&direction=3&head_direction=4&headonly=1);'"
          />
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <router-link :to="{name:'Logout'}" class="dropdown-item">Logout</router-link>
        </div>
      </div>
    </div>
    <nectarBar />
  </header>
</template>

<script>
import Navbar from "./navbar";
export default {
  data() {
    return {};
  },
  components: {
    nectarBar: Navbar
  },
  methods: {}
};
</script>
