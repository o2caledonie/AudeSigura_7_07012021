<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light nav">
      <img
        class="nav__logo"
        src="../assets/logo-long.png"
        alt="Logo de Groupomania"
      />

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        id="navbarContent"
        class="collapse navbar-collapse justify-content-end"
      >
        <ul class="navbar-nav nav__links">
          <li class="nav-item">
            <router-link to="/post" class="nav__links__link"
              >Publications</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/profile" class="nav__links__link"
              >Mon profil</router-link
            >
          </li>

          <li class="nav-item">
            <ModaleLogout :revele="revele" :displayModale="displayModale" />
            <button @click="displayModale" class="nav__links__logoutLink">
              Déconnexion <i class="fas fa-sign-out-alt"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import ModaleLogout from "@/components/ModaleLogout.vue";
export default {
  name: "Navbar",
  data() {
    return {
      revele: false,
    };
  },
  components: {
    ModaleLogout,
  },
  methods: {
    // Modal box to disconnect
    displayModale() {
      this.revele = !this.revele;
    },
  },
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  box-shadow: 0px 5px 15px #3f3d56;
  &__logo {
    display: flex;
    justify-content: flex-start;
    max-width: 250px;
    width: 50%;
  }
  &__menuButton:hover,
  &__menuButton:focus {
    color: #FD2D01;
  }
  a,
  button {
    font-weight: bold;
    color: #3f3d56;
    &:hover,
    &:focus {
      color: #FD2D01;
    }
  }
  &__links {
    padding: 2rem;
    align-items: flex-end;
    @media (max-width: 776px) {
      padding: 0;
    }
    &__link {
      padding-right: 4rem;
      text-decoration: none;
      align-items: flex-end;
      @media (max-width: 990px) {
        padding: 0;
      }
    }
    &__logoutLink {
      border: none;
      background-color: white;
      &:hover,
      &:focus {
        color: #FD2D01;
      }
      @media (max-width: 990px) {
        padding-right: 0;
      }
    }
  }
}
</style>