<template>
  <div id="one-post">
    <Navbar />

    <div class="container mt-5" v-if="post === null">chargement</div>
    <div class="container mt-5" v-else>
      <div class="card mx-auto mb-5 d-flex justify-content-center">
        <div class="card-header d-flex">
          <Avatar
            v-if="post.owner.avatar == 'null'"
            :src="'/user-circle-solid.svg'"
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
        <div class="form-floating">
          <textarea
            class="form-control"
            id="floatingTextarea"
            v-model="post.content"
          ></textarea>
          <label for="floatingTextarea">Modifiez le contenu :</label>
        </div>
        <div>
          <PostImage v-if="post.image == 'null'" class="post-image" />
          <PostImage v-else :src="post.image" alt="Image de la publication" />
          <div id="preview" class="post-image img-fluid">
            <img
              v-if="imagePreview"
              :src="imagePreview"
              class="post-image img-fluid"
              alt="Prévisualisation de l'image ajoutée au message"
            />
          </div>
        </div>

        <div class="container my-3">
          <div class="row justify-content-center">
            <button
              @click="uploadFile"
              type="button"
              class="btn btn-outline-secondary mb-3 mx-2 col-12 col-sm-6"
            >
              <i class="far fa-edit"></i> Modifier l'image
            </button>

            <input
              class="d-none"
              type="file"
              ref="fileUpload"
              @change="onFileSelected"
              accept="image/*"
              id="file-input"
              aria-label="Modifier l'image du post"
            />
            <button
              @click="updatePostImage"
              class="btn btn-success mb-3 mx-2 col-12 col-sm-6"
            >
              Enregister <i class="fas fa-check"></i>
            </button>

            <router-link
              :to="'/post/'"
              aria-label="Revenir aux publications"
              class="btn btn-danger mx-2 col-12 col-sm-6"
              ><i class="fas fa-arrow-circle-left"></i></router-link>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostImage from "../components/PostImage.vue";
import Avatar from "../components/Avatar.vue";

import moment from "moment";
import axios from "axios";
import Navbar from "../components/Navbar.vue";
export default {
  name: "OnePost",
  components: {
    Navbar,
    Avatar,
    PostImage,
  },

  inject: ["notyf"],

  data() {
    return {
      userName: localStorage.getItem("userName"),
      isAdmin: localStorage.getItem("isAdmin"),
      content: null,
      imagePreview: null,
      post: null,
    };
  },
  created() {
    this.fetchOnePost();
  },
  methods: {
    // date and time
    dateFormat(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/YYYY à hh:mm");
      }
    },

    //Display Post informations
    displayPost() {
      console.log(this.post.content);
      console.log(this.post.image);
      console.log(this.post.owner.avatar);
    },

    // To change post image
    uploadFile() {
      this.$refs.fileUpload.click();
    },

    onFileSelected(event) {
      this.post.image = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.post.image);
    },

    updatePostImage() {
      const formData = new FormData();
      formData.append("image", this.post.image);
      formData.append("content", this.post.content);
      axios
        .patch(
          "http://localhost:3000/api/post/" + this.$route.params.id,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          this.notyf.success("Votre publication a bien été modifiée !");
          this.fetchOnePost();
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },

    //Reset preview
    resetPreview() {
      this.imagePreview = null;
    },

    //Fetch the post to be modified from API
    fetchOnePost() {
      axios
        .get("http://localhost:3000/api/post/" + this.$route.params.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.post = response.data;
          this.resetPreview();
          this.displayPost();
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>