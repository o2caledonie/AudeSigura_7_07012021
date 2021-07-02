<template>
    <div class="container mx-auto p-3">
        <img class="img-fluid" src="../assets/logo-long.png" alt="Logo Groupomania">

        <div class="card shadow my-4 p-3">
           
            <form @submit.prevent="signup" class="card-body">
                <h1 class="card-title">S'inscrire</h1>
                <p class="form-text">*Tous les champs sont obligatoires</p>

                <div class="row mb-3">
                    <label for="username" class="form-label">Pseudo</label>
                    <input type="text" v-model="userName" id="username" name="username" attribute="username" pattern="{3,25}" title="3 à 25 caractères" aria-describedby="usernameHelp" required>
                </div>

                <div class="row mb-3">
                    <label for="mail" class="form-label">Email</label>
                    <input type="email" v-model="email" id="mail" name="mail" attribute="username" required>
                </div>

                <div class="row mb-3">
                    <label for="password" class="form-label">Mot de passe</label>
                    <input type="password" v-model="password" id="password" name="password" attribute="current-password" pattern="{(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$}" required>
                    
                </div>

                <button class="btn btn-outline-danger mb-2">Inscription</button>

                <p>Vous avez déjà un compte ? <router-link to="/" class="home__display__form__login">Se connecter</router-link></p>
            </form>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    export default {
        name: 'Signup',
        inject: ['notyf'],
        data() {
            return {
                userName: '',
                email: '',
                password: '',
            }
        },
        created() {
        },
        methods: {
            // Sign up 
            signup() {
                axios.post('http://localhost:3000/api/user/signup', {
                    userName: this.userName,
                    email: this.email,
                    password: this.password,
                })
                .then(() => {
                    this.notyf.success('Votre compte a bien été créé ! A présent, veuillez vous connecter.')
                    this.$router.push('/');
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },
        }
    }
</script>


<style scoped lang="scss">
// .home {
//         &__title {
//             @media (max-width: 930px) {
//                 max-width: 400px;
//                 width: 90%;
//             }
//         }
//         &__display {
//             margin-top: 2rem;
//             display: flex;
//             justify-content: space-around;
//             @media (max-width: 930px) {
//                 display: flex;
//                 flex-direction: column-reverse;
//             }
//             &__picture {
//                 float: left;
//                 padding-top: 5rem;
//                 margin-left: 3rem;
//                 @media (max-width: 1170px) {
//                     max-width: 350px;
//                 }
//                 @media (max-width: 930px) {
//                     max-width: 250px;
//                     margin: auto;
//                     padding-top: 2rem;
//                 } 
//             }
           
//             &__form {
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 width: 90%;
//                 border: 3px solid #FD2D01;
//                 border-radius: 25px;
//                 margin-top: 2rem;
//                 margin-left: -2rem;
//                 padding: 1rem;
//                 @media (max-width: 930px) {
//                     min-width: 250px;
//                     margin: auto;
//                 }
//                 &__title {
//                     margin-bottom: 3rem;
//                     font-size: 27px;
//                 }
//                 &__input {
//                     display: flex;
//                     flex-direction: column;
//                     margin-bottom: 2rem;
//                     width: 70%;
//                     &__label {
//                         text-align: start;
//                         font-weight: bolder; 
//                     }
//                 }
//                 &__button {
//                     border: 3px solid #3f3d56;
//                     border-radius: 25px;
//                     color: #3f3d56;
//                     font-size: 15px;
//                     font-weight: bold;
//                     padding: 0.9rem;
//                     margin: 1rem;
//                     outline-style: none;
//                     &:hover, &:focus {
//                         border: 3px solid #ff6363;
//                         color: #ff6363;
//                         cursor: pointer;
//                     }
//                 }
//                 &__login {
//                     font-weight: bold;
//                     text-decoration: none;
//                     color: #E60A0A;
//                     // color: #ff6363;
//                 }
//             }
//         }
//     }
</style>