<template>
  <b-container class="bv-example-row">
    <b-row>
      <h1>Upload pictures</h1>
    </b-row>
    <hr>
    <b-row v-if="!uploaded">
        <b-col >
          <h3>Add pictures</h3>
          <b-form @submit="upload">
              <b-form-group v-for="count in counts" :key="counts.id" class="custom-file b-form-file">
                <b-form-file v-on:change="addFileToTab(count.id, $event.target.files)" accept="image/*" placeholder="Choose a file..."></b-form-file>
                <b-button v-on:click="deleteFileInput(count.id)" v-if="counts.length > 1" variant="link">delete</b-button>
              </b-form-group>
              <b-button-group id="boutons">
                <b-button v-on:click="addFileInput()" variant="primary">Add More pictures</b-button>
                <b-button type="submit" variant="success">Submit</b-button>
              </b-button-group>
          </b-form>
          <br>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col>
          <h3>Upload progress</h3>
          <b-progress :value="width" :max="max" show-progress animated></b-progress>
          <br>
          <div>{{width}}% Complete</div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

  export default {
    data: function() {
    return {
      width: 0,
      max: 100,
      cloudinary: {
       uploadPreset: 'wimsusxm  ',
       apiKey: '396852746268724',
       cloudName: 'morgandbs',
     },
     files: [],
     counts: [{'id':1}],
     uploaded: false
    }
  },
  methods: {
    addFileToTab: function(id, file){
      this.files.push({'id': id, 'file': file[0]})
    },
    addFileInput: function(){
      this.counts.push({'id' : this.counts.length+1})
    },
    deleteFileInput: function(id){
      for(var i = 0; i < this.counts.length; i++) {
        console.log(this.counts[i].id)
          if(this.counts[i].id == id) {
              this.counts.splice(i, 1);
              break;
          }
      }
      for(var i = 0; i < this.files.length; i++) {
        console.log(this.files[i].id)
          if(this.files[i].id == id) {
              this.files.splice(i, 1);
              break;
          }
      }
    },
    upload: function() {
        this.uploaded = true
        let total = this.files.length
        let it = 0
        let self = this
        for(let i=0; i< total; i++){
          let formData = new FormData();
          formData.append('file', this.files[i].file);
          formData.append("api_key", this.cloudinary.apiKey);
          formData.append('upload_preset', this.cloudinary.uploadPreset);
          axios.post('https://api.cloudinary.com/v1_1/morgandbs/upload', formData)
            .then((data2) =>{
              it++
              self.width = (it / total) * 100
            })
            .catch((error) =>{
              console.log(error)
              it++
              self.width = (it / total) * 100
            })
        }
    }
  }
 }
</script>

<style scoped>
  *{
    border-radius: 0!important;
  }
  h3{
    width: 100%;
    text-align: center;
  }

  .btn-group{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  #boutons.btn-group button{
    margin: auto;
    width: 20%;
  }
  #boutons.btn-group > .btn:first-child{
    margin-left: auto;
  }

</style>
