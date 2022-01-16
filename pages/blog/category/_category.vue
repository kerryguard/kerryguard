<template>
  <main>
    <h1>{{ category }} articles ({{ articles.length }})</h1>
    <ol>
      <li v-for="article in articles" v-bind:key="article.path">
        <a v-bind:href="article.url">{{ article.title }}</a>
        ({{ new Date(article.date).toLocaleDateString() }})
      </li>
    </ol>
  </main>
</template>

<script>
import { createHead } from "~/functions/page.js";

export default {
  head() {
    return createHead({
      title: `${this.category} category`,
      $route: this.$route,
    });
  },

  async asyncData({ $content, params }) {
    const articles = await $content("blog", { deep: true })
      .where({ categories: { $contains: params.category } })
      .sortBy("date", "desc")
      .fetch();

    return {
      articles,
      category: params.category,
    };
  },
};
</script>
