<template>
  <div class="post-image img-fluid">
    <img :src="src || ''" class="post-image img-fluid" />
  </div>
</template>


<script>
export default {
  name: "PostImage",
  props: ["src"],
};
</script>


<style lang="scss">
.post-image {
  object-fit: cover;
}
</style>