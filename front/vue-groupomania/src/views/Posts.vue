  
<template>  
    <div id="posts">
        <Navbar/>
        <div class="newPost mt-5 mx-auto p-3">
            <p>Bonjour, {{ userName }} !</p>
            <div class="newPost__photo">
                <ProfileImage v-if="avatar == 'null'" :src="'user-circle-solid.svg'" class="newPost__photo"/>
                <ProfileImage v-else :src="avatar" class="newPost__photo"/>
            </div>

            <form @submit.prevent="createPost" aria-label="Nouveau message">
                <div class="newPost__content">
                    <textarea v-model="content" class="newPost__content__text" name="message" id="message" placeholder="Quoi de neuf ?" aria-label="Rédiger un nouveau message"/>    
                    
                    <div id="preview" style="display:block">
                        <img v-if="imagePreview" :src="imagePreview" id="preview" style="display:block" class="newPost__content__image" alt="Prévisualisation de l'image ajoutée au message"/>
                    </div>        
                </div>

                <div class="newPost__option">
                    <div class="newPost__option__file">
                    <button @click="uploadFile" type="button" class="newPost__option__file__btnInvisible"><i class="far fa-images fa-2x"></i> Choisir un fichier</button>
                    
                        <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" aria-label="Sélectionner un fichier">
                    </div>
                    
                    <button type="submit" class="newPost__option__button" aria-label="Publier le message">Publier <i class="far fa-paper-plane"></i></button>
                </div>
            </form>
        </div>

        <div class="mt-4">
            <h1>Publications</h1>
            <PostsList/>
        </div>
        <router-view/>
    </div>
</template>



<script>
    import axios from 'axios'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'
    import PostsList from '../components/PostsList.vue'
    import Navbar from '../components/Navbar.vue'
    import ProfileImage from '../components/ProfileImage.vue'
    export default {
        name: 'Posts',
        components: {
            Navbar,
            ProfileImage,
            PostsList,
        },
        data() {
            return {
                userId: localStorage.getItem('userId'),
                userName: localStorage.getItem('userName'),
                isAdmin: localStorage.getItem('isAdmin'),
                avatar: localStorage.getItem('avatar'),
                post: '',
                image: '',
                imagePreview: null,
                content: '',
                contentmodifyPost: '',
                revele: false,
                showInputModify: false,
            }
        },
        created() {
            this.notyf = new Notyf({
                duration: 4000,
                position: {
                    x: 'center',
                    y: 'top'
                }
            });
        },  
        methods: {
            // Create a new post
            uploadFile() {
                this.$refs.fileUpload.click()
            },
            onFileSelected(event) {
                this.image = event.target.files[0];
                this.imagePreview = URL.createObjectURL(this.image);
            },      
            createPost() {
                const formData = new FormData();
                formData.append("content", this.content);
                formData.append("image", this.image);
                axios.post('http://localhost:3000/api/post', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    this.notyf.success('Votre publication a bien été créée !')
                    window.location.reload()
                })
                .catch(error => {
                    const msgerror = error.response.data;
                    this.notyf.error(msgerror.error)
                    
                })
            },
            
            
        }
    }
</script>


<style scoped lang="scss">

    .newPost {
        background: #ffb1b1;
        border-radius: 25px;
        width: 50%;
        @media (max-width: 950px) {
            width: 60%;
        }
        @media (max-width: 768px) {
            width: 70%;
        }
        @media (max-width: 550px) {
            width: 80%;
        }
        @media (max-width: 450px) {
            width: 90%;
        }
        &__photo__image {
            width: 47px;
        }
        &__content__text {
            border-radius: 0 15px;
            border: none;
            margin: 1.5rem 0 0 0;
            max-width: 50rem;
            width: 90%;
            min-height: 5rem;
        }
        &__content__image {
            max-width: 50rem;
            width: 90%;
            height: 274px;
            margin: 1rem auto;
            object-fit: cover;
        }
        &__option {
            display: flex;
            justify-content: space-around;
            align-items: center;
            &__file>input {
                display: none; 
            }
            &__file {
                &__btnInvisible {
                    display: flex;
                    align-items: center;
                    color: #3f3d56;
                    border: none;
                    background-color: #ffb1b1;
                    &:hover, &:focus {
                        color: white;
                    }
                }
            }
            &__button {
                border: 2px solid #3f3d56;
                border-radius: 25px;
                color: #3f3d56;
                font-size: 15px;
                font-weight: bold;
                padding: 0.4rem;
                margin: 1rem;
                outline-style: none;
                &:hover, &:focus {
                    color: #ff6363;
                }
            }
            
        }
    }
</style>