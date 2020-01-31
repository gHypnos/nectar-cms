<template>
  <b-row class="me-widget" v-if="user">
    <b-col lg="2" class="me-avatar partial d-flex justify-content-center">
      <div class="align-self-center" v-if="$store.main.state.settings">
        <img
          v-if="user.motto == 'archie' || user.motto == 'Archie'"
          src="/assets/images/archie.png"
        />
        <img
          @mouseover="start"
          @mouseleave="destroy"
          v-else
          v-bind:src="$store.main.state.settings.habbo_imager  + user.look + direction"
        />
      </div>
    </b-col>
    <b-col lg="6" class="me-details partial px-0">
      <div class="me-top">
        <p class="mb-0 font-weight-bold">{{$t('home.name')}}</p>
        <p class="mb-0">{{user.username}}</p>
      </div>
      <div class="me-bottom">
        <div class="me-section">
          <p class="mb-0 font-weight-bold">{{$t('home.motto')}}</p>
          <p v-bind:class="{'mb-0':motto}">{{user.motto}}</p>
        </div>
        <div class="me-section">
          <p class="mb-0 font-weight-bold">{{$t('home.lastSign')}}</p>
          <p class="mb-0">{{user.last_login | formatDate}}</p>
        </div>
      </div>
    </b-col>
    <b-col lg="4" class="me-enter-hotel partial d-flex justify-content-center">
      <div class="align-self-center">
        <b-button variant="success" class="w-100" :to="{name:'Hotel'}">
          {{$t('home.enterHotel')}}
          <i class="fas fa-hotel ml-2" />
        </b-button>
      </div>
    </b-col>
    <b-col lg="12" class="p-0 m-0 row" v-if="currencies">
      <div class="currency credits col">
        <span>{{user.credits}}</span>
      </div>
      <div class="currency duckets col">
        <span>{{currencies[0].amount}}</span>
      </div>
      <div class="currency diamonds col">
        <span>{{currencies[1].amount}}</span>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      user: null,
      currencies: null,
      direction: "&direction=3&head_direction=3&gesture=sml&action=wav",
      interval: null
    };
  },
  components: {},
  methods: {
    start() {
      this.destroy();
      this.interval = setInterval(() => this.tick(), 200);
    },
    tick() {
      if (this.direction === "&direction=3&head_direction=3") {
        this.direction = "&direction=4&head_direction=4";
      } else if (this.direction === "&direction=4&head_direction=4") {
        this.direction = "&direction=5&head_direction=5";
      } else if (this.direction === "&direction=5&head_direction=5") {
        this.direction = "&direction=6&head_direction=6";
      } else if (this.direction === "&direction=6&head_direction=6") {
        this.direction = "&direction=7&head_direction=7";
      } else if (this.direction === "&direction=7&head_direction=7") {
        this.direction = "&direction=0&head_direction=0";
      } else if (this.direction === "&direction=0&head_direction=0") {
        this.direction = "&direction=1&head_direction=1";
      } else if (this.direction === "&direction=1&head_direction=1") {
        this.direction = "&direction=2&head_direction=2";
      } else if (this.direction === "&direction=2&head_direction=2") {
        this.direction = "&direction=3&head_direction=3";
      } else {
        this.direction = "&direction=3&head_direction=3";
      }
    },
    destroy() {
      clearInterval(this.interval);
      this.direction = "&direction=3&head_direction=3&gesture=sml&action=wav";
    }
  },
  computed: {
    motto() {
      if (this.user.motto) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted: async function() {
    try {
      let data = await this.$http.get("/components/me");
      this.user = data.data[0];
      this.currencies = data.data[1];
      this.$store.Session.commit("setUser", data.data[0]);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  beforeDestroy() {
    this.destroy();
  }
};
</script>
