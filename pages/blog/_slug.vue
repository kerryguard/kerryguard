<template>
  <main>
    <Post :post="post" />
    <LatestPosts />
  </main>
</template>

<script>
import { createHead } from "~/functions/page.js";

export default {
  head() {
    return createHead({ article: this.post, $route: this.$route });
  },

  async asyncData({ $content, params, error }) {
    let post;
    try {
      post = await $content("blog/" + params.slug).fetch();
    } catch {
      error({ statusCode: 404, message: "Post not found" });
    }

    return {
      post,
    };
  },
};
</script>
