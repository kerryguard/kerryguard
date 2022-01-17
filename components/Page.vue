<template>
  <article class="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
    <div class="container px-4 mx-auto">
      <div class="max-w-3xl mx-auto text-center">
        <h2
          class="mb-14 text-6xl lg:text-7xl font-bold font-heading text-white"
        >
          {{ page.title }}
        </h2>
      </div>
      <div class="relative h-96 mb-20" v-if="page.images && page.images.large">
        <img
          v-bind:src="page.images.large"
          class="w-full h-full object-cover"
          v-bind:alt="page.images.alt"
        />
      </div>
      <div class="prose prose-invert text-lg max-w-prose mx-auto">
        <nuxt-content :document="page" />
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
};
</script>