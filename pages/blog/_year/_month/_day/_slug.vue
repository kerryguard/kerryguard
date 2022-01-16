<template>
  <main>
    <Post :article="article" />
    <Comments
      :comments="comments"
      :pageSlug="pageSlug"
      siteUrl="https://kerryguard.com"
      postAuthorEmail="kerryguard@gmail.com"
    />
  </main>
</template>

<script>
import { createHead } from "~/functions/page.js";
import { md5 } from "~/functions/md5.js";

export default {
  head() {
    return createHead({ article: this.article, $route: this.$route });
  },

  async asyncData({ $content, params, error }) {
    const fullName = `${params.year}-${params.month}-${params.day}-${params.slug}`;

    let article;
    try {
      article = await $content("blog/" + params.year, fullName).fetch();
    } catch {
      error({ statusCode: 404, message: "Post not found" });
    }

    let comments = [];
    try {
      comments = await $content("comments/" + params.slug)
        .sortBy("date", "asc")
        .fetch();
    } catch {}

    for (const comment of comments) {
      comment.isAuthor = comment.email == "kerryguard@gmail.com";
      comment.gravatar = md5(comment.email);
      comment.email = undefined;
    }

    return {
      article,
      comments,
      pageSlug: params.slug,
    };
  },
};
</script>
