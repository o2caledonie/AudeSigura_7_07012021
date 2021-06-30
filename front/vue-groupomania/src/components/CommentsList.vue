<template>
  <div id="comments-list" >
    <div
      class="displayComments"
      v-bind="post"
      v-for="comment in comments"
      :key="comment.id"
    >
      {{ comment.content }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default {
  name: "CommentsList",
  components: {},
  props: {
    post: { type: Object }
  }, 
  data() {
    return {
      content: "",
      contentmodifyPost: "",
      comments: [],
      comment: "",
      contentComment: "",
    };
  },
  created() {
    this.displayComments();
    this.notyf = new Notyf({
      duration: 2000,
      position: {
        x: "center",
        y: "top",
      },
    });
  },
  methods: {
    displayComments() {
      const postId = this.post.id;
      console.log(this.post.id)
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