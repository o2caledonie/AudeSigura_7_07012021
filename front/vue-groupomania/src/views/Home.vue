<template>
  <div class="container mx-auto p-3">
    <img
      class="img-fluid"
      src="../assets/logo-groupomania.png"
      alt="Logo Groupomania"
    />

    <div class="card home shadow mx-auto my-2 p-3">
      <form @submit.prevent="login" class="card-body">
        <h1 class="card-title fw-bold">Se connecter</h1>
        <p class="form-text">*Tous les champs sont obligatoires</p>

        <div class="row mb-3 param">
          <label for="mail" class="form-label fw-bold">Email</label>
          <input
            type="email"
            class="form-control mx-auto"
            placeholder="Votre adresse email"
            v-model="email"
            id="email"
            name="email"
            autocomplete="username"
            required
          />
        </div>

        <div class="row mb-3 param">
          <label for="password" class="form-label fw-bold">Mot de passe</label>
          <input
            type="password"
            class="form-control mx-auto"
            placeholder="Votre mot de passe"
            v-model="password"
            id="password"
            name="password"
            autocomplete="current-password"
            required
          />
        </div>

        <button type="submit" class="btn btn-outline-danger fw-bold login my-3">
          Connexion
        </button>

        <p>
          Vous n'avez pas encore de compte ?
          <router-link to="/signup" class="subscribe-link"
            >S'inscrire</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  inject: ["notyf"],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {},
  methods: {
    //Login
    login() {
      axios
        .post("http://localhost:3000/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("userName", response.data.userName);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          localStorage.setItem("avatar", response.data.avatar);
          this.$router.push("post");
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
.home {
    max-width: 800px;
    .img-fluid{
      max-width: 75%;
    }
    .param {
      .form-control {
        max-width: 400px;
        &:focus,
        &:hover {
          border-color: #fd2d01;
          box-shadow: 0 0 0.2em 0.2em #fd2d01;
        }
      }
    }
    .login {
      border: 0.2em solid #fd2d01;
      transform: scale(1);
      transition: transform 200ms ease-in-out !important;
      &:hover {
        border-color: #fd2d01;
        box-shadow: 0 0 0em 0em #fd2d01;
        transform: scale(1.2);
      }
    }
    .subscribe-link {
      color: #fd2d01;
      &:focus,
      &:hover {
        font-weight: bold;
      }
    }
  }

</style>