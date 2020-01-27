<template>
  <div class="row" v-if="!store.main.getters.loaded">
    <div class="col-md-10 row">
      <div class="col-md-12">
        <me />
      </div>
      <div class="col-lg-6">
        <div class="card card-blue">
          <div class="card-header">Home</div>
          <div class="card-body">
            <router-link to="/logout" class="btn btn-danger">Logout</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import me from "../components/home/me";
import store from "../store";
export default {
  data() {
    return {
      store: store,
      data: null
    };
  },
  components: {
    me: me
  },
  mounted: async function() {
    try {
      await this.$http.get("/page/home");
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
</script>
