<template>
  <div>
  	<img v-bind:class="{ hidden: imgLowHidden }" v-bind:src="imgLow" @load="onLoadLow"/>
  	<img v-bind:class="{ hidden: !imgLowHidden }" v-bind:src="imgHighAfficher" @load="onLoadHigh"/>
  </div>
</template>

<script>
export default {
  name: 'progressiveImageLoading',
  props : ['imgLow', 'imgHigh'],
  data () {
    return {
    	imgHighAfficher : '',
    	imgLowHidden: false
    }
  },
  methods: {
  	onLoadLow(){
  		this.imgHighAfficher = this.imgHigh;
  	},
  	onLoadHigh(){
  		this.imgLowHidden = true;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
	position:relative;
	width: 20%;
	max-width: 20%;
	height:200px;
	max-height:200px;
	margin: 10px 2.5% 10px 2.5%;
}

img{
	width:100%;
	height:100%;
	max-width: 100%;
  max-height: 100%;
  position:absolute;
  left:0;
  opacity:1;
  transition:opacity 0.5s linear;
}

.hidden{
 opacity:0;   
}
</style>