<template>
  <main>
    <Post :article="article" />
    <Comments
      :comments="comments"
      :pageSlug="pageSlug"
      :closed="article.commenting == 'closed'"
      siteUrl="https://kerryguard.com"
      postAuthorEmail="kerryguard@gmail.com"
    />
  </main>
</template>

<script>
import { createHead } from "~/functions/page.js";

export default {
  head() {
    return createHead({ article: this.article, $route: this.$route });
  },

  async asyncData({ $content, params, error }) {
    const contentPath = params.pathMatch.endsWith("/")
      ? params.pathMatch + "index"
      : params.pathMatch;

    let article;
    try {
      article = await $content(contentPath).fetch();
    } catch {}

    try {
      if (article == null || Array.isArray(article))
        article = await $content(params.pathMatch + "/index").fetch();
    } catch {
      error({ statusCode: 404, message: "Post not found" });
    }

    let comments = [];
    try {
      comments = await $content("comments/" + params.pathMatch)
        .sortBy("date", "asc")
        .fetch();
    } catch {}

    return {
      article,
      comments,
      pageSlug: params.pathMatch,
    };
  },
};
</script>
