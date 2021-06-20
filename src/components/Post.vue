<template>
  <div class="post columns">
    <div class="feat-img column is-one-fifth">
      <img :src="getImage(post.title)" />
    </div>
    <article class="column">
      <header>
        <h2>
          <a @click="goToPost(post.id)">{{ post.title }}</a>
          <div class="buttons" v-if="!excerpt && post.author === user.id">
            <a class="button is-small is-primary" @click="$emit('edit')">
              <span>Edit</span>
              <span class="icon is-small">
                <i class="fas fa-edit" />
              </span>
            </a>

            <a class="button is-small is-danger" @click="$emit('delete')">
              <span>Delete</span>
              <span class="icon is-small">
                <i class="fas fa-edit" />
              </span>
            </a>
          </div>
        </h2>
        <p class="author-cred">
          by <a href="#">{{ getAuthor(post.author) }}</a> on
          {{ renderDate(post.date) }}
          <a href="#" v-if="!excerpt">{{ comments.length }} Comments</a>
        </p>
      </header>
      <div id="postContent" v-html="post.content" v-show="!excerpt" />
      <div id="postExcerpt" v-show="excerpt">{{ html }}</div>
      <footer v-if="excerpt">
        <a @click="goToPost(post.id)">Read More</a>
        <div class="tags are-medium">
          <span
            class="tag"
            v-for="(tag, index) of post.tags"
            :key="`tag-${index}`"
          >
            {{ tag }}
          </span>
        </div>
      </footer>
      <div class="comments" v-else>
        <div class="comment-wrap">
          <div class="comment-block">
            <form novalidate @submit.prevent="postComment()">
              <textarea
                class="textarea"
                name=""
                id=""
                cols="30"
                rows="3"
                placeholder="Add comment..."
                v-model="comment"
              ></textarea>
              <button type="submit" class="button is-light">
                Post Comment
              </button>
            </form>
          </div>
        </div>

        <div
          class="comment-wrap"
          v-for="comment of comments"
          v-bind:key="comment.id"
        >
          <div class="photo">
            <a
              :title="getAuthor(comment.author)"
              class="avatar"
              style="background-image: url('https://loremflickr.com/50/50/cat')"
            ></a>
          </div>
          <div class="comment-block">
            <p class="comment-text">
              {{ comment.content }}
            </p>
            <div class="bottom-comment">
              <div class="comment-date">{{ renderDate(comment.date) }}</div>
              <ul class="comment-actions">
                <li class="complain">Complain</li>
                <li class="reply">Reply</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import renderDate from "../util/dateFormat";
export default {
  data() {
    return {
      html: "",
      comments: [],
      comment: ""
    };
  },
  props: {
    post: Object,
    excerpt: Boolean
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    users() {
      return this.$store.state.users;
    },
    postId() {
      return this.post.id;
    }
  },
  async mounted() {
    this.$store.dispatch("fetchUsers");
    const html = this.$el.querySelector("#postContent");
    this.html = `${html.innerText.slice(0, 260)}...`;
    this.$nextTick(async function () {
      if (!this.excerpt) {
        const res = await fetch(
          `http://localhost:3434/comments?post=${this.postId}`
        );
        this.comments = await res.json();
      }
    });
  },
  methods: {
    renderDate,
    goToPost(postId) {
      this.$router.push({ name: "post", params: { postId } });
    },
    getAuthor(id) {
      const author = this.users.find((i) => i.id === id);
      return (author && author.name) || "";
    },
    getImage(title) {
      if (!title) {
        return "";
      }
      let url = "https://loremflickr.com/250/250/";
      const tags = title
        .split(" ")
        .filter((i) => i.length > 6)
        .join();
      return url + tags;
    },
    async postComment() {
      console.log(this.comment);
      try {
        const payload = {
          post: this.postId,
          author: this.user.id,
          content: this.comment,
          date: Date.now()
        };
        const res = await fetch(`http://localhost:3434/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        await res.json();
        this.comment = "";
        this.fetchComments();
      } catch (error) {
        console.log(error);
      }
    },
    async fetchComments() {
      if (isNaN(this.postId)) {
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:3434/comments?post=${this.postId}&_sort=date&_order=desc`
        );
        this.comments = await res.json();
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    if (this.excerpt) {
      return;
    }
    this.$watch(
      async () => this.postId,
      async () => {
        this.fetchComments();
      }
    );
  }
};
</script>

<style scoped lang="scss">
article {
  header {
    h2 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      line-height: 3rem;
      font-size: 1.5rem;
    }
  }
}
.comments {
  margin: 2.5rem auto 0;
  max-width: 60.75rem;
  padding: 0 1.25rem;
}

.comment-wrap {
  margin-bottom: 1.25rem;
  display: table;
  width: 100%;
  min-height: 5.3125rem;
}

.photo {
  padding-top: 1.5rem;
  padding-right: 1rem;
  display: table-cell;
  width: 3.5rem;
}
.photo .avatar {
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  background-size: contain;
  background-color: #e1e5eb;
  display: block;
}

.comment-block {
  padding: 1rem;
  background-color: #fff;
  display: table-cell;
  vertical-align: top;
  border-radius: 0.1875rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}
.comment-block textarea {
  width: 100%;
  resize: none;
}

.comment-text {
  margin-bottom: 1.25rem;
}

.bottom-comment {
  color: #acb4c2;
  font-size: 0.875rem;
}

.comment-date {
  float: left;
}

.comment-actions {
  float: right;
}
.comment-actions li {
  display: inline;
  margin: -2px;
  cursor: pointer;
}
.comment-actions li.complain {
  padding-right: 0.75rem;
  border-right: 1px solid #e1e5eb;
}
.comment-actions li.reply {
  padding-left: 0.75rem;
  padding-right: 0.125rem;
}
.comment-actions li:hover {
  color: #0095ff;
}
</style>
