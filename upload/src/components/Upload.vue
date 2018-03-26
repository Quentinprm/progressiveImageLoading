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

          <b-form-group v-for="input in input_file" :key="input.id">
            <b-form-file v-on:change="addFileToTab(input.id, $event.target.files)" accept="image/*" placeholder="Choose a file..."></b-form-file>
            <b-button v-on:click="deleteFileInput(input.id)" v-if="input_file.length > 1" variant="link">delete</b-button>
          </b-form-group>

          <b-button-group>
            <b-button v-on:click="addFileInput()" variant="primary">Add More pictures</b-button>
            <b-button v-if="files.length != 0" id="right" type="submit" variant="success">Submit</b-button>
            <b-button disabled v-else id="right" type="submit" variant="danger">Upload</b-button>
          </b-button-group>
        </b-form>
        <p v-if="files.length == 0" class="danger"> Select atleast one picture to upload.</p>
        <br>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <h3>Upload progress</h3>
        <b-progress :value="width" :max="max" show-progress animated></b-progress>
        <br>
        <div v-if="width = 100">Upload complete</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import axios from 'axios'
  import randomID from 'random-id'

  export default {
      props: [
        'apiKey'
      ],
      data: function() {
          return {
              width: 0,
              max: 100,
              input_file: [{
                  'id': randomID(64),
                  'file': null
              }],
              files: [],
              uploaded: false,
              file: null
          }
      },
      methods: {
          addFileToTab: function(id, file) {
              for (var i = 0; i < this.input_file.length; i++) {
                  if (this.input_file[i].id == id) {
                      if (this.input_file[i].file != null) {
                          this.input_file[i].file = file[0]
                          this.files[i].file = file[0]
                      } else {
                          this.input_file[i].file = file[0]
                          this.files.push({
                              "id": id,
                              "file": file[0]
                          })
                      }
                  }
              }
          },
          addFileInput: function() {
              this.input_file.push({
                  'id': randomID(64),
                  'file': null
              })
          },
          deleteFileInput: function(index) {
              for (var i = 0; i < this.input_file.length; i++) {
                  if (this.input_file[i].id == index) {
                      this.input_file.splice(i, 1);
                      this.files.splice(i, 1);
                      break;
                  }
              }
          },
          upload: function() {
              let total = this.files.length
              let it = 0
              let self = this
              axios.post('http://localhost:8080/apiKey', {headers: {'token': this.apiKey}})
                .then((response) =>{
                  this.uploaded = true
                  for (let i = 0; i < total; i++) {
                      let formData = new FormData();
                      formData.append('file', this.files[i].file);
                      formData.append("api_key", response.data.api_key);
                      formData.append('upload_preset',response.data.upload_preset);
                      axios.post('https://api.cloudinary.com/v1_1/'+response.data.cloudName+'/upload', formData)
                          .then((data2) => {
                              it++
                              self.width = (it / total) * 100
                              let name = data2.data.public_id
                              let url = data2.data.url
                              let url_low = url.split('upload/')[0]+'upload/q_01/'+url.split('upload/')[1]

                              let pic = {'name': name, 'linkhq': url, 'linklq': url_low}
                              axios.post('http://localhost:8080/url', {headers: {'token': this.apiKey}, data: pic})
                          })
                          .catch((error) => {
                              console.log(error)
                              it++
                              self.width = (it / total) * 100
                          })
                  }
                })
                .catch((error) =>{
                  console.log(error)
                })
          }
      }
  }
</script>

<style>
  * {
    border-radius: 0 !important;
  }

  #right {
    margin-left: 20px;
  }

  .danger {
    color: red;
    margin-top: 5px;
  }
</style>
