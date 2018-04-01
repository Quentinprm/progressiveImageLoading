<template>
  <upload apiKey="cKFyD6n8fpOFOkOzCUr70DZOfl1y2LchHiaJJ8bAeLMs6X2xURfXoAdOzXWn4ab1"></upload>
</template>

<script>
  import Upload from './Upload.vue'

  export default {
      components:{
        'upload':Upload,
      }
  }
</script>

<style>
  * {
    border-radius: 0 !important;
  }

  #right {
    margin-left: 20px;
  }

  .danger {
    color: red;
    margin-top: 5px;
  }
</style>
