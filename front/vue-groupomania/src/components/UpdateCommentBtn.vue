<template>
  <div>
    <button
      type="submit"
      v-if="userId == comment.ownerId || isAdmin == 'true'"
      data-bs-toggle="modal"
      :data-bs-target="'#modale-' + idModale"
      class="btn btn-danger"
      aria-label="Modifier le commentaire"
    >
      Modifier<i class="fas fa-pencil-alt"></i>
    </button>
    <div
      class="modal fade"
      :id="'modale-' + idModale"
      tabindex="-1"
      aria-labelledby="Modifier le commentaire"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Modifier le commentaire
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="message-text" class="col-form-label"
                  >Commentaire:</label
                >
                <textarea
                  class="form-control"
                  id="message-text"
                  v-model="newContent"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              aria-label="Publier le commentaire modifié"
              v-on:click="updateComment(comment.id)"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateCommentBtn",
  components: {},
  props: {
    comment: { type: Object },
  },
  inject: ["notyf"],
  data() {
    console.log(this.comment);
    return {
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
      newContent: this.comment.content,
      idModale: this.comment.id,
    };
  },
  methods: {
    //Delete comment

    updateComment(id) {
      if (!window.confirm("Modifier le commentaire ?")) {
        return;
      }
      const commentId = id;
      axios
        .patch("http://localhost:3000/api/comment/" + commentId, 
        {content:this.newContent}, 
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.notyf.success("Votre commentaire a bien été modifié !");
          this.$emit("comment-updated");
        })
        .catch((error) => {
          const msgerror = error.response.data;
          this.notyf.error(msgerror.error);
        });
    },
  },
};
</script>