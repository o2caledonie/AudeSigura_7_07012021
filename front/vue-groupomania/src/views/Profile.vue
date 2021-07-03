<template>
  <div>
    <Navbar />

    <h1 class="my-4 fw-bold" v-if="user">Bienvenue {{ user.userName }} !</h1>
    <div class="card bg-light_newPost border-3 rounded my-4 mx-auto p-3">
      <div class="card-body">
        <h2 class="card-title fw-bold text-light">Mon profil</h2>

        <div class="user-avatar">
          <ProfileImage :src="user.avatar" class="profile__photo__image" />

          <div class="form-floating my-3">
            <button
              @click="uploadFile"
              type="button"
              class="btn btn-outline-light border-3  mx-auto mb-3 col-8 col-sm-4"
            >
              <i class="far fa-edit"></i> Modifier ma photo de profil
            </button>

            <input
              type="file"
              ref="fileUpload"
              @change="onFileSelected"
              accept="image/*"
              id="file-input"
              aria-labelledby="Modifier ma photo de profil"
              class="d-none"
            />
          </div>
        </div>

        <div class="profile__info">
          <div class="row my-3">
          <h3 class="fs-3">Pseudo</h3>
          <span class="badge rounded-pill fs-4 bg-light text-dark">{{ user.userName }}</span>
          </div>
          <div class="row my-3">
          <h3 class="fs-3">Email</h3>
          <span class="badge rounded-pill fs-4 bg-light text-dark">{{ user.email }}</span>
          </div>
        </div>

        <button @click="modifyProfile" class="btn btn-dark border-2 mx-auto my-3 col-10 col-sm-6">
          Enregister <i class="fas fa-check"></i>
        </button>
      </div>

      <ModaleDeleteAccount :revele="revele" :displayModale="displayModale" />
      <button class="btn btn-danger rounded col-6 mx-auto" @click="displayModale">
        Supprimer mon compte <i class="far fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import ModaleDeleteAccount from "@/components/ModaleDeleteAccount.vue";
import ProfileImage from "../components/ProfileImage.vue";
export default {
  name: "Profile",
  components: {
    Navbar,
    ModaleDeleteAccount,
    ProfileImage,
  },
  inject: ["notyf"],
  data() {
    return {
      revele: false,
      user: "",
      avatar: null,
    };
  },
  created() {
    this.displayProfile();
  },
  methods: {
    // fetch User informations
    displayProfile() {
      const userId = localStorage.getItem("userId");
      console.log(localStorage.getItem("token"));
      axios
        .get("http://localhost:3000/api/user/" + userId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.user = response.data;
          localStorage.setItem("avatar", response.data.avatar);
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },
    // To change profil picture
    uploadFile() {
      this.$refs.fileUpload.click();
    },
    onFileSelected(event) {
      this.avatar = event.target.files[0];
    },
    modifyProfile() {
      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("image", this.avatar);
      axios
        .patch("http://localhost:3000/api/user/" + userId, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.notyf.success("Votre profil a bien été modifié !");
          this.displayProfile();
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },
    // Display Modale to delete account
    displayModale() {
      this.revele = !this.revele;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  &.bg-light {
    &_newPost {
      max-width: 500px;
      background-image: linear-gradient(#192b48, #fff);
    }
  }
 
}
.rounded {
  @media (min-width: 500px) {
    border-radius: 1.5rem !important;
  }
}

.form-control {
  &:focus,
  &:hover {
    border-color: #000;
    box-shadow: 0 0 0.2em 0.2em #000;
  }
}

.btn-dark {
  transform: scale(1);
  transition: transform 200ms ease-in-out !important;
  &:focus,
  &:hover {
    font-weight: bold;
    color:#192b48;
    background-color: #fff;
    border-color: #fd2d01;
    box-shadow: 0 0 0.2em 0.2em #fd2d01;
    transform: scale(1.1);
  }
}

</style>