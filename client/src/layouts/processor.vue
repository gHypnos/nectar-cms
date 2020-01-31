<template>
  <div class="d-flex flex-column h-100">
    <b-navbar toggleable="lg" type="dark" variant="secondary" class="mb-5">
      <b-container>
        <b-navbar-brand href="#">
          <img src="/assets/images/logo.gif" />
        </b-navbar-brand>
        <login />
      </b-container>
    </b-navbar>
    <b-container>
      <router-view />
    </b-container>
    <nectarFooter />
  </div>
</template>
<script>
import login from "../components/nectar/login";
import Footer from "../components/nectar/footer";
export default {
  data() {
    return {};
  },
  components: {
    login: login,
    nectarFooter: Footer
  },
  methods: {}
};
</script>
