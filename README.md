# Progressive Image Loading

Progressive image loading is a vueJS solution which allow you to reduce the loading time of your webpage by optimizing the loading of all your pictures. We also care about the upload of you pictures in the cloud.

## How it works

#### Upload Component

This is component is using external npm package (axios, random-id, vue-bootstrap).

1. In a terminal

  ```
  npm i progressive-image-loading-upload-vue --save
  ```

2. In your main.js

  ```
  import BootstrapVue from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  Vue.use(BootstrapVue)
  ```


3. In your vue Component

  ```html
<template>
  <upload apiKey="YOUR_API_KEY"></upload>
</template>

<script>
  import upload from 'progressive-image-loading-upload-vue'

  export default {
      components:{
        upload
      }
  }
</script>
  ```


#### Progressive image Loading

1. Installation

  ```html
  npm i vue-progressive-image-loading --save
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
### Utilisation de l'API
this API use Node and Redis;
for start server make npm install ;
in your terminal run : node server.js;
#### Users routes


http://APINAME/api/users/register/ post method for create an account whith username email and password in body;
http://APINAME/api/users/login/ post method for login with username and password in body;
http://APINAME/api/users/logout/ post method for with sessiontoken in headers like : sessiontoken token=YOURTOKEN logout;
http://APINAME/api/users/email/ put method for change email with email in body with sessiontoken in headers like : sessiontoken  token=YOURTOKEN;
http://APINAME/api/users/password/ put method for change password with password in body with sessiontoken in headers like : sessiontoken  token=YOURTOKEN;
http://APINAME/api/users/username/ put method for change username with username in body with sessiontoken in headers like : sessiontoken  token=YOURTOKEN;
http://APINAME/api/users/profile/ get method with sessiontoken in headers like : sessiontoken  token=YOURTOKEN
http://APINAME/api/users/delete/' delete method with sessiontoken in headers like : sessiontoken token=YOURTOKEN
### Images routes
http://APINAME/api/images/' get method for get all images with Authorization token=YOURTOKEN in headers;
http://APINAME/api/images/delete delete method for  all images with Authorization token=YOURTOKEN in headers;
http://APINAME/api/images/:id/ get method for get one image with Authorization token=YOURTOKEN in headers;
http://APINAME/api/images/add/ post method for image with Authorization token=YOURTOKEN , name , linkhq and linklq in body;
http://APINAME/api/images/:id/delete'  delete method for ane image with Authorization token=YOURTOKEN in headers;
### apikey verification
http://APINAME/api/apikey get method for verify api with Authorization token=YOURTOKEN in headers;
