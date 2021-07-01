<template>
  <button
    type="submit"
    v-if="userId == post.ownerId || isAdmin == 'true'"
    v-on:click="deletePost(post.id)"
    class="btn btn-outline-danger"
    aria-label="Supprimer le message"
  >
  <i class="far fa-trash-alt"></i>
  </button>
</template>

<script>
import axios from "axios";

export default {
  name: "DeletePostBtn",
  components: {},
  props: {
    post: { type: Object },
  },
  inject: ['notyf'],
  data() {
    return {
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
      
    };
  },
  methods: {

    //Delete Post
    deletePost(id) {
      const postId = id;

      axios
        .delete("http://localhost:3000/api/post/" + postId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          if (window.confirm("Supprimer la publication ?")) {
            this.notyf.success("Votre publication a bien été supprimée !");
            this.$emit("post-deleted");
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