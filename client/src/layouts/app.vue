<template>
  <div>
    <nectarHeader />
    <div class="container">
      <router-view />
    </div>
    <client v-if="$store.main.state.settings && $store.Session.state.user" />
  </div>
</template>

<script>
import Header from "../components/header/header";
import Client from "../components/client";
export default {
  data() {
    return {};
  },
  components: {
    nectarHeader: Header,
    client: Client
  },
  methods: {}
};
</script>
