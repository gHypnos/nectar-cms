<template>
  <div class="d-flex flex-column h-100">
    <nectarHeader />
    <subHeader v-if="$store.main.state.subHeader" />
    <b-container class="container mb-1">
      <router-view />
    </b-container>
    <nectarFooter />
    <client v-if="$store.main.state.settings && $store.Session.state.character" />
  </div>
</template>

<script>
import Header from "../components/nectar/header/header";
import Footer from "../components/nectar/footer";
import Client from "../components/client";
import subHeader from "../components/nectar/subheader";
export default {
  data() {
    return {};
  },
  components: {
    nectarHeader: Header,
    nectarFooter: Footer,
    client: Client,
    subHeader
  },
  methods: {}
};
</script>
