<template>
  <div
    class="nectar_imager circle"
    v-if="$store.main.state.settings && look"
    v-bind:style="'background-image:url(' + $store.main.state.settings.habbo_imager  + look + additions + '&headonly=1'"
  />
</template>

<script>
export default {
  props: {
    look: String,
    additions: String
  }
};
</script>
