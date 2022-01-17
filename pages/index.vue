<template>
  <main>
    <section
      class="
        relative
        pb-20
        lg:pb-40 lg:pt-20
        2xl:py-40
        bg-gray-800
        overflow-hidden
      "
    >
      <div class="relative w-full lg:w-1/2 lg:ml-auto mb-20 lg:mb-0">
        <img
          class="
            hidden
            lg:block lg:absolute
            right-0
            top-0
            w-full
            h-128
            object-cover
          "
          src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1200&amp;q=80"
          alt=""
        /><img
          class="lg:hidden w-full h-96 object-cover"
          src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
          alt=""
        />
      </div>
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full lg:w-1/2 px-4">
            <div class="max-w-lg">
              <h2
                class="
                  mb-12
                  lg:mb-20
                  text-5xl
                  lg:text-7xl lg:text-center
                  font-bold font-heading
                  text-white
                "
              >
                We're Zospace - Founded in London
              </h2>
              <div
                class="flex items-center mb-8 pb-14 border-b border-gray-500"
              >
                <img
                  class="mr-14"
                  src="/zospace-assets/images/light-bulb-purple.svg"
                  alt=""
                />
                <div class="max-w-sm">
                  <p class="text-lg text-gray-200">
                    A short message that will bring your customers into the
                    world of your imagination.
                  </p>
                </div>
              </div>
              <a
                class="flex items-center justify-end font-bold text-gray-200"
                href="#"
              >
                <span>Learn our story</span>
                <span class="ml-5">
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.7387 1.47293L18.7387 10.93L17.5565 10.93L17.5565 2.89739L0.835337 19.6245L0.00193592 18.7911L16.7231 2.064L9.28164 2.064L9.28164 0.881867L18.1476 0.881866C18.4741 0.881866 18.7387 1.14648 18.7387 1.47293Z"
                      fill="white"
                    ></path></svg
                ></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <LatestPosts />
  </main>
</template>
<script>
import { createHead } from "~/functions/page.js";

export default {
  head() {
    return createHead({
      title: "Home",
      $route: this.$route,
    });
  },
};
</script>
