# Progressive Image Loading

Progressive image loading is a JS library which allow you to reduce the lodaing time of your webpage by optimizing the loading of all your pictures. We also care about the upload of you pictures in the cloud.

## How it works

### Import in your code

#### Upload d'image

1. In a terminal

  ```
  npm i progressive-image-loading-upload --save
  ```
  
2. In your vue Component

  ```html
<template>
  <upload apiKey="YOUR_API_KEY"></upload>
</template>

<script>
  import Upload from 'progressive-image-loading-upload'

  export default {
      components:{
        'upload':Upload,
      }
  }
</script>
  ```
  
#### Progressive image Loading

1. Installation

  ```html
  npm i vue-progressive-image-loading
  ```
  
2. Imbrication

  ```html
  import pil from 'vue-progressive-image-loading';
  Vue.component('pil', pil);
  ```
  
3. Usage

  ```html
  <pil src = ""></pil>
  ```
 
### Utilisation de l'interface web

Une fois inscrit, gratuitement, vous pouvez:
  1. Utiliser le service d'upload d'image
  
    -Pour ce faire, vous devez nous renseigner l'URI (à faire lors de l'acquisition de votre clé d'API) où
    faire les requêtes PUT qui vous transmettrons les images traité et formaté.
    
    -De votre côté, vous devrez gérer cette requête pour stocker vos images dans le dossier voulu, qui
    doit être le même. Vous aurez alors une image: image.jpg et une imageLow.jpg
  
  2. Gérer vos clés d'API
  
    -Chaque site requiert une  clé API, que vous pourrez acquérir sur notre site web: http://PIL.com
    
