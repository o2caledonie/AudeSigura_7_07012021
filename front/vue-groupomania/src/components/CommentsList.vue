<template>
  <div id="comments-list">
    <div
      class="accordion-item text-start p-2"
      v-bind="post"
      v-for="comment in comments"
      :key="comment.id"
    >
  
      <!-- <Avatar
        v-if="comment.ownerId.avatar == 'null'"
        :src="'user-circle-solid.svg'"
        class="avatar"
      />
      <Avatar v-else :src="comment.ownerId.avatar" class="avatar" /> -->

      <div class="fw-bold">
        {{ comment.owner.userName }}
      </div>
      {{ comment.content }}
      <DeleteCommentBtn :comment="comment" @comment-deleted="fetchComments" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
// import Avatar from "../components/Avatar.vue";
import DeleteCommentBtn from "../components/DeleteCommentBtn.vue";

export default {
  name: "CommentsList",
  components: {
    // Avatar,
    DeleteCommentBtn,
  },
  props: {
    post: { type: Object },
    comment: { type: Object }
  },
  data() {
    return {
      content: "",
      contentmodifyPost: "",
      comments: [],
      contentComment: "",
    };
  },
  created() {
    this.fetchComments();
    this.notyf = new Notyf({
      duration: 2000,
      position: {
        x: "center",
        y: "top",
      },
    });
  },
  methods: {
    fetchComments() {
      const postId = this.post.id;
      console.log(this.post.id);
      axios
        .get("http://localhost:3000/api/comment/" + postId, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.comments = response.data;
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },

    // Display publication date and time
    dateFormat(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/YYYY à hh:mm");
      }
    },
  },
};
</script>