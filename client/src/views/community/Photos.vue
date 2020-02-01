<template>
  <div class="photo_grid">
    <nectarPhoto v-for="(photo,index) in photos" :key="index" :photo="photo" />
  </div>
</template>

<script>
import API from "../../api";
import nectarPhoto from "../../components/templates/photo";
export default {
  data() {
    return {
      subHeader: {
        title: this.$t("community.photos"),
        image: "/assets/images/photos.png",
        desc: this.$t("community.photos_desc")
      },
      photos: ""
    };
  },
  components: {
    nectarPhoto
  },
  async mounted() {
    this.$store.main.commit("setSubHeader", this.subHeader);
    await this.getPhotos();
  },
  beforeDestroy() {
    this.$store.main.commit("setSubHeader", false);
  },
  methods: {
    getPhotos: async function() {
      try {
        let result = await API.get("/components/photos");
        this.photos = result.data;
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(Error(e));
      }
    }
  }
};
</script>
