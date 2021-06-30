<template>
  <div>

    <form @submit.prevent="createComment" aria-label="Nouveau message">
      <div class="newComment__content">
        <textarea
          v-model="content"
          class="form-control"
          name="message"
          id="message"
          placeholder="Ecrivez votre commentaire ..."
          aria-label="Rédiger un nouveau commentaire"
        />
        <button
          type="submit"
          class="btn btn-outline-danger"
          aria-label="Publier le message"
        >
          Commenter <i class="far fa-paper-plane"></i>
        </button>
      </div>
    </form>

    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            @click="showComments = !showComments"
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="buildAccordionIdSelector(post)"
            aria-expanded="false"
            :aria-controls="buildAccordionId(post)"
          >
            Voir les commentaires
            <i class="far fa-comment-dots mx-2"></i>
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
            <CommentsList :post="post" v-if="showComments" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import CommentsList from "../components/CommentsList.vue";

export default {
  name: "Comments",
  components: {
    CommentsList,
  },
  props: {
    post: { type: Object },
  },

  data() {
    return {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      isAdmin: localStorage.getItem("isAdmin"),
      imageProfile: localStorage.getItem("imageProfile"),
      posts: [],
      imagePost: "",
      imagePreview: null,
      content: "",
      contentmodifyPost: "",
      comments: [],
      contentComment: "",
      revele: false,
      showCreateComment: false,
      showInputModify: false,
      showComments: false,
    };
  },
  created() {
    this.notyf = new Notyf({
      duration: 2000,
      position: {
        x: "center",
        y: "top",
      },
    });
  },
  methods: {

     
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
          this.notyf.success("Votre publication a bien été créée !");
    
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