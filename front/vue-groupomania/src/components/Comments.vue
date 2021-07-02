<template>
  <div>
    <form @submit.prevent="createComment" aria-label="Nouveau message">
      <div class="newComment__content d-flex">
        <textarea
          v-model="content"
          class="form-control"
          name="message"
          id="message"
          placeholder="Rédigez votre commentaire ici ..."
          aria-label="Rédiger un nouveau commentaire"
        />
        <button
          type="submit"
          class="btn btn-danger me-md-2 "
          aria-label="Publier le message"
        >
        <i class="fas fa-check-circle"></i>
        </button>
      </div>
    </form>

    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="buildAccordionIdSelector(post)"
            aria-expanded="false"
            :aria-controls="buildAccordionId(post)"
          >
            Voir les commentaires
            <i class="far fa-comments mx-2"></i>
          </button>
        </h2>

        <div
          :id="buildAccordionId(post)"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
          ref="accordionContent"
        >
          <div class="accordion-body">
            <CommentsList :post="post" :comments="comments" v-if="showComments" @comment-deleted="fetchComments" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentsList from "../components/CommentsList.vue";

export default {
  name: "Comments",
  components: {
    CommentsList,
  },
  props: {
    post: { type: Object },
  },
  inject: ['notyf'],

  data() {
    return {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      isAdmin: localStorage.getItem("isAdmin"),
      imageProfile: localStorage.getItem("imageProfile"),
      posts: [],
      comments: [],
      showComments: false,
      content: '',
    };
  },
  mounted() {
    this.$refs['accordionContent'].addEventListener('show.bs.collapse', () => {
        this.showComments = true;
    });
    this.$refs['accordionContent'].addEventListener('hidden.bs.collapse', () => {
        this.showComments = false;
    });
    this.fetchComments();
  },
  methods: {
    resetForm() {
      this.content = "";
    },

    createComment() {
      const postId = this.post.id;
      console.log(this.content);
      const contentComment = { content: this.content };

      axios
        .post("http://localhost:3000/api/comment/" + postId, contentComment, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.notyf.success("Votre commentaire a bien été créé !");
          this.resetForm();
          this.fetchComments();
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },

    fetchComments() {
      const postId = this.post.id;
      console.log(this.post.id);
      axios
        .get("http://localhost:3000/api/comment/" + postId, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.comments = response.data;
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },

    buildAccordionId(post) {
      return `postAccordionComments-${post.id}`;
    },

    buildAccordionIdSelector(post) {
      return `#${this.buildAccordionId(post)}`;
    },
  },
};
</script>

<style lang="scss">
.btn {
  font-size: 0.9em;
  font-weight: bold;
}
.form-control {
  font-size: 0.8em;
  font-weight: bold;
}
.accordion-button {
  font-size: 0.6em;
}
</style>