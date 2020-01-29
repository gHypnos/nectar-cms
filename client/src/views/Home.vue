<template>
  <div class="row" v-if="!store.main.getters.loaded">
    <div class="col-md-9 row">
      <div class="col-md-12 me-parent">
        <me :user="user" />
      </div>
      <div class="row mx-0">
        <div class="col-lg-6">
          <div class="card card-blue">
            <div class="card-header">Home</div>
            <div class="card-body">
              {{user}}
              <router-link to="/logout" class="btn btn-danger">{{$t('auth.logout')}}</router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card card-blue">
            <div class="card-header">Home</div>
            <div class="card-body">
              {{user}}
              <router-link to="/logout" class="btn btn-danger">{{$t('auth.logout')}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-3" v-if="$store.main.state.settings">
      <iframe
        v-bind:src="'https://discordapp.com/widget?id=' + $store.main.state.settings.discord_id + '&theme=dark'"
        width="100%"
        height="500"
        allowtransparency="true"
        frameborder="0"
      ></iframe>
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
      data: null,
      user: null
    };
  },
  components: {
    me: me
  },
  mounted: async function() {
    try {
      let data = await this.$http.get("/page/home");
      this.user = data.data[0];
      store.Session.commit("setUser", this.user);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
</script>
