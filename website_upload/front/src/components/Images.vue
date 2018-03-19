<template>
	<div>
		<div id="messages">
			<h1>{{channels.filter( (chan) => chan._id === idChannel)[0].label}}
                <button class="button" id="edit-button" @click="showModal()">Edit</button>
            </h1>
				<div v-for="com in channelData" class="comment">
                    <div class="entete">
												<img class="commentimg" :src="'https://robohash.org/'+com.member_id">
                        <h3>{{members.filter( (member) => member._id === com.member_id)[0].fullname}} à {{com.created_at}}</h3>
                    </div>
				    <p>{{com.message}}</p>
				</div>
    		</div>
		<div id="ecrire">
            <form @submit.prevent="sendMessage()">
                <input v-model="comment" id="comment" placeholder="Votre commentaire..." type="text" autocomplete="off"></input>
                <input type="submit" value="Send">
            </form>
        </div>

        <modal name="modal">
            <h2>Edit channel</h2>
            <form>
                <p>Enter the new information :</p>

                <label>Name <br><input id="new-name" type="text"></label>
                <br>
                <label>Topic <br><input id="new-topic" type="text"></label>

                <br>
                <button  class="button" id="save-button" @click="saveChanData">Save</button>
                <button  class="button" id="cancel-button" @click="hideModal">Cancel</button>
								<button  class="button" id="delete-button" @click="deleteChan()">Delete</button>
            </form>
        </modal>
	</div>
</template>

<script>
import api from '@/api';
import ls from '@/services/ls'
import store from '@/store'
import Vue from 'vue'


export default {

	data () {
		return {
            channelData: [],
            idChannel: '',
            token: ls.get('token'),
            comment: '',
            members: [],
            channels: []
		}
    },

    created () {
        this.idChannel = this.$route.params.id
        api.get('/channels/' + this.$route.params.id + '/posts', ls.get('token')).then((response) => {
            this.channelData = response.data
        }).catch( (error) => {
            alert("La channel auquel vous essayez d'accéder n'existe pas !")
        });

        api.get('/members', ls.get('token')).then((response) => {
            this.members = response.data
        })

        api.get('/channels', ls.get('token')).then((response) => {
            this.channels = response.data
        })
    },

	methods: {
        deleteChan () {
            api.delete('/channels/' + this.idChannel, this.token).then((response) => {
                this.$router.push({path: '/'})
            }).catch( (error) => {
                alert("Le channel que vous essayez de supprimer n'existe pas !")
            });
        },
        sendMessage() {
            let params = {
                token: this.token,
                message: this.comment
            }
            api.post('/channels/' + this.idChannel + '/posts', params).then((response) => {
                api.get('/channels/' + this.$route.params.id + '/posts', ls.get('token')).then((response) => {
                    this.channelData = response.data
                });
            });
						this.comment=null;
        },
        showModal() {
            this.$modal.show('modal')
        },
        hideModal() {
            this.$modal.hide('modal')
        },
        saveChanData(event) {
            let label = document.getElementById("new-name").value;
            let topic = document.getElementById("new-topic").value;
            let params = {
                token: ls.get('token'),
                label: label,
                topic: topic
            }

            api.put('/channels/' + this.idChannel, params).then((response) => {
                api.get('/channels', ls.get('token')).then((response) => {
                    this.channels = response.data
                })
            }).catch( error => {
                alert("Impossible de modifier ce channel !");
            });

            this.hideModal();
        },
	}
}
</script>

<style scoped>
#messages{
	height:90vh;
	overflow-y:scroll;
    overflow-x: none;
}
#messages h1{
	text-align:center;
	color:deepskyblue;
}
#ecrire{
	height:10vh;
	bottom:0;
}
.comment{
border: 1px solid gainsboro;
margin-bottom:3px;
}
#comment{
width:100%;
resize:none;
height: 3vh;
}
.entete{
text-align:center;
color:#485166;
}

input[type=submit] {
    background-color: deepskyblue;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}
input[type=submit]:hover{
	background-color: dodgerblue;
}
.v--modal-overlay[data-modal="modal"] form {
    padding-left: 20px;
}

.v--modal-overlay[data-modal="modal"] h2 {
    background: deepskyblue;
    padding: 10px;
    margin: 0;
    color: white;
}

.v--modal-overlay[data-modal="modal"] p {
    margin-bottom: 25px;
}
.button{
color: white;
padding: 14px 20px;
margin: 8px 0;
border: none;
cursor: pointer;
margin-top: 25px;
font-weight: bolder;
margin-bottom:1px;
}
.commentimg{
width:9%;
float:left;

}
.button:hover{
opacity:0.4;
}
#save-button {
    background-color: lightgreen;

}
#edit-button {
    background-color: deepskyblue;

}
#delete-button {
    background-color: red;
}
#cancel-button {
    background-color: grey;
}

</style>
