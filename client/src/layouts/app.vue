<template>
  <div>
    <nectarHeader />
    <div class="container">
      <div class="row">
        <router-view />
      </div>
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
