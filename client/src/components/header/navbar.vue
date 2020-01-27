<template>
  <div>
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
            <li class="nav-item" v-for="(r,i) in routes" :key="i">
              <router-link :to="r.path" class="nav-link">
                <i :class="r.icon" />
                {{r.name}}
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="btn btn-warning" to="/client">
                Enter Hotel
                <i class="fas fa-hotel ml-2" />
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-dark">
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
            <li class="nav-item" v-for="(r,i) in routeChildren" :key="i">
              <router-link :to="r.path" class="nav-link">{{r.name}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      children: this.$router.currentRoute,
      routes: [
        {
          path: "/home",
          name: "Home",
          icon: "fas fa-home",
          children: [
            {
              path: "/home",
              name: "Home"
            }
          ]
        },
        {
          path: "/home",
          name: "Community",
          icon: "fas fa-hotel",
          children: [
            {
              path: "/logoutt",
              name: "Logouttt"
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
      return this.getChildrenByPath(routePath);
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
