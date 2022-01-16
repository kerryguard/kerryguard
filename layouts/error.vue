<template>
  <main>
    <h1>
      {{ error.statusCode === 404 ? "Page not found" : "An error occurred" }}
    </h1>
    <p>Please check the URL in the address bar and try again.</p>
  </main>
</template>
<script>
import { createHead } from "~/functions/page.js";

export default {
  props: ["error"],
  head() {
    return createHead({ title: "Error", $route: this.$route });
  },
};
</script>