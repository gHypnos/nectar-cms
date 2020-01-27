<template>
  <div>
    <nectarHeader />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "../components/header/header";
export default {
  data() {
    return {};
  },
  components: {
    nectarHeader: Header
  },
  methods: {}
};
</script>
