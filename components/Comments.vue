<template>
  <section v-if="comments.length > 0 || !closed" id="comments">
    <h3>{{ comments.length }} responses</h3>
    <ol>
      <li
        v-for="comment in comments"
        v-bind:class="{ byauthor: isAuthor }"
        v-bind:key="comment.id"
        v-bind:id="'comment-' + comment.id"
      >
        <Comment
          :comment="comment"
          default-avatar="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&amp;f=y"
        />
      </li>
      <li v-if="!closed">
        <CommentNew :siteUrl="siteUrl" :pageSlug="pageSlug" />
      </li>
    </ol>
  </section>
</template>
<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
    closed: {
      type: Boolean,
      required: false,
    },
    isAuthor: {
      type: Boolean,
      required: false,
    },
    siteUrl: {
      type: String,
      required: true,
    },
    pageSlug: {
      type: String,
      required: true,
    },
  },
};
</script>