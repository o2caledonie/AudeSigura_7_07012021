<template>
	<div class="newPost__photo">
		<img :src="src || 'user-circle-solid.png'" class="image" alt="Photo de profil"/>
	</div>
</template>


<script>
	export default {
		name: 'ProfileImage',
		props: ['src']
	}
</script>


<style lang="scss">
	.image {
		object-fit: cover;
		width: 6rem;
		height: 6rem;
		border-radius: 100%;
	}
</style>