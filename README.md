# Progressive Image Loading

Progressive image loading est une librairie javascript qui vous permet de réduire le temps de chargement de votre page en optimisant le chargement des images. On s'occupe également de l'upload de vos images tout ça dans le cloud

## Comment ca marche

### Utilisation dans votre code

#### Upload d'image

1. Vous avez juste à lier le fichier css et le script dans votre html

  ```html
  <link rel="stylesheet" href="chemin/vers/progressivemImageLoadingUpload.min.css">
  <script src="chemin/vers/progressivemImageLoadingUpload.min.js"></script>
  ```
  
2. Imbrication

  ```html
  <div class="progressive-upload">
  </div>
  ```
  
3. Option

  ```html
  <script>
    var progressiveImageOption = new progressiveImage();
    window.progressiveImageOption = {
     api-key: 'key'
    };
  </script>
  ```
#### Progressive image Loading

1. Vous avez juste à lier le fichier css et le script dans votre html

  ```html
  <link rel="stylesheet" href="chemin/vers/progressivemImageLoading.min.css">
  <script src="chemin/vers/progressivemImageLoading.min.js"></script>
  ```
  
2. Imbrication

  ```html
  <div class="progressive-container">
    <img class="progressiveImage" data-src="image.jpg" alt="" />
  </div>
  ```
  
  3. Option

  ```html
  <script>
    var progressiveImageOption = new progressiveImage();
    window.progressiveImageOption = {
     api-key: 'key',
     effect: 'blur'
    };
  </script>
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
    
