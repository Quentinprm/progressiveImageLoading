<template>
  <div class="containerPrincipale">
    <div class="containerImg">
      <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1521469494/ft0bsgatnemccjrcztl6.jpg">	
      </pil>
    </div>
    <div class="containerImg">
      <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1521470466/d7qosyy79fhr3ubadh81.jpg">	
      </pil>
    </div>
    <div class="containerImg">
      <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1521470472/ct5c5qh3zkm297luvjbt.jpg">	
      </pil>
    </div>
    <div class="containerImg">
      <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1521470474/ixqqenkoxezrh8mivzsq.jpg">	
      </pil>
    </div>
    <div class="containerImg">
      <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1521470477/nehiezzlsriarbyj4wyf.jpg">	
      </pil>
    </div>
    <div class="containerImg">
      <pil src = "http://res.cloudinary.com/morgandbs/image/upload/v1521470500/klh15k123fusq2z7bq55.jpg">	
      </pil>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
.containerPrincipale{
	display:flex;
	flex-wrap: wrap;
	flex-direction: row;
	width:100%;
}
.containerImg{
  width: 20%;
  max-width: 20%;
  height:200px;
  max-height:200px;
  margin: 10px 2.5% 10px 2.5%;
}
</style>
