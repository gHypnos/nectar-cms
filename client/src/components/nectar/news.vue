<template>
  <div class="nectar-news" v-if="articles">
    <div
      class="nectar-news-item"
      v-if="article"
      @click="$router.push({name:'Logout'})"
      @mouseover="stopArticles"
      @mouseout="startArticles"
    >
      <figure class="nectar-news-viewport" :style="'background-image:url('+article.image+');'" />
      <article>
        <h2>{{article.title}}</h2>
        <div class="meta">
          <span class="text-muted">{{moment(article.timestampCreated).format('MMM Do, YYYY')}}</span>
        </div>
      </article>
    </div>
    <div class="bullets">
      <div
        v-for="(article,id) in articles"
        :key="id"
        class="bullet"
        :class="{'active':(index == article.id)}"
        @click="switchArticle(article.id)"
      />
    </div>
  </div>
  <h1 v-else>{{$t('home.noArticles')}}</h1>
</template>

<script>
import moment from "moment";
import store from "../../store";
import vue from "vue";
export default {
  props: {
    articles: {
      type: Object
    }
  },
  data() {
    return {
      interval: null,
      index: 0,
      article: null,
      moment: moment
    };
  },
  beforeDestroy() {
    this.stopArticles();
  },
  mounted() {
    this.startArticles();
  },
  methods: {
    switchArticle(value) {
      this.stopArticles();
      this.article = this.articles["article-" + value];
      this.startArticles();
    },
    startArticles: function() {
      this.index++;
      if (this.index > Object.keys(this.articles).length) {
        this.index = 1;
      }
      this.article = this.articles["article-" + this.index];
      this.interval = setTimeout(this.startArticles, 5000);
    },
    stopArticles: function() {
      clearTimeout(this.interval);
    }
  }
};
</script>
