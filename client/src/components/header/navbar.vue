<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample07"
        aria-controls="navbarsExample07"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExample07">
        <ul class="navbar-nav mr-auto">
          <li
            class="nav-item"
            v-for="item in navi"
            :key="item.id"
            :class="{'active': router.currentParent === item.name || router.currentGrandParent === item.name}"
            @click="$router.push({ name: item.link, params: item.params })"
          >
            <i class="heroic-icon" :class="item.icon" />
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      router: {
        currentRoute: null,
        currentParent: null,
        currentGrandParent: null
      },
      navi: [
        {
          name: "Home",
          link: "home",
          icon: "home",
          children: [
            {
              name: "Timeline",
              link: "Home.Timeline"
            },
            {
              name: "Settings",
              link: "Home.Settings"
            }
          ]
        }
      ]
    };
  },
  components: {},
  mounted() {
    this.setRoute(this.$router.currentRoute);
  },
  methods: {
    setRoute(router) {
      console.log(router);
      this.router.currentRoute = router.name;
      this.router.currentParent =
        router.matched[1].name === router.name
          ? router.matched[0].name
          : router.matched[1].name;
      this.router.currentGrandParent =
        router.matched[1].name === router.name ? null : router.matched[0].name;
    }
  },
  watch: {
    $route(to, from) {
      this.setRoute(to);
    }
  }
};
</script>
