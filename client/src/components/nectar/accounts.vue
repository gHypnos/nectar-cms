<template>
  <div class="accounts" v-if="users"></div>
</template>

<script>
export default {
  data() {
    return {
      users: localStorage.getItem("accounts")
    };
  },
  components: {},
  methods: {},
  mounted: async function() {
    try {
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
</script>
