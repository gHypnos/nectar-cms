<template>
  <div class="nectar-client" v-if="$store.main.state.settings && $store.Session.state.user">
    <div class="client-buttons">
      <button class="btn btn-warning" @click.prevent="back">
        <i class="fas fa-arrow-circle-left" />
      </button>
    </div>
    <div v-if="!client.flashEnabled" class="flash-check-container">
      <div class="jumbotron flex d-block">
        <h2>Flash Player</h2>
        <p>You need to enable flash player before playing {{ $store.main.state.settings.hotel_name }}!</p>
        <div style="height:10px" />
        <a class="flash-link" href="https://get.adobe.com/flashplayer/">Enable Flash</a>
      </div>
    </div>
    <div
      class="client-container"
      :class="{'client-loaded': client.loading.done}"
      v-if="client.flashEnabled"
    >
      <div
        class="h-100 w-100 nectar-loading d-flex justify-content-center"
        v-if="client.loading.status"
      >
        <div class="align-self-center text-center">
          <img src="/assets/images/logo.gif" class="mb-2" />
          <p class="mb-2">{{client.loading.message}}</p>
          <div class="loading-bar mb-1">
            <div class="loading-inner" v-bind:style="'width:'+client.loading.percentage+'%;'"></div>
          </div>
          <h3>{{client.loading.percentage}}%</h3>
        </div>
      </div>
      <div id="client-area" />
    </div>
  </div>
</template>

<script>
import SWF from "swfobject";
import store from "../store";
import API from "../api";
import router from "../router";

export default {
  data() {
    return {
      client: {
        flashEnabled: false,
        currentRoomId: 0,
        sso: null,
        loading: {
          status: false,
          percentage: 0,
          message: "Please wait..",
          done: false
        }
      }
    };
  },
  async mounted() {
    await this.load();
  },
  methods: {
    async back() {
      if (window.history.length) {
        await this.$router.go(-1);
      } else {
        await router.push({ name: home });
      }
      await store.main.commit("setClient", false);
    },
    async load() {
      try {
        await this.hasFlash();
        this.client.loading.status = true;
        this.client.loading.done = false;
        await this.loadSSO();
        await this.loadClient();
        await this.loadInterface();
      } catch (e) {}
    },
    async loadSSO() {
      try {
        let sso = await API.get("/authentication/client");
        this.client.sso = sso.data;
        return Promise.resolve("valid_sso");
      } catch (e) {
        return Promise.reject(Error("invalid_sso"));
      }
    },
    async reload() {
      await this.load();
    },
    async hasFlash() {
      if (SWF.hasFlashPlayerVersion("10")) {
        this.client.flashEnabled = true;
        return Promise.resolve("flash_enabled");
      } else {
        this.client.flashEnabled = false;
        return Promise.reject(Error("flash_disabled"));
      }
    },
    async loadClient() {
      let variables = {
        "connection.info.host": store.main.state.settings.server_ip,
        "connection.info.port": store.main.state.settings.server_port,
        "url.prefix": store.main.state.settings.site_link,
        "site.url": store.main.state.settings.site_link,
        "client.reload.url": `${store.main.state.settings.site_link}/hotel`,
        "client.fatal.error.url": `${store.main.state.settings.site_link}/hotel`,
        "client.connection.failed.url": `${store.main.state.settings.site_link}/hotel`,
        "external.variables.txt": store.main.state.settings.swf_variables,
        "external.override.variables.txt":
          store.main.state.settings.swf_override_variables,
        "external.texts.txt": store.main.state.settings.swf_texts,
        "external.override.texts.txt":
          store.main.state.settings.swf_override_texts,
        "productdata.load.url": store.main.state.settings.swf_productdata,
        "furnidata.load.url": store.main.state.settings.swf_furnidata,
        "external.figurepartlist.txt": store.main.state.settings.swf_figuredata,
        "flash.client.url": store.main.state.settings.swf_base,
        "client.starting.revolving": `${store.main.state.settings.hotel_name}`,
        "processlog.enabled": "1",
        "use.sso.ticket": "1",
        "sso.ticket": this.client.sso,
        "flash.client.origin": "popup",
        "client.allow.cross.domain": "1",
        "client.notify.cross.domain": "0"
      };

      let paramaters = {
        base: `${store.main.state.settings.swf_base}`,
        allowScriptAccess: "always",
        menu: "false"
      };

      SWF.embedSWF(
        `${store.main.state.settings.swf}`,
        "client-area",
        "100%",
        "100%",
        "10.0.0",
        "",
        variables,
        paramaters,
        null
      );
      return Promise.resolve();
    },
    async loadInterface() {
      window.FlashExternalInterface = {};

      window.FlashExternalInterface.disconnect = () => {
        console.log("disconnect");
      };

      window.FlashExternalInterface.track = (action, label, value) => {
        console.log(action + label + value);
      };

      window.FlashExternalInterface.legacyTrack = (action, label, value) => {
        if (action === "navigator" && label === "private") {
          this.client.currentRoomId = label;
        }
        console.log(action + label + value);
      };

      window.FlashExternalInterface.logLoginStep = step => {
        if (step === "client.init.start") {
          this.client.loading.message = "Flash Loading";
          this.client.loading.percentage = 10;
        }

        if (step === "client.init.swf.loaded") {
          this.client.loading.message = "Initializing";
          this.client.loading.percentage = 15;
        }

        if (step === "client.init.core.init") {
          this.client.loading.message = "Connecting";
          this.client.loading.percentage = 20;
        }

        if (step === "client.init.socket.ok") {
          this.client.loading.percentage = 35;
        }

        if (step === "client.init.handshake.start") {
          this.client.loading.message = "Connected";
          this.client.loading.percentage = 40;
        }

        if (step === "client.init.auth.ok") {
          this.client.loading.message = "Authenticating";
          this.client.loading.percentage = 50;
        }

        if (step === "client.init.localization.loaded") {
          this.client.loading.percentage = 60;
        }

        if (step === "client.init.core.running") {
          this.client.loading.message = "Almost Ready";
          this.client.loading.percentage = 76;
        }

        if (step === "client.init.config.loaded") {
          this.client.loading.percentage = 95;

          setTimeout(() => {
            this.client.loading.percentage = 100;
            this.client.loading.status = false;
            this.client.loading.done = true;
          }, 4500);
        }
      };

      return Promise.resolve();
    }
  }
};
</script>
