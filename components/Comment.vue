<template>
  <div>
    <a v-if="comment.url" v-bind:href="comment.url" rel="nofollow">
      <img
        v-bind:alt="'Avatar for ' + comment.name"
        v-bind:src="comment.avatar || defaultAvatar"
        class="avatar avatar-64 photo"
        height="64"
        width="64"
      />
    </a>
    <img
      v-else
      v-bind:alt="'Avatar for ' + comment.name"
      v-bind:src="comment.avatar || defaultAvatar"
      class="avatar avatar-64 photo"
      height="64"
      width="64"
    />
    <blockquote>
      <nuxt-content class="comment-body" :document="comment" />
      <cite>
        <a v-if="comment.url" v-bind:href="comment.url" rel="nofollow">
          {{ comment.name }}
        </a>
        <span v-else>{{ comment.name }}</span>
        &ndash;
        <a
          class="muted"
          v-bind:href="'#comment-' + comment.id"
          v-bind:title="comment.date"
        >
          {{
            new Date(comment.date).toLocaleDateString("en-gb", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          }}
        </a>
      </cite>
    </blockquote>
  </div>
</template>
<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    defaultAvatar: {
      type: String,
      required: true,
    },
  },
};
</script>