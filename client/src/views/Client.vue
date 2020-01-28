<template>
  <div />
</template>

<script>
import store from "../store";
export default {
  async mounted() {
    await this.load();
  },
  methods: {
    async load() {
      try {
        await store.main.commit("setClient", true);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
};
</script>
