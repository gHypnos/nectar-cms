<template>
  <header class="nectar-header">
    <div class="container wrapper d-flex justify-content-between">
      <div class="align-self-center nectar-logo">
        <img src="/assets/images/logo.gif" />
      </div>
      <div class="align-self-center float-right">
        <b-dropdown size="sm" variant="secondary dark-green">
          <template v-slot:button-content>
            {{$store.Session.state.user.username}}
            <div
              class="dd-circle"
              v-if="$store.main.state.settings"
              v-bind:style="'background-image:url(' + $store.main.state.settings.habbo_imager  + $store.Session.state.user.look + '&direction=3&head_direction=4&headonly=1);'"
            />
          </template>
          <b-dropdown-item :to="{name:'Logout'}">
            <i class="fas fa-sign-out-alt"></i>
            {{$t('auth.logout')}}
          </b-dropdown-item>
        </b-dropdown>
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
