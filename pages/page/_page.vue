<template>
  <main>
    <Post
      v-for="article in articles"
      v-bind:key="article.path"
      :article="article"
    />
    <Pagination
      :totalPages="this.totalPages"
      :currentPage="this.currentPage"
      :currentUrl="this.$route.path"
    />
  </main>
</template>
<script>
import { createHead } from "~/functions/page.js";

const pageSize = 4;

export default {
  head() {
    return createHead({
      title: "Home" + (this.page > 1 ? " - page " + this.page : ""),
      $route: this.$route,
    });
  },

  async asyncData({ $content, params }) {
    const allArticles = $content("blog", { deep: true });
    const count = (await allArticles.fetch()).length;

    const articles = await allArticles
      .sortBy("date", "desc")
      .skip((params.page - 1) * pageSize)
      .limit(pageSize)
      .fetch();

    return {
      articles,
      totalPages: Math.floor(count / pageSize),
      currentPage: parseInt(params.page),
    };
  },
};
</script>
