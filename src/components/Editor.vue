<template>
  <div class="wrapper">
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click="error = false"></button>
      {{ error }}
    </div>
    <span class="title-wrap">
      <input type="text" class="title" placeholder="Title" v-model="title" />
      <div class="buttons" v-if="post">
        <a class="button is-primary" @click="updatePost()">
          <span>Update</span>
          <span class="icon is-small"><i class="fas fa-file-upload"></i></span>
        </a>
        <a
          v-if="post"
          class="button is-danger is-light"
          @click="$emit('cancel')"
        >
          <span>Cancel</span>
          <span class="icon is-small"><i class="fas fa-hand-paper"></i></span>
        </a>
      </div>
      <div class="buttons" v-else>
        <a class="button is-primary" @click="createPost()">
          <span>Create</span>
          <span class="icon is-small"><i class="fas fa-save"></i></span>
        </a>
      </div>
    </span>
    <div class="options">
      <button class="editor-btn" @click="transform('bold', null)">
        <i class="fas fa-bold"></i>
      </button>
      <button class="editor-btn" @click="transform('italic', null)">
        <i class="fas fa-italic"></i>
      </button>
      <button class="editor-btn" @click="transform('strikeThrough', null)">
        <i class="fas fa-strikethrough"></i>
      </button>
      <button class="editor-btn" @click="transform('underline', null)">
        <i class="fas fa-underline"></i>
      </button>
      <div class="seperator"></div>
      <button class="editor-btn" @click="transform('justifyLeft', null)">
        <i class="fas fa-align-left"></i>
      </button>
      <button class="editor-btn" @click="transform('justifyCenter', null)">
        <i class="fas fa-align-center"></i>
      </button>
      <button class="editor-btn" @click="transform('justifyRight', null)">
        <i class="fas fa-align-right"></i>
      </button>
      <div class="seperator"></div>
      <button class="editor-btn" @click="transform('insertOrderedList', null)">
        <i class="fas fa-list-ol"></i>
      </button>
      <button
        class="editor-btn"
        @click="transform('insertUnorderedList', null)"
      >
        <i class="fas fa-list-ul"></i>
      </button>

      <div class="seperator"></div>
      <select @change="transform('fontName', fontName)" v-model="fontName">
        <option default value="Times New Roman">Times</option>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Arial">Verdana</option>
      </select>
      <div class="seperator"></div>
      <input
        type="number"
        @change="transform('fontSize', fontSize)"
        max="7"
        min="1"
        v-model="fontSize"
      />
    </div>
    <div id="editor" contenteditable></div>
    <div class="input-tags">
      <h5>Tags:</h5>
      <div class="tags">
        <span
          class="tag is-medium"
          v-for="(tag, index) in tags"
          :key="`tag-${index}`"
        >
          {{ tag }}
          <button class="delete is-small" @click="removeTag(index)"></button>
        </span>
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="tag"
          v-on:keyup.enter="addTag()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  props: {
    post: Object
  },
  emits: ["cancel"],
  data() {
    return {
      error: "",
      fontName: "Times",
      title: "",
      fontSize: 3,
      tags: [],
      tag: ""
    };
  },
  computed: {
    user() {
      return store.state.user;
    },
    editor() {
      return this.$el.querySelector("#editor");
    }
  },
  methods: {
    transform(option, argument) {
      console.log(option, argument);
      document.execCommand(option, false, argument);
    },
    removeTag(index) {
      this.tags = this.tags.filter((tag, i) => i !== index);
    },
    addTag() {
      if (!this.tag) return;
      this.tags.push(this.tag);
      this.tag = "";
    },
    isError() {
      if (!this.title.length) {
        this.error = "Enter Post title";
        return true;
      }
      if (!this.editor.innerText.length) {
        this.error = "Enter Post content";
        return true;
      }
    },
    async createPost() {
      if (this.isError()) {
        return;
      }
      this.error = false;
      try {
        const payload = {
          title: this.title,
          author: this.user.id,
          content: this.editor.innerHTML,
          date: Date.now(),
          tags: this.tags
        };
        const res = await fetch(`http://localhost:3434/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const post = await res.json();
        this.$router.push({ name: "post", params: { postId: post.id } });
      } catch (error) {
        console.log(error);
      }
    },
    async updatePost() {
      if (this.isError()) {
        return;
      }
      this.error = false;
      try {
        const payload = {
          title: this.title,
          content: this.editor.innerHTML,
          updatedDate: Date.now(),
          tags: this.tags
        };
        const res = await fetch(`http://localhost:3434/posts/${this.post.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const post = await res.json();
        this.$emit("update", post);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    if (this.post) {
      this.title = this.post.title || "";
      this.editor.innerHTML = this.post.content || "";
      this.tags = this.post.tags || [];
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: stretch;
  padding: 1rem;
}
.title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
input.title {
  height: 2rem;
  padding: 0 2rem 0 0;
  border: 0;
  outline: none;
  font-size: 1rem;
  margin: 0;
  flex: 1;
}
.options {
  height: 3rem;
  margin-top: 0.5rem;
  border-top: 1px solid #ddd;
}
.seperator {
  display: inline;
  border-left: 1px solid #ddd;
  height: 3rem;
}
button.editor-btn {
  margin: 0;
  padding: 0;
  height: 3rem;
  width: 3rem;
  background-color: #fff;
  border: 0;
  cursor: pointer;
  color: #333;
}
button:active {
  color: #333;
}
select {
  height: 3rem;
  -webkit-appearance: none;
  border: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  outline: none;
}
input[type="number"] {
  height: 3rem;
  border: 0;
  padding: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  outline: none;
}
#editor {
  padding: 0.5rem;
  padding-left: 2rem;
  min-height: 60rem;
  flex: 1 0 auto;
}
.input-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem;
  h5 {
    margin-right: 1rem;
  }
  .tags {
    .input {
      width: auto;
      flex: 0;
      line-height: 1rem;
      font-size: 1rem;
      padding: 0 0.25rem;
      margin: 0 0.5rem 0.5rem 0;
      height: auto;
      min-height: 0;
      max-width: 7rem;
    }
  }
}
</style>
