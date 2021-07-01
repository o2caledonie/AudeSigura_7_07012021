<template>
  <button
    type="submit"
    v-if="userId == post.ownerId || isAdmin == 'true'"
    class="btn btn-outline-danger"
    aria-label="Modifier le message"
  >
    <router-link :to="'/post/' + post.id" class="post-page"
      ><i class="fas fa-pencil-alt"></i
    ></router-link>
  </button>
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