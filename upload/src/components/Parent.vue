<template>
  <upload apiKey="dqshkqlsdhk"></upload>
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
