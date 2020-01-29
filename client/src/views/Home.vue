<template>
  <b-row v-if="!store.main.getters.loaded">
    <b-col lg="8">
      <me :user="user" />
      <news v-if="news" :articles="news" />
    </b-col>
    <b-col lg="4">
      <iframe
        v-bind:src="'https://discordapp.com/widget?id=' + $store.main.state.settings.discord_id + '&theme=dark'"
        width="100%"
        height="500"
        allowtransparency="true"
        frameborder="0"
      ></iframe>
    </b-col>
  </b-row>
</template>

<script>
import me from "../components/home/me";
import news from "../components/nectar/news";
import store from "../store";
export default {
  data() {
    return {
      store: store,
      data: null,
      user: null,
      news: null
    };
  },
  components: {
    me: me,
    news: news
  },
  mounted: async function() {
    try {
      let data = await this.$http.get("/page/home");
      this.user = data.data[0];
      this.news = data.data[1];
      store.Session.commit("setUser", this.user);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
</script>
