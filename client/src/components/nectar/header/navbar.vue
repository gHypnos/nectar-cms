<template>
  <b-navbar toggleable="lg" :type="variant" v-if="routes">
    <b-container>
      <b-navbar-toggle target="nav-collapse" v-if="variant == 'light'"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item v-for="(r,i) in routes" :to="r.path" :key="i">
            <i :class="r.icon" v-if="variant == 'light'" />
            {{r.name}}
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="variant == 'light' && $store.Session.state.character">
          <b-nav-item>
            <router-link class="btn btn-warning w-100" :to="{name:'Hotel'}">
              Enter Hotel
              <i class="fas fa-hotel ml-2" />
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  props: {
    routes: {},
    variant: String
  }
};
</script>
