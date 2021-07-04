<template>
  <div class="container mx-auto p-3">
    <img
      class="img-fluid"
      src="../assets/logo-groupomania.png"
      alt="Logo Groupomania"
    />

    <div class="card home shadow mx-auto my-2 p-3">
      <form @submit.prevent="signup" class="card-body">
        <h1 class="card-title fw-bold">S'inscrire</h1>
        <p class="form-text">*Tous les champs sont obligatoires</p>

        <div class="row mb-3 param">
          <label for="username" class="form-label fw-bold">Pseudo</label>
          <input
            class="form-control mx-auto"
            type="text"
            v-model="userName"
            id="username"
            name="username"
            autocomplete="username"
            minlength="3"
            maxlength="25"
            title="3 à 25 caractères"
            aria-describedby="usernameHelp"
            required
          />
        </div>

        <div class="row mb-3 param">
          <label for="mail" class="form-label fw-bold">Email</label>
          <input
            class="form-control mx-auto"
            type="email"
            v-model="email"
            id="mail"
            name="mail"
            autocomplete="username"
            required
          />
        </div>

        <div class="row mb-3 param">
          <label for="password" class="form-label fw-bold">Mot de passe</label>
          <input
            class="form-control mx-auto"
            type="password"
            v-model="password"
            id="password"
            name="password"
            autocomplete="current-password"
            pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
            title="minimum 8 caractères avec au minimum une minuscule et une majuscule, un chiffre et un caractère spécial !@#$%^&*"
            required
          />
        </div>

        <button class="btn btn-outline-danger fw-bold subscribe my-3">
          Inscription
        </button>

        <p>
          Vous avez déjà un compte ?
          <router-link to="/" class="login-link">Se connecter</router-link>
        </p>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Signup",
  inject: ["notyf"],
  data() {
    return {
      userName: "",
      email: "",
      password: "",
    };
  },
  created() {},
  methods: {
    // Sign up
    signup() {
      axios
        .post("http://localhost:3000/api/user/signup", {
          userName: this.userName,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.notyf.success(
            "Votre compte a bien été créé ! A présent, veuillez vous connecter."
          );
          this.$router.push("/");
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
    .subscribe {
      border: 0.2em solid #fd2d01;
      transform: scale(1);
      transition: transform 200ms ease-in-out !important;
      &:hover {
        border-color: #fd2d01;
        box-shadow: 0 0 0em 0em #fd2d01;
        transform: scale(1.2);
      }
    }
    .login-link {
      color: #fd2d01;
      &:focus,
      &:hover {
        font-weight: bold;
      }
    }
  }

</style>