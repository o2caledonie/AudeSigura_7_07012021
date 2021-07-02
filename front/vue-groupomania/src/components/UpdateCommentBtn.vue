<template>
<div>
  <button
    type="submit"
    v-if="userId == comment.ownerId || isAdmin == 'true'"
    v-on:click="updateComment(comment.id)"
    class="btn btn-danger"
    aria-label="Modifier le commentaire"
  >
 <i class="fas fa-pencil-alt"></i>
  </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateCommentBtn",
  components: {},
  props: {
    comment: { type: Object },
  },
  inject: ['notyf'],
  data() {
    return {
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
  methods: {
    //Delete comment
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