<template>
  <div v-if="totalPages > 1" class="pagination pagination-centered">
    <ul class="page-numbers">
      <li v-if="currentPage > 1">
        <a v-bind:href="makePageUrl(1)" title="Start (page 1)" class="prev"
          >⏮</a
        >
      </li>
      <li v-if="currentPage > 1">
        <a
          v-bind:href="makePageUrl(currentPage - 1)"
          v-bind:title="'Previous (page ' + (currentPage - 1) + ')'"
          class="prev"
          >⏴</a
        >
      </li>
      <li v-for="page in getPages()" v-bind:key="page">
        <span v-if="page == currentPage" class="page-numbers current">{{
          page
        }}</span>
        <a
          v-else
          v-bind:title="'Page ' + page"
          v-bind:href="makePageUrl(page)"
          >{{ page }}</a
        >
      </li>
      <li v-if="currentPage < totalPages">
        <a
          v-bind:href="makePageUrl(currentPage + 1)"
          v-bind:title="'Next (page ' + (currentPage + 1) + ')'"
          class="next"
          >⏵</a
        >
      </li>
      <li v-if="currentPage < totalPages">
        <a
          v-bind:href="makePageUrl(totalPages)"
          v-bind:title="'End (page ' + totalPages + ')'"
          class="next"
          >⏭</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
const pageRegex = /\/page\/(\d+)\//;
const pagesEitherSide = 2;

export default {
  props: {
    currentUrl: {
      type: String,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },

  methods: {
    getPages() {
      let startPage = this.currentPage - pagesEitherSide;
      let endPage = this.currentPage + pagesEitherSide;

      if (startPage < 1) {
        endPage -= startPage - 1;
        startPage = 1;
      }

      if (endPage > this.totalPages) {
        const over = endPage - this.totalPages;
        startPage -= over;
        if (startPage < 1) startPage = 1;
        endPage = this.totalPages;
      }

      const length = endPage - startPage;

      const pages = [];
      for (let i = 0; i <= length; i++) pages.push(startPage + i);
      return pages;
    },
    makePageUrl(page) {
      return this.currentUrl.replace(
        pageRegex,
        page == 1 ? "/" : `/page/${page}/` // Remove paging for page 1
      );
    },
  },
};
</script>