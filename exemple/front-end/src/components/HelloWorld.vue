<template>
  <div class="hello">
    <PilImage imgLow = "https://vignette.wikia.nocookie.net/starcitizen/images/e/eb/Four_Horsemen_Final.jpg/revision/latest?cb=20140608004816" imgHigh= "https://i.ytimg.com/vi/9E948dTl_V8/maxresdefault.jpg">	
    </PilImage>
    <PilImage imgLow = "http://tiny.cc/mhzlry" imgHigh= "https://pokemongohub.net/wp-content/uploads/2017/01/pokemon-go-genders.jpg">	
    </PilImage>
    <PilImage imgLow = "https://www.ecranlarge.com/uploads/image/001/008/star-wars-les-derniers-jedi-porgs-1008248.jpg" imgHigh= "https://i.ytimg.com/vi/vtqfnp4sWhU/maxresdefault.jpg">	
    </PilImage>
    <PilImage imgLow = "http://tiny.cc/kkzlry" imgHigh= "http://goldwallpapers.com/uploads/posts/battlestar-galactica-wallpaper/battlestar_galactica_wallpaper_001.jpg">	
    </PilImage>
    <PilImage imgLow = "http://tiny.cc/0mzlry" imgHigh= "https://gpstatic.com/acache/26/72/3/fr/s9-d629cf9e8cc3efdfdda900c0e5975ce0.jpg">	
    </PilImage>
    <PilImage imgLow = "https://media.begeek.fr/2018/03/Adam-Kicinski-Cyberpunk-2077-660x371.jpg" imgHigh= "http://jolstatic.fr/www/captures/3144/6/119366.jpg">	
    </PilImage>
  </div>
</template>

<script>

import PilImage from '@/components/PilImage'

export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  components : {
  	PilImage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
	display:flex;
	flex-wrap: wrap;
	flex-direction: row;
	width:100%;
}
</style>
