<template>
  <div>
  	<img v-bind:class="{ hidden: imgLowHidden }"
  		v-bind:src="imgLow" @load="onLoadLow"/>
  	<img v-bind:class="{ hidden: !imgLowHidden }"
  		v-bind:src="imghighAfficher" @load="onLoadHigh"/>
  </div>
</template>

<script>
export default {
  name: 'PilImage',
  props : ['imgLow', 'imgHigh'],
  data () {
    return {
    	imgEnCours: '',
    	imghighAfficher : '',
    	imgLowHidden: false
    }
  },
  mounted(){
	this.imgEnCours = this.imgLow;
  },
  methods: {
  	onLoadLow(){
  		this.imghighAfficher = this.imgHigh;
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
	margin:2.5%;
	margin-top:10px;
	margin-bottom:10px;
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