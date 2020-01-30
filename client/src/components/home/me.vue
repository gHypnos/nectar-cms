<template>
  <b-row class="me-widget" v-if="user">
    <b-col lg="2" class="me-avatar partial d-flex justify-content-center">
      <div class="align-self-center" v-if="$store.main.state.settings">
        <img
          v-if="user.motto == 'archie' || user.motto == 'Archie'"
          src="/assets/images/archie.png"
        />
        <img
          v-else
          @mouseover="onWave"
          @mouseleave="offWave"
          v-bind:src="$store.main.state.settings.habbo_imager  + user.look + '&direction=3&head_direction=3' + wave"
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
    <b-col lg="12" class="p-0 m-0 row">
      <div class="currency credits col">
        <span>{{user.credits}}</span>
      </div>
      <div class="currency duckets col">
        <span>{{user.currency[0].amount}}</span>
      </div>
      <div class="currency diamonds col">
        <span>{{user.currency[1].amount}}</span>
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
      wave: "",
      interval: null
    };
  },
  components: {},
  methods: {
    onWave: function() {
      this.interval = setInterval(() => {
        if (this.wave === "&action=wav&frame=1") {
          this.wave = "&action=wav&frame=2";
        } else {
          this.wave = "&action=wav&frame=1";
        }
      }, 220);
    },
    offWave() {
      clearInterval(this.interval);
      this.wave = "";
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
      this.user = data.data;
      this.$store.Session.commit("setUser", data.data);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
</script>
