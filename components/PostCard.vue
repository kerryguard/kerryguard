<template>
  <div class="w-full md:w-1/2 lg:w-1/4 p-5">
    <div class="relative h-52">
      <nuxt-link v-bind:to="post.path">
        <img
          class="w-full h-full object-cover object-top"
          v-bind:src="post.images.small"
          v-bind:alt="post.images.alt"
        />
      </nuxt-link>
      <div
        class="
          absolute
          bottom-0
          left-0
          ml-8
          mb-6
          px-3
          pb-3
          pt-1
          inline-block
          bg-white
          rounded-b-2xl
          border-t-4 border-blue-500
        "
      >
        <p class="text-xl font-bold">{{ new Date(post.date).getDate() }}</p>
        <p class="text-xs uppercase text-gray-300">
          {{
            new Date(post.date).toLocaleDateString(undefined, {
              month: "short",
            })
          }}
        </p>
      </div>
    </div>
    <div class="pt-10 pb-14 px-5 bg-white rounded-b-lg">
      <a
        v-for="category in post.categories"
        v-bind:key="category"
        class="
          inline-block
          mb-6
          py-1
          px-3
          text-white
          font-bold
          rounded-xl
          bg-blue-500
        "
        href="#"
        >{{ category }}</a
      >
      <a href="#">
        <h3 class="mb-4 text-2xl font-bold">
          {{ post.title }}
        </h3>
        <p class="text-lg text-gray-300">
          {{ post.description }}
        </p>
      </a>
    </div>
  </div>
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