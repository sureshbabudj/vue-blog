<template>
  <Post
    v-if="!edit"
    :post="post"
    v-on:edit="edit = true"
    v-on:delete="deletePost"
  />
  <Editor
    :post="post"
    v-else
    v-on:cancel="edit = false"
    v-on:update="updatePost"
  />
</template>

<script>
import Post from "../components/Post.vue";
import Editor from "../components/Editor.vue";

export default {
  data() {
    return {
      post: {},
      edit: false
    };
  },
  components: {
    Post,
    Editor
  },
  async created() {
    const res = await fetch(
      `http://localhost:3434/posts/${this.$route.params.postId}`
    );
    this.post = await res.json();
  },
  methods: {
    updatePost(post) {
      this.post = post;
      this.edit = false;
    },
    async deletePost() {
      try {
        await fetch(
          `http://localhost:3434/posts/${this.$route.params.postId}`,
          {
            method: "DELETE"
          }
        );
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
