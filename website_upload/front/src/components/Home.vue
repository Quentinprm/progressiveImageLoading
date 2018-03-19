<template>
	<div id="container">
		<div id="channels">
			<div class="imgcontainer">
				<img src="../assets/logo.png"/>
			</div>
			<button  v-on:click="logout()">Déconnexion</button>
			<h2>Images</h2>
			<p id="add">
				<router-link :to="{ path: '/' }">Uploader une image</router-link>
			</p>
			<p v-for="chan in channels" class="chan">
				<router-link :to="{ path: '/' + chan._id }">{{chan.label}}</router-link>
			</p>
		</div>
		<div id="right">
			<router-view :key="$route.fullPath"></router-view>
		</div>
	</div>
</template>

<script>
import api from '@/api'
import ls from '@/services/ls'
export default {
	data () {
		return {
			channels: [],
			members: []
		}
	},
	methods:{
		logout(){
			this.$store.dispatch('auth/logout',true);
			this.$router.push({path:'/'});
		}
	},
	created () {

		api.get('/channels').then((response) => {
			this.channels = response.data
		});

		api.get('/members', ls.get('token')).then((response) => {
			this.members = response.data
		});
	},
	computed: {
		hasChannel () {
			return this.channels.length > 0
		}
	}
}
</script>


<style lang="css" scoped>
#container {
	height: 100%;
	width: 100%;
	display: flex;
}
.imgcontainer{
	text-align: center;
	margin: 24px 0 12px 0;
}
img {
	width: 30%;
}

#channels {
	list-style-type:none;
	margin: 0;
	padding: 0;
	width: 25%;
	background-color: #f1f1f1;
	position: fixed;
	height: 100%;
	overflow: auto;
}
#members{
	list-style-type:none;
	margin: 0;
	padding: 0;
	width: 25%;
	background-color: #f1f1f1;
	position: float;
	height: 100vh;
	overflow: auto;
}
h2 {
	color:grey;
	text-align: center;
	margin: 0;
	padding-bottom: 5px;
	padding-top: 5px;
	border-bottom: 2px solid deepskyblue;
}
.member{
	width:100%;
	display:table;
	color:#000;
	padding:8ps 16px;
	test-decoration:none;
	clear:both;
	border-bottom: 2px solid LightSlateGrey;
}
.memberimg{
	float:left;
	width:30%;

}
.chan {
	margin:0;
}
.chan a{
	display: block;
	color: #000;
	padding: 8px 16px;
	text-decoration: none;
}
.chan a:hover{
	background-color:deepskyblue;
	color: white;
}
button{
	width:60%;
	margin: auto;
	margin-bottom:2px;
}
#add {
	margin:0;
	margin-bottom:2px;
}
button,#add a{
	display: block;
	color: white;
	padding: 8px 16px;
	text-decoration: none;
	background-color:deepskyblue;
}
button:hover,#add a:hover{
	background-color:dodgerblue;
}
#right{
	width:75%;
	height:100%;
	margin-left:25%;
	padding:1px 16px;
}

</style>
