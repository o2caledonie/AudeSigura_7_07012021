<template>
  
    <router-link
      :to="'/post/' + post.id"
      aria-label="Modifier le message"
      v-if="userId == post.ownerId || isAdmin == 'true'"
      class="btn btn-outline-danger"
      ><i class="fas fa-pencil-alt"></i
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