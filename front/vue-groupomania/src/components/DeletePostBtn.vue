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
      username: localStorage.getItem("username"),
      isAdmin: localStorage.getItem("isAdmin"),
      imageProfile: localStorage.getItem("imageProfile"),
      posts: [],
      imagePost: "",
      imagePreview: null,
      content: "",
      contentmodifyPost: "",
      comments: [],
      contentComment: "",
      revele: false,
      showCreateComment: false,
      showInputModify: false,
      showComments: false,
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
          this.notyf.success("Votre publication a bien été modifié !");
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },
  },
};
</script>