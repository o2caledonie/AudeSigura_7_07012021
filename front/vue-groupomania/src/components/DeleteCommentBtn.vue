<template>
  <button
    type="submit"
    v-if="userId == comment.ownerId || isAdmin == 'true'"
    v-on:click="deleteComment(comment.id)"
    class="btn btn-outline-danger"
    aria-label="Supprimer le commentaire"
  >
    Supprimer <i class="far fa-trash-alt"></i>
  </button>
</template>

<script>
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default {
  name: "DeleteCommentBtn",
  components: {},
  props: {
    comment: { type: Object },
  },

  data() {
    return {
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
  created() {
    this.notyf = new Notyf({
      duration: 3000,
      position: {
        x: "center",
        y: "top",
      },
    });
  },
  methods: {
    deleteComment(id) {
      const commentId = id;

      axios
        .delete("http://localhost:3000/api/comment/" + commentId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          if (window.confirm("Supprimer le commentaire ?")) {
            this.notyf.success("Votre commentaire a bien été supprimé !");
            this.$emit("comment-deleted");
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