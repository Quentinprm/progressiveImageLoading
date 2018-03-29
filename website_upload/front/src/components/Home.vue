<template>
	<div id="container">
		<div id="channels">
			<div class="imgcontainer">
				<img src="../assets/logo.png"/>
			</div>
			<button  v-on:click="logout()">Déconnexion</button>
			<h2>Clé d'api</h2>
			<p>{{ apikey }}</p>
			<h2>Comptes</h2>
			<p class="add">
				<router-link :to="{ path: '/mdp' }">Modifier son mot de passe</router-link>
			</p>
			<p class="add">
				<router-link :to="{ path: '/username' }">Modifier son nom d'utilisateur</router-link>
			</p>
			<p class="add">
				<router-link :to="{ path: '/email' }">Modifier son mail</router-link>
			</p>
			<h2>Images</h2>
			<p class="add">
				<router-link :to="{ path: '/' }">Uploader une image</router-link>
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
			members: [],
			apikey: ls.get("apikey")
		}
	},
	methods:{
		logout(){
			this.$store.dispatch('auth/logout',true);
			this.$router.push({path:'/'});
		}
	},
	created () {

	},
	computed: {
		hasChannel () {
			return this.channels.length > 0
		}
	}
}
</script>


<style lang="css" scoped>
p{
	word-wrap: break-word;
}
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
.add {
	margin:0;
	margin-bottom:2px;
}
button,.add a{
	text-align: center;
	display: block;
	color: white;
	padding: 8px 16px;
	text-decoration: none;
	background-color:deepskyblue;
}
button:hover,.add a:hover{
	background-color:dodgerblue;
}
#right{
	width: 75%;
	height: 100vh;
	margin-left: 25%;
	padding: 1px 16px;
	display: flex;
	flex-wrap: wrap;
}

</style>
