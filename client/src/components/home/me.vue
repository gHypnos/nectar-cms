<template>
  <div class="row me-widget">
    <div class="col-sm-2 me-avatar partial"></div>
    <div class="col-sm-6 me-details partial"></div>
    <div class="col-sm-4 me-enter-hotel partial">
      <div class="p-5">
        <router-link class="btn btn-warning mx-auto w-100" to="/client">
          Enter Hotel
          <i class="fas fa-hotel ml-2" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>
