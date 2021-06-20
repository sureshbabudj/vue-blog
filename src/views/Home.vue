<template>
  <Post
    v-for="post of posts"
    v-bind:key="post.id"
    :post="post"
    :excerpt="true"
  />
</template>

<script>
import Post from "../components/Post.vue";
export default {
  name: "Home",
  data: () => {
    return {
      posts: []
    };
  },
  components: {
    Post
  },
  async created() {
    try {
      const res = await fetch(
        "http://localhost:3434/posts?_sort=date&_order=desc&_page=1&_limit=10"
      );
      this.posts = await res.json();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {}
};
</script>
