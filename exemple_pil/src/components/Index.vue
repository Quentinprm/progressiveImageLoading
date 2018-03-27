<template>
  <div class="container-principal">
    <div class="container-grid">
      <div class="container-img">
        <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1521901214/lpndxvdggoekhjcvvevc.jpg">	
        </pil>
      </div>
      <router-link :to="{ name: 'SingleImage', params: { src: 'http://res.cloudinary.com/morgandbs/image/upload/v1521901214/lpndxvdggoekhjcvvevc.jpg' }}">Full page image</router-link>
    </div>
    <div class="container-grid">
      <div class="container-img">
        <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1521901110/ejk81mwj5lhmehgqgqqd.jpg">	
        </pil>
      </div>
      <router-link :to="{ name: 'SingleImage', params: { src: 'http://res.cloudinary.com/morgandbs/image/upload/v1521901110/ejk81mwj5lhmehgqgqqd.jpg' }}">Full page image</router-link>
    </div>
    <div class="container-grid">
      <div class="container-img">
        <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1521896793/sample.jpg">	
        </pil>
      </div>
      <router-link :to="{ name: 'SingleImage', params: { src: 'http://res.cloudinary.com/morgandbs/image/upload/v1521896793/sample.jpg' }}">Full page image</router-link>
    </div>
    <div class="container-grid">
      <div class="container-img">
        <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1522077004/pnsqfkpva8dsmx68mjws.jpg">	
        </pil>
      </div>
      <router-link :to="{ name: 'SingleImage', params: { src: 'http://res.cloudinary.com/morgandbs/image/upload/v1522077004/pnsqfkpva8dsmx68mjws.jpg' }}">Full page image</router-link>
    </div>
    <div class="container-grid">
      <div class="container-img">
        <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1522152555/vitchakorn-koonyosying-527285-unsplash.jpg">	
        </pil>
      </div>
      <router-link :to="{ name: 'SingleImage', params: { src: 'http://res.cloudinary.com/morgandbs/image/upload/v1522152555/vitchakorn-koonyosying-527285-unsplash.jpg' }}">Full page image</router-link>
    </div>
    <div class="container-grid">
      <div class="container-img">
        <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1522152554/niketh-vellanki-202943-unsplash.jpg">	
        </pil>
      </div>
      <router-link :to="{ name: 'SingleImage', params: { src: 'http://res.cloudinary.com/morgandbs/image/upload/v1522152554/niketh-vellanki-202943-unsplash.jpg' }}">Full page image</router-link>
    </div>
    <div class="container-grid">
      <div class="container-img">
        <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1522152550/alex-martinez-560583-unsplash.jpg">  
        </pil>
      </div>
      <router-link :to="{ name: 'SingleImage', params: { src: 'http://res.cloudinary.com/morgandbs/image/upload/v1522152550/alex-martinez-560583-unsplash.jpg' }}">Full page image</router-link>
    </div>
    <div class="container-grid">
      <div class="container-img">
        <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1522076702/gyoicldqbdpi4nphq6jd.jpg">  
        </pil>
      </div>
      <router-link :to="{ name: 'SingleImage', params: { src: 'http://res.cloudinary.com/morgandbs/image/upload/v1522076702/gyoicldqbdpi4nphq6jd.jpg' }}">Full page image</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
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
.container-principal{
	display:flex;
	flex-wrap: wrap;
	flex-direction: row;
	width:100%;
}
.container-grid{
  width: 20%;
  max-width: 20%;
  height:200px;
  max-height:250px;
  margin: 50px 2.5% 50px 2.5%;
}
.container-img{
  width:100%;
  height:200px;
  margin-bottom: 20px;
}
a{
  text-decoration: none;
  color:#f2f2f2;
  background-color: #209CEE;
  padding:10px;
}
</style>
