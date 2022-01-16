<template>
  <article class="post">
    <h1>
      <a v-bind:href="article.url || article.path">{{ article.title }}</a>
    </h1>
    <p class="post-meta">
      <span
        v-bind:title="
          'Published ' +
          article.date +
          (article.updated ? ' and updated ' + article.updated : '')
        "
        >{{ article.dateFormatted }}
        <span v-if="article.updated">
          -
          {{ article.updatedFormatted }}
        </span>
      </span>
      <a
        v-for="category in article.categories"
        v-bind:key="category"
        class="badge badge-info"
        v-bind:title="category + ' category'"
        v-bind:href="'/blog/category/' + category + '/'"
        >{{ category }}</a
      >
    </p>
    <nuxt-content :document="article" />
  </article>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>