<template>
  <div class="d-flex flex-column h-100">
    <nectarHeader />
    <b-container class="container mb-1">
      <router-view />
    </b-container>
    <nectarFooter />
    <client v-if="$store.main.state.settings" />
  </div>
</template>

<script>
import Header from "../components/nectar/header/header";
import Footer from "../components/nectar/footer";
import Client from "../components/client";
export default {
  data() {
    return {};
  },
  components: {
    nectarHeader: Header,
    nectarFooter: Footer,
    client: Client
  },
  methods: {}
};
</script>
