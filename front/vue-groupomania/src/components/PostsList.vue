<template>
    <div id="posts-list">
        <div class="displayPosts" v-for="post in posts" :key="post.postId">
        </div>
    </div>    
</template>

<script>
export default {
    name: 'PostsList',    
}
</script>

<style scoped>

</style>