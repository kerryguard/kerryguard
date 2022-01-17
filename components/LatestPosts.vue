<template>
  <section class="py-20 2xl:py-40 bg-blue-50 overflow-hidden">
    <div class="container px-4 mx-auto">
      <div class="mb-20 text-center">
        <span class="text-lg text-blue-500 font-bold">What's new</span>
        <h2 class="mt-8 text-6xl lg:text-7xl font-bold font-heading">
          Latest blog
        </h2>
      </div>
      <div class="flex flex-wrap -mx-5">
        <PostCard v-for="post in posts" v-bind:key="post.slug" :post="post" />
      </div>
      <div class="mt-14 lg:mt-20 text-center">
        <a
          class="
            inline-block
            py-5
            px-12
            mr-4
            bg-blue-500
            hover:bg-blue-600
            rounded-full
            text-white
            font-bold
            transition
            duration-200
          "
          href="#"
          >See all</a
        >
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
    };
  },

  async fetch() {
    console.log("running fetch");
    const source = this.$content("blog", { deep: true });
    const posts = await source.sortBy("date", "desc").limit(4).fetch();
    this.posts = posts;
  },
};
</script>
