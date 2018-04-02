<template>
  <div>
    <img v-bind:class="{ hidden: hiddenImg, deterioratedImg }" v-bind:src="deterioratedImg" @load="onLoadLow"/>
    <img v-bind:class="{ hidden: !hiddenImg }" v-bind:src="naturalImg" @load="onLoadHigh"/>
  </div>
</template>

<script>
export default {
  name: 'progressiveImageLoading',
  props : ['src'],
  data () {
    return {
      deterioratedImg: '',
      naturalImg : '',
      hiddenImg: false
    }
  },
  methods: {
    onLoadLow(){
      this.naturalImg = this.src;
    },
    onLoadHigh(){
      this.hiddenImg = true;
    }
  },
  created(){
    //We are looking for the /upload/ inside the URL to get the path and insert a parameter
    let splitUrl = this.src.split('/upload/');

    let urlRecreate = false;

    if(splitUrl[0] !== null && splitUrl[0] !== ''){
      //We are keeping what's before and after the /upload/
      let before = splitUrl['0'];
      let after = '';
      
      if(splitUrl[1] !== null && splitUrl[1] !== ''){
        after = splitUrl[1];

        //We are recreating the URL
        this.deterioratedImg = before + '/upload/q_1/' + after;
        urlRecreate = true;
      }
    }

    //If we didn't succeed to recreate the link, we just put the normal link
    if(!urlRecreate){
      this.naturalImg = this.src;
      this.hiddenImg = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  position:relative;
  width: 100%;
  max-width: 100%;
  height:100%;
  max-height:100%;
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

.deterioratedImg{
  filter: blur(10px);
}

.hidden{
  opacity:0;   
}
</style>