<template>
	<div>
	  	<pil :src = "src">	
	  	</pil>
	</div>
</template>

<script>
export default {
  name: 'SingleImage',
  props: ['src'],
  data () {
    return {
    }
  },
  components : {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  min-width: 100%;
  max-height:100%;
  height:100vh;
}
</style>
