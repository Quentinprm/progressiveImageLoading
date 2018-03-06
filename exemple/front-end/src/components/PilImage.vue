<template>
  <div>
  	<img v-bind:src="imgEnCours" @load="onLoad"/>
  </div>
</template>

<script>
export default {
  name: 'PilImage',
  props : ['imgLow', 'imgHigh'],
  data () {
    return {
    	imgEnCours: ''
    }
  },
  mounted(){
	this.imgEnCours = this.imgLow;
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
div{
	width: 20%;
	max-width: 20%;
	max-height:200px;
	margin:2.5%;
	margin-top:10px;
	margin-bottom:10px;
}

img{
	width:100%;
	height:100%;
	max-width: 100%;
    max-height: 100%;
}
</style>