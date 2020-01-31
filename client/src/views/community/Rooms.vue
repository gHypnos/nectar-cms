<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      subHeader: {
        title: this.$t("community.rooms"),
        image: "/assets/images/rooms.png",
        desc: this.$t("community.rooms_desc")
      }
    };
  },
  mounted() {
    this.$store.main.commit("setSubHeader", this.subHeader);
  },
  beforeDestroy() {
    this.$store.main.commit("setSubHeader", false);
  }
};
</script>
