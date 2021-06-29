<template>
  <div>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="..."
        aria-label="écrivez votre commentaire"
        aria-describedby="écrire un commentaire"
      />
      <button class="btn btn-outline-danger" type="button" id="button-addon2">
        Commenter
      </button>
    </div>

    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Voir les commentaires
            <i class="far fa-comment-dots mx-2"></i>
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
              <CommentsList/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import moment from "moment";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import CommentsList from "../components/CommentsList.vue";

export default {
  name: "Comments",
  components: {
    CommentsList
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      isAdmin: localStorage.getItem("isAdmin"),
      imageProfile: localStorage.getItem("imageProfile"),
      posts: [],
      post: "",
      imagePost: "",
      imagePreview: null,
      content: "",
      contentmodifyPost: "",
      comments: [],
      contentComment: "",
      revele: false,
      showComment: false,
      showCreateComment: false,
      showInputModify: false,
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
    
    // Display publication date and time
    dateFormat(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/YYYY à hh:mm");
      }
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