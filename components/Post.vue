<template>
  <article class="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
    <div class="container px-4 mx-auto">
      <div class="max-w-3xl mx-auto text-center">
        <h2
          class="mb-14 text-6xl lg:text-7xl font-bold font-heading text-white"
        >
          {{ post.title }}
        </h2>
        <div class="inline-flex mb-14 lg:mb-20 items-center">
          <img
            class="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
            alt=""
          />
          <div class="text-left">
            <h4 class="mb-1 text-2xl font-bold text-gray-50">Kerry Guard</h4>
            <p class="text-white">{{ post.formattedDate }}</p>
          </div>
        </div>
      </div>
      <div class="relative h-96 mb-20">
        <img
          v-if="post.images && post.images.large"
          v-bind:src="post.images.large"
          class="w-full h-full object-cover"
          v-bind:alt="post.images.alt"
        />
      </div>
      <div class="prose prose-invert text-lg max-w-prose mx-auto">
        <nuxt-content :document="post" />
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>