<template>
  <div id="comments-list">
    <div
      class="accordion-item text-start p-2"
      v-bind="post"
      v-for="comment in comments"
      :key="comment.id"
    >
      <Avatar
        v-if="comment.owner.avatar == 'null'"
        :src="'user-circle-solid.png'"
        class="avatar"
      />
      <Avatar v-else :src="comment.owner.avatar" class="avatar" />

      <div class="fw-bold">
        {{ comment.owner.userName }}
        <small class="text-muted mx-3 fw-normal">
          le {{ dateFormat(comment.createdAt) }} :
        </small>
      </div>

      {{ comment.content }}
      <DeleteCommentBtn
        :comment="comment"
        @comment-deleted="handleCommentDeleted"
      />

      <UpdateCommentBtn
        :comment="comment"
        @comment-updated="handleCommentUpdated"
      />


      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Avatar from "../components/Avatar.vue";
import DeleteCommentBtn from "../components/DeleteCommentBtn.vue";
import UpdateCommentBtn from "../components/UpdateCommentBtn.vue";

export default {
  name: "CommentsList",
  components: {
    Avatar,
    DeleteCommentBtn,
    UpdateCommentBtn,
  },
  props: {
    post: { type: Object },
    comments: { type: Array },
    comment: { type: Object },
  },
  data() {
    return {
      content: "",
      isAdmin: localStorage.getItem("isAdmin"),
      user: "",
    };
  },
  methods: {
    //Emit to parent component when comment is deleted
    handleCommentDeleted() {
      this.$emit("comment-deleted");
    },

    //Emit to parent component when comment is updated
    handleCommentUpdated() {
      this.$emit("comment-updated");
    },

    // Display publication date and time
    dateFormat(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/YYYY à hh:mm");
      }
    },

    updateComment(id) {
      const commentId = id;
      axios
        .patch("http://localhost:3000/api/comment/" + commentId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          if (window.confirm("Modifier le commentaire ?")) {
            this.notyf.success("Votre commentaire a bien été modifié !");
            this.$emit("comment-updated");
          }
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },
  },
};
</script>