<template>
  <div class="nectar-news d-flex justify-content-between" v-if="articles && articles.length">
    <div
      class="nectar-news-item"
      v-if="currentArticle"
      @click="$router.push({name:'Logout'})"
      @mouseover="stopTicking"
      @mouseout="startTicking"
    >
      <figure
        class="nectar-news-viewport"
        :style="'background-image:url('+currentArticle.image+');'"
      />
      <article>
        <h2>{{currentArticle.title}}</h2>
        <div class="meta">
          <span class="date">{{moment(currentArticle.timestampCreated).format('MMM Do, YYYY')}} |</span>
          {{currentArticle.author.username}}
        </div>
      </article>
    </div>
    <div class="bullets">
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="bullet"
        :class="{'active': (currentIndex === index)}"
        @click="switchArticle(index)"
      />
    </div>
    <span class="align-self-center arrow arrow-left" @click="previousArticle" />
    <span class="align-self-center arrow arrow-right" @click="nextArticle" />
  </div>
  <h1 v-else>{{$t('home.noArticles')}}</h1>
</template>

<script>
import moment from "moment";
import store from "../../store";
import vue from "vue";
export default {
  data() {
    return {
      currentIndex: -1,
      currentArticle: null,
      articles: [],
      moment: moment
    };
  },
  beforeDestroy() {
    this.stopTicking();
  },
  mounted: async function() {
    try {
      this.articles = [];
      this.currentIndex = -1;

      const response = await this.$http.get("/components/news");
      const articles = response && response.data;

      if (!articles || !articles.length) return;

      this.articles = articles;

      this.nextArticle();

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  methods: {
    startTicking() {
      this.stopTicking();
      this.interval = setInterval(() => this.tick(), 5000);
    },
    stopTicking() {
      if (!this.interval) return;
      clearInterval(this.interval);
      this.interval = null;
    },
    tick() {
      console.log(this.currentArticle);
      const totalArticles = this.articles.length;

      if (!totalArticles) {
        this.stopTicking();

        return;
      }

      this.nextArticle(false);
    },
    setArticle(index) {
      this.currentIndex = index;
      this.currentArticle = this.articles[this.currentIndex];
    },
    nextArticle(tick = true) {
      const totalArticles = this.articles.length;

      const nextIndex = this.currentIndex + 1;

      if (nextIndex >= totalArticles || nextIndex < 0) {
        this.setArticle(0);
      } else {
        this.setArticle(nextIndex);
      }

      if (tick) this.startTicking();
    },
    previousArticle(tick = true) {
      const totalArticles = this.articles.length;

      const nextIndex = this.currentIndex - 1;

      if (nextIndex >= totalArticles || nextIndex < 0) {
        this.setArticle(totalArticles - 1);
      } else {
        this.setArticle(nextIndex);
      }

      if (tick) this.startTicking();
    },
    switchArticle(index, tick = true) {
      const totalArticles = this.articles.length;
      if (index >= totalArticles || index < 0) {
        this.setArticle(0);
      } else {
        this.setArticle(index);
        this.currentIndex = index;
      }

      if (tick) this.startTicking();
    }
  }
};
</script>
