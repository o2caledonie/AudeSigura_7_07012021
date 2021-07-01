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
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Avatar from "../components/Avatar.vue";
import DeleteCommentBtn from "../components/DeleteCommentBtn.vue";

export default {
  name: "CommentsList",
  components: {
    Avatar,
    DeleteCommentBtn,
  },
  props: {
    post: { type: Object },
    comments: { type: Array },
  },
  data() {
    return {
      content: "",
      comment: "",
    };
  },
  methods: {
    //Emit to parent component when comment is deleted
    handleCommentDeleted() {
      this.$emit("comment-deleted");
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