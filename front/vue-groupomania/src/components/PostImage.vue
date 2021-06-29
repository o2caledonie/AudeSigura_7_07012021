<template>
	<div class="post-image">
		<img :src="src || ''" class="post-image" />
	</div>
</template>


<script>
	export default {
		name: 'PostImage',
		props: ['src']
	}
</script>


<style lang="scss">
	.post-image {
		object-fit: cover;
       
	}
</style>