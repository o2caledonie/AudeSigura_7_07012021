<template>
  <router-link
    :to="'/post/' + post.id"
    aria-label="Modifier le message"
    v-if="userId == post.ownerId || isAdmin == 'true'"
    class="btn btn-outline-dark border-2"
    >Modifier<i class="fas fa-pencil-alt"></i
  ></router-link>
</template>

<script>
export default {
  name: "UpdatePostBtn",
  components: {},
  props: {
    post: { type: Object },
  },
  inject: ["notyf"],
  data() {
    return {
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.btn-outline-dark {
  transform: scale(1);
  transition: transform 200ms ease-in-out !important;
  &:focus,
  &:hover {
    font-weight: bold;
    border-color: #192b48;
    transform: scale(1.2);
  }
}
</style>
