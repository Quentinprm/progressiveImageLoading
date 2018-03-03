<template>
  <div class="hello">
  	<img v-bind:src="imgEnCours" @load="onLoad"/>
  </div>
</template>

<script>
export default {
  name: 'PilImage',
  data () {
    return {
    	imgEnCours: '',
    	imgHigh: ''
    }
  },
  mounted(){
	fetch('http://localhost/html/progressiveImageLoading/exemple/back-end/test.php', {
	        method: 'GET'
	}).then((resp) => resp.json())
	.then((data) => { 
		this.imgEnCours = data.imgLow;
		this.imgHigh = data.imgHigh;
	})
	.catch((err)=>console.error(err))
  },
  methods: {
  	onLoad(){
  		this.imgEnCours = this.imgHigh;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>