# Progressive Image Loading

Progressive image loading est une librairie javascript qui vous permet de réduire le temps de chargement de votre page en optimisant le chargement des images.

### Comment ca marche

1. Vous avez juste à lier le fichier css et le script dans votre html

  ```html
  <link rel="stylesheet" href="chemin/vers/progressivemImageLoading.min.css">
  <script src="chemin/vers/progressivemImageLoading.min.js"></script>
  ```
  
2. Imbrication

   ```html
   <div class="progressiveCont">
    <img class="progressiveImage" data-src="chemin/vers/image.jpg" alt="" />
   </div>
   ```
