<template>
  <header class="nectar-header">
    <div class="container">
      <img src="/assets/images/logo.gif" class="mb-2" />
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
