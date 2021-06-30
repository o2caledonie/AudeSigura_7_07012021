<template>
  <button
    type="submit"
    v-if="userId == post.ownerId || isAdmin == 'true'"
    v-on:click="deletePost(post.id)"
    class="btn btn-outline-danger"
    aria-label="Supprimer le message"
  >
    Supprimer <i class="far fa-trash-alt"></i>
  </button>
</template>

<script>
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default {
  name: "DeletePostBtn",
  components: {},
  props: {
    post: { type: Object },
  },

  data() {
    return {
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
  created() {
    this.notyf = new Notyf({
      duration: 2000,
      position: {
        x: "center",
        y: "top",
      },
    });
  },
  methods: {
    deletePost(id) {
      const postId = id;
    
      axios
        .delete("http://localhost:3000/api/post/" + postId, {
          headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
          },
        })
        .then(() => {
          this.notyf.success("Votre publication a bien été supprimée !");
          this.$emit('post-deleted')
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },
  },
};
</script>