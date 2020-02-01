<template>
  <div class="photo">
    <div class="photo-preview" :style="'background-image:url('+photo.url+');'" />
    <div class="info">
      <imager :look="photo.user.look" :additions="'&head_direction=3'" />
      {{photo.user.username}}
    </div>
  </div>
</template>

<script>
import imager from "./avatar-circle";
export default {
  props: {
    photo: Object
  },
  components: {
    imager
  }
};
</script>
