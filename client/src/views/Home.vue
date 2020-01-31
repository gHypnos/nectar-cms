<template>
  <b-row v-if="!store.main.getters.loaded">
    <b-col lg="8">
      <me />
      <news />
    </b-col>
    <b-col lg="4">
      <iframe
        v-bind:src="'https://discordapp.com/widget?id=' + $store.main.state.settings.discord_id + '&theme=dark'"
        width="100%"
        height="510"
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
      store: store
    };
  },
  components: {
    me: me,
    news: news
  }
};
</script>
