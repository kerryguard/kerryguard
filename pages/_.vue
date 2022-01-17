<template>
  <main>
    <Page :page="page" />
    <LatestPosts />
  </main>
</template>

<script>
import { createHead } from "~/functions/page.js";

export default {
  head() {
    return createHead({ article: this.page, $route: this.$route });
  },

  async asyncData({ $content, params, error }) {
    const contentPath = params.pathMatch.endsWith("/")
      ? params.pathMatch + "index"
      : params.pathMatch;
    let page;
    try {
      page = await $content(contentPath).fetch();
    } catch {}
    try {
      if (page == null || Array.isArray(page))
        page = await $content(params.pathMatch + "/index").fetch();
    } catch {
      error({ statusCode: 404, message: "Page not found" });
    }

    return {
      page,
    };
  },
};
</script>
