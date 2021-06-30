<template>
  <div id="posts-list">
    <div class="displayPosts" v-for="post in posts" :key="post.postId">
      <div class="card m-5">
        <div class="card-header d-flex">
          <Avatar
            v-if="post.owner.avatar == 'null'"
            :src="'user-circle-solid.svg'"
            class="avatar"
          />
          <Avatar v-else :src="post.owner.avatar" class="avatar" />

          <p class="card-text mx-3">
            {{ post.owner.userName }}
          </p>

          <p class="card-text ms-auto px-3">
            <small class="text-muted">
              Publié le {{ dateFormat(post.createdAt) }}
            </small>
          </p>
        </div>
        <div class="card-body p-0">
          <p class="card-text text-start mx-3 mt-2">
            {{ post.content }}
          </p>
          <PostImage v-if="post.image == 'null'" class="post-image" />
          <PostImage
            v-else
            :src="post.image"
            class="post-image"
            alt="Image de la publication"
          />
        </div>
        <div>
            <DeletePostBtn :post="post" @post-deleted="handlePostDeleted" />
        </div>
        <div>
          <Comments :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import moment from "moment";
import Avatar from "../components/Avatar.vue";
import PostImage from "../components/PostImage.vue";
import Comments from "../components/Comments.vue";
import DeletePostBtn from "../components/DeletePostBtn.vue";


export default {
  name: "PostsList",
  components: {
    Avatar,
    PostImage,
    Comments,
    DeletePostBtn
  },
  props: {
      posts: { type : Object } 
  },

  data() {
    return {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      isAdmin: localStorage.getItem("isAdmin"),
      imageProfile: localStorage.getItem("imageProfile"),
      imagePost: "",
      imagePreview: null,
      content: "",
      contentmodifyPost: "",
      comments: [],
      contentComment: "",
      revele: false,
      showComment: false,
      showCreateComment: false,
      showInputModify: false,
    };
  },
  methods: {

    handlePostDeleted() {
        this.$emit('post-deleted')
    },

    // date and time
    dateFormat(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/YYYY à hh:mm");
      }
    },
  },
};
</script>

<style lang="scss">
.post-image {
  width: 100%;
  height: auto;
}
</style>