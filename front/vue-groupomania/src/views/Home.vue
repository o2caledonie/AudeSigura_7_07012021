<template>
  <div class="home">
    <img
      class="home__logo"
      src="../assets/logo-long.png"
      alt="Logo de Groupomania"
    />

    <div class="home__login">
      <form @submit.prevent="login" class="home__login__form">
        <h4 class="home__login__form__title">Se connecter</h4>

        <div class="home__login__form__input">
          <label for="mail" class="home__login__form__input__label"
            >Email</label
          >
          <input
            type="email"
            class="form-control"
            placeholder="Votre adresse email"
            v-model="email"
            id="email"
            name="email"
            autocomplete="username"
          />
        </div>

        <div class="home__login__form__input">
          <label for="password" class="home__login__form__input__label"
            >Mot de passe</label
          >
          <input
            type="password"
            class="form-control"
            placeholder="Votre mot de passe"
            v-model="password"
            id="password"
            name="password"
            autocomplete="current-password"
          />
        </div>

        <button type="submit" class="home__login__form__button">
          Connexion
        </button>

        <p>
          Vous n'avez pas encore de compte ?
          <router-link to="/signup" class="home__login__form__signup"
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
  &__logo {
    @media (max-width: 930px) {
      max-width: 300px;
      width: 90%;
      margin-top: 3rem;
    }
  }
  &__login {
    margin-top: 3rem;
    display: flex;
    justify-content: space-around;
    @media (max-width: 930px) {
      display: flex;
      flex-direction: column-reverse;
    }
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 500px;
      width: 90%;
      border: 3px solid #FD2D01;
      border-radius: 25px;
      margin-top: 2rem;
      margin-left: -2rem;
      padding: 1rem;
      @media (max-width: 930px) {
        min-width: 250px;
        margin: auto;
      }
      &__title {
        margin-bottom: 3rem;
        font-size: 27px;
      }
      &__input {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        width: 70%;
        &__label {
          text-align: start;
          font-weight: bolder;
        }
      }
      &__button {
        border: 3px solid #3f3d56;
        border-radius: 25px;
        color: #3f3d56;
        font-size: 15px;
        font-weight: bold;
        padding: 0.9rem;
        margin: 1rem;
        outline-style: none;
        &:hover,
        &:focus {
          border: 3px solid #ff6363;
          color: #ff6363;
          cursor: pointer;
        }
      }
      &__signup {
        font-weight: bold;
        text-decoration: none;
        color: #e60a0a;
        // color: #ff6363;
      }
    }
  }
}
</style>