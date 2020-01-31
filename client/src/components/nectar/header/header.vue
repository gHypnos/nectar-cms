<template>
  <header>
    <div class="nectar-header">
      <div class="container wrapper d-flex justify-content-between">
        <div class="align-self-center nectar-logo">
          <img src="/assets/images/logo.gif" />
        </div>
        <div class="align-self-center float-right" v-if="$store.Session.state.character">
          <b-dropdown size="sm" variant="secondary dark-green">
            <template v-slot:button-content>
              <span>{{$store.Session.state.character.username}}</span>
              <div
                class="dd-circle"
                v-if="$store.main.state.settings"
                v-bind:style="'background-image:url(' + $store.main.state.settings.habbo_imager  + $store.Session.state.character.look + '&direction=3&head_direction=4&headonly=1);'"
              />
            </template>
            <b-dropdown-item :to="{name:'Settings'}">
              <i class="fas fa-cogs"></i>
              {{$t('auth.settings')}}
            </b-dropdown-item>
            <b-dropdown-item :to="{name:'Logout'}">
              <i class="fas fa-sign-out-alt"></i>
              {{$t('auth.logout')}}
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
    <nectarBar :routes="actualize" variant="light" />
    <nectarBar :routes="routeChildren" variant="dark" />
  </header>
</template>

<script>
import Navbar from "./navbar";
export default {
  components: {
    nectarBar: Navbar
  },
  data() {
    return {
      children: this.$router.currentRoute,
      routes: [
        {
          path: "/home",
          name: "Home",
          icon: "fas fa-home",
          visible: true
        },
        {
          path: "/settings",
          name: "Settings",
          icon: "fas fa-home",
          visible: false,
          children: [
            {
              path: "/settings/characters",
              name: "Characters"
            }
          ]
        },
        {
          path: "/community",
          name: "Community",
          icon: "fas fa-hotel",
          visible: true,
          children: [
            {
              path: "/community/photos",
              name: "Photos"
            }
          ]
        }
      ]
    };
  },
  computed: {
    routeChildren() {
      const matched = this.$route.matched;
      const routePath = matched[matched.length - 1].path;
      console.log(routePath);
      return this.getChildrenByPath(routePath);
    },
    actualize() {
      let data = [];
      for (let i = 0; i < this.routes.length; i++) {
        if (this.routes[i].visible) {
          data.push(this.routes[i]);
        }
      }
      return data;
    }
  },
  methods: {
    getChildrenByPath(path) {
      let children = this.routes;

      if (path) {
        // clean up empty elements
        let chunks = path.split("/");
        chunks = chunks.filter(chunk => chunk !== "");

        if (chunks.length) {
          chunks.forEach((chunk, index) => {
            let path = chunk;
            if (index === 0) path = `/${path}`;

            if (children) {
              const found = children.find(child => child.path === path);
              console.log(found);
              if (found) {
                children = found.children;
              }
            }
          });
        }
      }

      return children;
    }
  }
};
</script>
