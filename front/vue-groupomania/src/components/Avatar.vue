<template>
	<span class="avatar">
		<img :src="src || 'user-circle-solid.svg'" class="avatar" alt="avatar"/>
	</span>
</template>


<script>
	export default {
		name: 'Avatar',
		props: ['src']
	}
</script>


<style lang="scss">
	.avatar {
		object-fit: cover;
		width: 2rem;
		height: 2rem;
		border-radius: 100%;
	}
</style>